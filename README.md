# Brilliant 2

A dyslexia-friendly writing helper. One file (`index.html`), no install, no account, works offline for typing.

**Open it:** double-click `index.html`, or turn on GitHub Pages for this repo. Voice works best in **Chrome or Edge** (Safari works too; Firefox has no voice typing).

## What it does

| Feature | How |
|---|---|
| **Figures out the word you mean** | Spell it how it sounds: `becuz` → because, `nolege` → knowledge, `jlcpbc` → JLCPCB. Uses sound-alike matching plus a typo model tuned for dyslexia (b/d/p/q flips, vowel swaps, doubled letters, silent letters). |
| **Auto-fix on space** | Fixes only when it's very sure. Press **Backspace** right after to undo. |
| **Learns you** | Remembers the fixes you pick and the words you use, so it gets better over time (stored only in your browser). |
| **Mix-up helper** | Put the cursor on there/their/they're, its/it's, to/too/two, etc. and it shows plain-English hints. |
| **Next-word ideas** | Suggests the next word from context and your own writing. |
| **Voice typing** | 🎤 **Talk**: continuous dictation, auto-restarts on pauses, live captions. Say "period", "comma", "new line", "scratch that", "read it back", "fix all", "stop listening". |
| **Say a word** | 🗣️ Can't spell one word? Say it, and pick from what it heard. |
| **Interest modes** | ★ My Interests, Badge Hacker, 3D Printing, Code & Web, Founder, School. Each mode knows its vocabulary for typing *and* voice (e.g. "jlc pcb" → JLCPCB, "s a o" → SAO, "esp 32" → ESP32, "bamboo lab" → Bambu Lab, "clipper" → Klipper, "pet g" → PETG). |
| **My words** | Add names and brands in Settings and they work in typing and voice. |
| **Read aloud** | 🔊 reads your text and highlights each word. 🔊 on any suggestion lets you hear it before you pick it. |
| **Easy to read** | Lexend / Atkinson Hyperlegible fonts, size, letter & line spacing, cream/blue/green/grey/dark backgrounds. |

## Shortcuts

`Tab` top guess · `Alt+1…6` pick a guess · `Alt+M` talk · `Alt+W` say a word · `Alt+R` read aloud · `Alt+F` fix all

## Notes

- Voice typing uses your browser's built-in speech service (Chrome sends audio to Google to transcribe). It needs internet and must be opened from `https://` or a local file.
- Your text, settings, and learned words are saved in this browser only (`localStorage`).
- Word list: the 24,000 most common English words (from the open-source `wordfreq` project).
