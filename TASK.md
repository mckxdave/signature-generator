# TASK.md — Pro Active Signature Generator

## Goal

Build a client-side web app where Pro Active employees fill in their details, upload a photo, and get a branded HTML email signature — identical in style to the reference design — ready to use in Gmail.

---

## Reference Design (from screenshot)

```
┌─────────────────────────────────────────────────────┐
│  [circular photo]   DAVY MERCKX                     │
│                     +32 479 38 14 12                 │
│                     www.pro-active.be                │
│                                                      │
│                     PROACTIVE  [logo]                │
│                     PERFORMANCE MARKETING            │
└─────────────────────────────────────────────────────┘
```

- Photo: circular crop, ~80×80px
- Name: bold, dark (#1A1A1A), Lato font
- Phone + website: regular weight, slightly muted
- Logo: transparent PNG, right-aligned or below text
- Divider: thin vertical line between photo and text (optional, check reference)
- No shadows, no gradients, no decorative elements

---

## Tasks

### TASK-01 — Project Bootstrap
- [ ] Init Next.js 14 app with TypeScript + Tailwind
- [ ] Configure `tailwind.config.js` with Pro Active brand colors
  - Yellow: `#F8BF31`
  - Black: `#1A1A1A`
  - Font: Lato (load via Google Fonts in `layout.tsx`)
- [ ] Set page title: "Pro Active — Signature Generator"
- [ ] Set favicon (use logo or PA monogram)

---

### TASK-02 — Logo Asset
- [ ] Place transparent PNG logo in `lib/logoBase64.ts` as exported base64 const
- [ ] Verify it renders correctly at ~160px wide in preview

---

### TASK-03 — Form Fields (`SignatureBuilder.tsx`)

Required fields:
| Field | Type | Default | Validation |
|---|---|---|---|
| Naam | text input | empty | required |
| Telefoonnummer | text input | empty | required |
| Website | text input | `www.pro-active.be` | optional |
| Foto | file upload | none | required, image only |

- Photo upload: accept `image/*`, max recommended 2MB (warn user if larger)
- On photo select: use `FileReader` to convert to base64, store in state
- Live preview updates on every field change

---

### TASK-04 — Photo Upload Component (`PhotoUpload.tsx`)

- Drag & drop zone OR click to browse
- Shows circular preview of uploaded photo immediately
- Shows file name + size below the upload zone
- Error state: wrong file type or >2MB
- Uses `FileReader.readAsDataURL()` → base64 string passed up via prop/callback

---

### TASK-05 — HTML Generator (`lib/generateSignatureHTML.ts`)

Pure function — no side effects:

```ts
interface SignatureData {
  name: string;
  phone: string;
  website: string;
  photoBase64: string; // data:image/...;base64,...
  logoBase64: string;  // from lib/logoBase64.ts
}

export function generateSignatureHTML(data: SignatureData): string {
  // Returns complete HTML table-based email signature
  // Must use inline styles only (email clients strip CSS classes)
  // Table layout for maximum email client compatibility
}
```

**HTML Signature Spec (inline styles only — no classes):**

```html
<table cellpadding="0" cellspacing="0" border="0" 
       style="font-family: Lato, Arial, sans-serif; color: #1A1A1A;">
  <tr>
    <!-- Left: circular photo -->
    <td style="padding-right: 16px; vertical-align: top;">
      <img src="[photoBase64]" 
           width="80" height="80"
           style="border-radius: 50%; object-fit: cover; display: block;" />
    </td>
    <!-- Divider -->
    <td style="width: 1px; background-color: #E0E0E0; padding: 0 12px 0 0;"></td>
    <!-- Right: text + logo -->
    <td style="padding-left: 16px; vertical-align: top;">
      <p style="margin:0 0 2px 0; font-size:15px; font-weight:700;">[NAME]</p>
      <p style="margin:0 0 2px 0; font-size:13px; color:#555;">[PHONE]</p>
      <p style="margin:0 0 10px 0; font-size:13px; color:#555;">[WEBSITE]</p>
      <img src="[logoBase64]" width="160" style="display:block;" />
    </td>
  </tr>
</table>
```

> Note: test output in Gmail, Apple Mail, and Outlook. Adjust table structure if needed.

---

### TASK-06 — Signature Preview (`SignaturePreview.tsx`)

- Renders the generated HTML in a `<div dangerouslySetInnerHTML>` or sandboxed `<iframe>`
- Shows "Preview" label above
- Styled with a light border, white background — simulates email context
- Updates live as user types/uploads

---

### TASK-07 — Copy HTML Button (`CopyButton.tsx`)

- Button: "Kopieer HTML"
- On click: copies the raw HTML string to clipboard via `navigator.clipboard.writeText()`
- Shows success state ("✓ Gekopieerd!") for 2 seconds
- Disabled if form is incomplete (no name, no photo)

---

### TASK-08 — Gmail Instructions (`GmailInstructions.tsx`)

Step-by-step accordion or modal:

```
Hoe gebruik je deze signature in Gmail?

1. Klik op "Kopieer HTML" hierboven
2. Ga naar Gmail → Instellingen (tandwiel) → Alle instellingen bekijken
3. Scroll naar "Handtekening" → klik "+ Nieuwe handtekening"
4. Geef de handtekening een naam (bv. "Pro Active")
5. Klik in het tekstveld → druk Ctrl+Shift+V (Windows) of Cmd+Shift+V (Mac)
   → Dit plakt de opgemaakte HTML-signature direct in Gmail
6. Scroll naar beneden → klik "Wijzigingen opslaan"
```

> Tip: also add a "Copy Rich Text" button that uses the Clipboard API with `text/html` MIME type for direct paste without HTML-stripping.

---

### TASK-09 — Rich Text Copy (bonus, recommended)

In addition to copying raw HTML, implement:

```ts
async function copyRichText(html: string) {
  const blob = new Blob([html], { type: "text/html" });
  const item = new ClipboardItem({ "text/html": blob });
  await navigator.clipboard.write([item]);
}
```

Button label: "Kopieer voor Gmail (opgemaakte tekst)"  
This allows direct Ctrl+V paste into Gmail compose without needing "Paste as HTML".

---

### TASK-10 — UI Polish

- Page layout: centered, max-width 800px
- Left column: form + upload
- Right column: live preview
- Mobile: stack vertically
- Header: Pro Active logo + "Signature Generator" titel
- Brand yellow `#F8BF31` used for primary button, accents
- Font: Lato via Google Fonts

---

### TASK-11 — QA Checklist

- [ ] Signature renders correctly in Gmail (Chrome)
- [ ] Circular photo crop works in Gmail
- [ ] Logo shows transparent background in Gmail
- [ ] HTML copy works in all modern browsers
- [ ] Rich text copy works in Gmail
- [ ] Form validation: can't generate without name + photo
- [ ] Photo > 2MB shows warning (large base64 may cause issues in some clients)
- [ ] Works on mobile (iOS Safari, Chrome Android)
- [ ] Deployed to Vercel, accessible at internal URL

---

## Out of Scope (v1)

- Login / authentication
- Saving signatures to a database
- Multiple signature templates
- Additional fields (LinkedIn, title, etc.)
- Email sending functionality
