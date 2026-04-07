# SETUP.md — Pro Active Signature Generator

## Prerequisites

- Node.js >= 18.x
- npm or yarn
- Git

---

## 1. Clone & Install

```bash
git clone https://github.com/proactive/signature-generator.git
cd signature-generator
npm install
```

---

## 2. Project Structure

```
signature-generator/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main page — renders SignatureBuilder
│   └── globals.css         # Tailwind base + custom styles
├── components/
│   ├── SignatureBuilder.tsx # Main form + state logic
│   ├── SignaturePreview.tsx # Live rendered HTML preview
│   ├── PhotoUpload.tsx      # Drag & drop / click to upload photo
│   ├── CopyButton.tsx       # Copy HTML to clipboard
│   └── GmailInstructions.tsx# Step-by-step Gmail paste guide
├── lib/
│   ├── generateSignatureHTML.ts  # Pure function: inputs → HTML string
│   └── logoBase64.ts             # Exported const with embedded logo
├── public/
│   └── favicon.ico
├── CLOUD.md
├── SETUP.md
├── TASK.md
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## 3. Logo Setup

The Pro Active logo (transparent PNG) is embedded as a base64 string in `lib/logoBase64.ts`:

```ts
// lib/logoBase64.ts
export const LOGO_BASE64 = "data:image/png;base64,iVBORw0KGgo..."; // full string
```

To regenerate if the logo ever changes:

```bash
python3 -c "
import base64
with open('new_logo.png', 'rb') as f:
    print('export const LOGO_BASE64 = \"data:image/png;base64,' + base64.b64encode(f.read()).decode() + '\";')
" > lib/logoBase64.ts
```

---

## 4. Run Locally

```bash
npm run dev
# → http://localhost:3000
```

---

## 5. Build & Export (Static)

```bash
npm run build
# Vercel handles this automatically on push
```

For manual static export:
```bash
npm run build && npm run export
# Output in /out folder — uploadable to any static host
```

---

## 6. Deploy to Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

Or connect repo in Vercel dashboard → auto-deploys on every push to `main`.

---

## 7. Custom Domain (optional)

In Vercel dashboard:
1. Go to Project → Settings → Domains
2. Add `signature.pro-active.be`
3. Add CNAME record in DNS: `signature → cname.vercel-dns.com`

---

## 8. Access Restriction (optional, recommended)

Since this is internal-only:

**Option A — Vercel Password Protection**
- Project → Settings → Security → Password Protection
- Set a shared team password

**Option B — Cloudflare Access**
- Add site behind Cloudflare
- Set Access policy: allow only `@pro-active.be` Google accounts

---

## Key Dependencies

```json
{
  "next": "^14",
  "react": "^18",
  "tailwindcss": "^3",
  "typescript": "^5"
}
```

No external API dependencies. No database. No auth library needed.
