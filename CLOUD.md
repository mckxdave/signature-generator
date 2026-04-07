# CLOUD.md — Pro Active Signature Generator

## Overview

A standalone, internal web application for Pro Active employees to generate a branded HTML email signature — ready to copy as HTML or paste directly into Gmail.

No backend, no database, no authentication. Pure client-side app deployed as a static site.

---

## Hosting

**Platform:** Vercel (recommended) or Netlify  
**Type:** Static site — no server-side rendering needed  
**Domain:** e.g. `signature.pro-active.be` (custom domain via DNS CNAME)  
**Access control:** Restrict via Vercel Password Protection or Cloudflare Access (IP allowlist for office/VPN) — since it's internal only, no login system is needed

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js (App Router) | Easy static export, good DX |
| Styling | Tailwind CSS | Rapid UI, consistent spacing |
| Image handling | Client-side FileReader API | No uploads to server needed |
| Logo | Embedded base64 PNG (transparent) | No external asset dependency |
| Output | HTML string generation | Direct Gmail paste + copy |
| Deployment | `next export` → Vercel | Zero-config CI/CD |

---

## Data Flow

```
User fills form
  → uploads photo (FileReader → base64)
  → fills name, phone, website
  → clicks "Generate"
    → HTML string assembled in-browser
    → Preview rendered in iframe/div
    → Two actions available:
        1. "Copy HTML" → clipboard
        2. "Open in Gmail" → opens Gmail compose with signature injected via mailto: or manual paste instructions
```

No data ever leaves the browser. No API calls. No storage.

---

## Assets

| Asset | Format | Source |
|---|---|---|
| Pro Active Logo | PNG (transparent bg) | Embedded as base64 in source code |
| User photo | JPG/PNG uploaded by user | Converted to base64 in-browser, embedded inline in signature HTML |

---

## Deployment Steps

1. `git push` to main branch
2. Vercel auto-deploys
3. Set custom domain in Vercel dashboard
4. Optional: enable Vercel Password Protection under Settings → Security

---

## Environment

No `.env` variables needed — fully static, no secrets.
