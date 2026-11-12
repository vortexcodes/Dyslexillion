# Project notes for Claude

## Hosting rule (applies to every web project)
- Every web thing gets hosted at `<thing-name>.vortex1.dev` (lowercase, hyphens for spaces).
- Default host: GitHub Pages. Add a `CNAME` file containing the subdomain and a `.nojekyll` file at the repo root.
- DNS for vortex1.dev is in **Cloudflare** (zone id `fb2a026d70c669fbaf405a3820f2ac92`). Add the record yourself via the
  Cloudflare API (`https://api.cloudflare.com/client/v4/zones/<zone>/dns_records`). The token is a saved network secret on
  the cloud environment: send `Authorization: Bearer proxy-injected` and the proxy fills in the real token.
  - GitHub Pages site: CNAME `<thing-name>` → `vortexcodes.github.io`, **DNS only** (`proxied: false`) so GitHub can issue HTTPS.
  - Server apps (like dlab, Margin) go on Render: CNAME `<thing-name>` → `<service>.onrender.com`, DNS only.
- List existing records first. Never change the root, `www`, MX/TXT (Zoho mail) or the cfargotunnel records.
- Once the site answers, make sure HTTPS is on (Settings → Pages → Enforce HTTPS); mic/voice features need https.

## Saved keys on the cloud environment (no new keys needed for new projects)
Cloudflare (`api.cloudflare.com`), Render (`api.render.com`) and Venice (`api.venice.ai`) keys are saved network secrets.
Send `Authorization: Bearer proxy-injected`; never ask the user for these again, and never read/copy secret values.
- **Render**: owner/workspace id `tea-dbd23hom7kps73dajeqg`, region oregon, free plan. Create services with
  `POST https://api.render.com/v1/services` (type `web_service`, `repo`, `branch`, `rootDir`, `serviceDetails.runtime` node,
  `envSpecificDetails` build/start, `healthCheckPath`). Free plan allows only **2 custom domains** (used by dlab and margin):
  for extra backends, prefer keeping the site on GitHub Pages and call the API at `<service>.onrender.com` directly.
- **Secrets for Render services** (e.g. `VENICE_API_KEY`): they live in the Render Environment Group `vortex-keys`
  (made once by the user in the dashboard). Link new services to it with
  `POST /v1/env-groups/<groupId>/services/<serviceId>`; don't put secret values in env vars yourself.
- **Venice** model: `zai-org-glm-5-2`, OpenAI-compatible at `https://api.venice.ai/api/v1/chat/completions`; set
  `venice_parameters: {include_venice_system_prompt:false, strip_thinking_response:true, disable_thinking:true}`.

## This project
- Live at https://dislexion.vortex1.dev (GitHub Pages, static). Answer checker API at https://dislexion-api.onrender.com
  (Render service `srv-dbqu2ngu01pc7383kht0`, deploys from branch `claude/charming-ptolemy-6kkiq5`, rootDir `api`).
- `index.html`: Dislexion, an original "name a rare answer" category game (Daily + Endless). Forgiving spelling and
  voice answers via the shared spelling engine. Category data is inlined JSON (`const CATS`): `[forms[], points, percent]`,
  ~9,400 answers in 93 categories, generated with Venice AI (survey-style % estimates) plus hand-checked lists, then
  cleaned by a second Venice pass. Points = 10 (≥30% say it) up to 100 (≤0.01%).
- `api/server.mjs` + `render.yaml`: no-dependency Node service. `POST /check {q, answer}` asks Venice if an off-list answer
  fits and estimates its %. CORS-locked to the site, 120 checks/hour/IP. Gets `VENICE_API_KEY` from the `vortex-keys` env group.
  Venice calls must set `disable_thinking: true` or they run out of tokens / time out.
- From this cloud environment, Venice is reachable with `Authorization: Bearer proxy-injected`; Node needs
  `NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt` for fetch to go through the proxy.
- `writer.html`: Brilliant 2, the older dyslexia writing helper.
