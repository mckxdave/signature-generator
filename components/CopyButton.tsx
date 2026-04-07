"use client";

import { useState } from "react";

interface CopyButtonProps {
  html: string;
  disabled: boolean;
}

async function copyRichText(html: string) {
  const blob = new Blob([html], { type: "text/html" });
  const item = new ClipboardItem({ "text/html": blob });
  await navigator.clipboard.write([item]);
}

export default function CopyButton({ html, disabled }: CopyButtonProps) {
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedRich, setCopiedRich] = useState(false);

  async function handleCopyHtml() {
    try {
      await navigator.clipboard.writeText(html);
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    } catch {
      // fallback
    }
  }

  async function handleCopyRich() {
    try {
      await copyRichText(html);
      setCopiedRich(true);
      setTimeout(() => setCopiedRich(false), 2000);
    } catch {
      // ClipboardItem not supported — fallback to raw HTML
      await handleCopyHtml();
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleCopyRich}
        disabled={disabled}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all
          ${disabled
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-brand-yellow text-brand-black hover:brightness-95 active:brightness-90"
          }`}
      >
        {copiedRich ? (
          <>
            <CheckIcon />
            Gekopieerd voor Gmail!
          </>
        ) : (
          <>
            <GmailIcon />
            Kopieer voor Gmail
          </>
        )}
      </button>

      <button
        onClick={handleCopyHtml}
        disabled={disabled}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm border transition-all
          ${disabled
            ? "border-gray-200 text-gray-400 cursor-not-allowed"
            : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
          }`}
      >
        {copiedHtml ? (
          <>
            <CheckIcon />
            Gekopieerd!
          </>
        ) : (
          "Kopieer HTML"
        )}
      </button>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function GmailIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );
}
