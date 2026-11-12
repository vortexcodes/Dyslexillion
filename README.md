# Dislexion

Name something in the category. The fewer people who'd say it, the more points (10–100). Spelling doesn't have to be
right. Live at **https://dislexion.vortex1.dev**.

- **Daily**: 7 categories, the same for everyone that day, with a shareable result.
- **Endless**: categories keep coming; streaks add bonus points.
- **Forgiving spelling and voice**: answers match by sound and by a dyslexia-aware typo model (`zylophone` → xylophone).
- **Expert-tier scoring**: points come from how likely someone who *knows the topic* is to say it: Obvious 5-12, Common 15-30, Solid pick 35-55, Deep cut 60-80, Expert level 85-100. The reveal shows the top answers board.
- **AI check**: answers not on the list are checked by Venice AI through a small server (`api/`), so real rare answers count.
- 93 categories, ~95,000 answers (brands, varieties, slang and obscure picks count), including optional electronics, 3D printing, code, business and school packs.

## Answer checker (Render)

The game is static (GitHub Pages). The AI check runs on Render so the Venice key stays secret:
Render → New → Blueprint → this repo → enter `VENICE_API_KEY` → Apply. Then point DNS
`dislexion-api` (CNAME, DNS only) at the service's `onrender.com` address. If the checker is down, the game still works and
offers "Count it anyway".

`writer.html` is the older Brilliant 2 writing helper.
