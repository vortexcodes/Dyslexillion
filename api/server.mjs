// Dislexion answer checker. One job: when a player gives an answer that isn't on the game's list,
// ask Venice whether it really fits the category and roughly how many people would say it.
// No dependencies. Env: VENICE_API_KEY (required), AI_MODEL, ALLOWED_ORIGINS (comma list), PORT.
import http from "node:http";

const KEY = process.env.VENICE_API_KEY || "";
const MODEL = process.env.AI_MODEL || "zai-org-glm-5-2";
const ORIGINS = (process.env.ALLOWED_ORIGINS || "https://dislexion.vortex1.dev,http://localhost:8080").split(",").map(s => s.trim());
const PORT = process.env.PORT || 8080;

// Simple per-IP limit so the key can't be drained: 120 checks per hour.
const hits = new Map();
function limited(ip) {
  const now = Date.now(), h = (hits.get(ip) || []).filter(t => now - t < 3600_000);
  h.push(now); hits.set(ip, h);
  return h.length > 120;
}
// Cache answers so repeat checks are free.
const cache = new Map();

async function check(q, answer) {
  const k = q.toLowerCase() + "|" + answer.toLowerCase();
  if (cache.has(k)) return cache.get(k);
  const res = await fetch("https://api.venice.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL, temperature: 0, max_tokens: 300,
      venice_parameters: { include_venice_system_prompt: false, strip_thinking_response: true, disable_thinking: true },
      messages: [{ role: "user", content:
`Party game. The category is "Name ${q}". A player answered: "${answer}".
The player may be dyslexic, so judge what they clearly meant, even if badly misspelled or phonetic.
Reply with ONLY JSON: {"valid": true|false, "name": "correct spelling of what they meant", "percent": number}
- valid: true only if it genuinely fits the category.
- percent: estimated share of 1,000 Americans who would give this as their first answer (0.01 to 40).` }],
    }),
    signal: AbortSignal.timeout(25_000),
  });
  const data = await res.json().catch(() => null);
  const text = data?.choices?.[0]?.message?.content || "";
  const json = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
  const out = { valid: !!json.valid, name: String(json.name || answer).slice(0, 60), percent: Math.max(0.01, Math.min(40, Number(json.percent) || 0.5)) };
  if (cache.size > 5000) cache.clear();
  cache.set(k, out);
  return out;
}

http.createServer(async (req, res) => {
  const origin = req.headers.origin || "";
  const cors = ORIGINS.includes(origin) ? { "Access-Control-Allow-Origin": origin, "Vary": "Origin" } : {};
  const send = (status, body) => { res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store", ...cors }); res.end(JSON.stringify(body)); };
  if (req.method === "OPTIONS") { res.writeHead(204, { ...cors, "Access-Control-Allow-Methods": "POST", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" }); return res.end(); }
  if (req.url === "/health") return send(200, { ok: true, ai: !!KEY });
  if (req.method !== "POST" || req.url !== "/check") return send(404, { error: "not found" });
  if (!cors["Access-Control-Allow-Origin"]) return send(403, { error: "origin not allowed" });
  if (!KEY) return send(503, { error: "not configured" });
  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
  if (limited(ip)) return send(429, { error: "slow down" });
  let body = "";
  for await (const chunk of req) { body += chunk; if (body.length > 2000) return send(413, { error: "too big" }); }
  try {
    const { q, answer } = JSON.parse(body);
    if (typeof q !== "string" || typeof answer !== "string" || !q.trim() || !answer.trim() || q.length > 100 || answer.length > 60) return send(400, { error: "bad input" });
    send(200, await check(q.trim(), answer.trim()));
  } catch (e) {
    send(502, { error: "check failed" });
  }
}).listen(PORT, () => console.log("dislexion checker on", PORT));
