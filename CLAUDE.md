# Project notes for Claude

## Hosting rule (applies to every web project)
- Every web thing gets hosted at `<thing-name>.vortex1.dev` (lowercase, hyphens for spaces).
- Default host: GitHub Pages. Add a `CNAME` file containing the subdomain and a `.nojekyll` file at the repo root.
- DNS: one CNAME record `<thing-name>` → `vortexcodes.github.io` at the vortex1.dev DNS provider.
- After DNS resolves, turn on "Enforce HTTPS" in Settings → Pages (mic/voice features need https).

## This project
- App: Brilliant 2, a single file `index.html`. Live at https://dislexion.vortex1.dev
