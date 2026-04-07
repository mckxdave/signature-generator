"use client";

import { useState } from "react";

const steps = [
  'Klik op "Kopieer voor Gmail" hierboven',
  "Ga naar Gmail → Instellingen (tandwiel rechtsboven) → Alle instellingen bekijken",
  'Scroll naar "Handtekening" → klik "+ Nieuwe handtekening"',
  'Geef de handtekening een naam, bv. "Pro Active"',
  "Klik in het tekstveld → druk Cmd+V (Mac) of Ctrl+V (Windows) → de opmaak blijft behouden",
  'Scroll naar beneden → klik "Wijzigingen opslaan"',
];

export default function GmailInstructions() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800 text-sm">
          Hoe gebruik ik deze signature in Gmail?
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-2 bg-white border-t border-gray-100">
          <ol className="space-y-3">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-yellow text-brand-black text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="mt-0.5">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-gray-500 bg-gray-50 rounded p-3">
            <strong>Tip:</strong> Gebruik &ldquo;Kopieer voor Gmail&rdquo; (opgemaakte tekst) zodat de handtekening direct ingeplakt kan worden zonder dat de opmaak verloren gaat.
          </p>
        </div>
      )}
    </div>
  );
}
