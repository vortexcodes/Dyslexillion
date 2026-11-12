# Dislexion

Name something in the category. The fewer people who'd say it, the more points (10–100). Spelling doesn't have to be
right. Live at **https://dislexion.vortex1.dev**.

- **Daily**: 7 categories, the same for everyone that day, with a shareable result.
- **Endless**: categories keep coming; streaks add bonus points.
- **Forgiving spelling and voice**: answers match by sound and by a dyslexia-aware typo model (`zylophone` → xylophone).
- **"% of people say this"**: every answer has a survey-style estimate; the reveal shows the top answers board.
- **AI check**: answers not on the list are checked by Venice AI through a small server (`api/`), so real rare answers count.
- 93 categories, ~9,400 answers, including optional electronics, 3D printing, code, business and school packs.

## Answer checker (Render)

The game is static (GitHub Pages). The AI check runs on Render so the Venice key stays secret:
Render → New → Blueprint → this repo → enter `VENICE_API_KEY` → Apply. Then point DNS
`dislexion-api` (CNAME, DNS only) at the service's `onrender.com` address. If the checker is down, the game still works and
offers "Count it anyway".

`writer.html` is the older Brilliant 2 writing helper.
