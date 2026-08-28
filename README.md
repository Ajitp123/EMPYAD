# Attendance Report App — STAFF (COM.OP)

**Prepared by: AJEET PARMAR**

## GitHub Pages pe deploy

1. Repo me ye **saari files root pe** honi chahiye (ya `docs/` folder):
   - `index.html`, `sw.js`, `manifest.json`, `favicon.svg`, `icons/`
2. **Settings → Pages → Deploy from branch** → `main` → `/ (root)`
3. Link aisa hoga: `https://USERNAME.github.io/REPO_NAME/`

## App Install (Chrome / Android)

Install tabhi dikhta hai jab:

1. Site **HTTPS** pe ho (GitHub Pages OK hai)
2. `sw.js` + `manifest.json` load ho
3. Chrome me site **2–3 second** open rakho, phir:
   - **Desktop:** address bar me **Install icon** (⊕ / monitor+arrow)
   - **Android Chrome:** menu **⋮ → Install app** / **Add to Home screen**
   - Kabhi **⋮ → Bookmark** ke neeche **Install app**

### Agar Install na dikhe

1. Confirm URL **https://** se start ho (http nahi)
2. Files repo **root** me hain, nested folder me nahi (warna paths toot jaate hain)
3. Chrome me `https://YOUR_SITE/manifest.json` open karke check karo — JSON dikhna chahiye
4. `https://YOUR_SITE/sw.js` bhi open hona chahiye
5. Site data clear karke dubara open karo
6. Desktop Chrome: `chrome://apps` / install icon in omnibox

## Local test

`index.html` seedha file:// se Install **nahi** aata. Use:

```bash
npx serve .
# or python -m http.server 8080
```

Phir `http://localhost:8080` (localhost pe SW allow hota hai).
