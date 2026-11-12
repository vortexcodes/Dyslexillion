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

## This project
- Live at https://dislexion.vortex1.dev (GitHub Pages, static). Answer checker API at https://dislexion-api.vortex1.dev (Render).
- `index.html`: Dislexion, an original "name a rare answer" category game (Daily + Endless). Forgiving spelling and
  voice answers via the shared spelling engine. Category data is inlined JSON (`const CATS`): `[forms[], points, percent]`,
  ~9,400 answers in 93 categories, generated with Venice AI (survey-style % estimates) plus hand-checked lists, then
  cleaned by a second Venice pass. Points = 10 (≥30% say it) up to 100 (≤0.01%).
- `api/server.mjs` + `render.yaml`: no-dependency Node service. `POST /check {q, answer}` asks Venice if an off-list answer
  fits and estimates its %. CORS-locked to the site, 120 checks/hour/IP. Needs `VENICE_API_KEY` set in Render's dashboard.
  Venice calls must set `disable_thinking: true` or they run out of tokens / time out.
- From this cloud environment, Venice is reachable with `Authorization: Bearer proxy-injected`; Node needs
  `NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt` for fetch to go through the proxy.
- `writer.html`: Brilliant 2, the older dyslexia writing helper.
