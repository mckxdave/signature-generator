"use client";

import { useState, useMemo } from "react";
import PhotoUpload from "./PhotoUpload";
import SignaturePreview from "./SignaturePreview";
import CopyButton from "./CopyButton";
import GmailInstructions from "./GmailInstructions";
import { generateSignatureHTML } from "@/lib/generateSignatureHTML";

const LOGO_URL = "https://signature-generator-lac-nine.vercel.app/logo.png";

export default function SignatureBuilder() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("www.pro-active.be");
  const [photoBase64, setPhotoBase64] = useState("");

  const signatureHTML = useMemo(() => {
    if (!name || !photoBase64) return "";
    return generateSignatureHTML({
      name,
      phone,
      website,
      photoBase64,
      logoUrl: LOGO_URL,
    });
  }, [name, phone, website, photoBase64]);

  const isComplete = Boolean(name && photoBase64);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-8 text-center">
        <div className="inline-flex items-center gap-3 mb-3">
          <div
            className="h-1 w-8 rounded"
            style={{ backgroundColor: "#F8BF31" }}
          />
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Intern tool
          </span>
          <div
            className="h-1 w-8 rounded"
            style={{ backgroundColor: "#F8BF31" }}
          />
        </div>
        <h1 className="text-3xl font-black text-brand-black tracking-tight">
          Pro Active{" "}
          <span style={{ color: "#F8BF31" }}>Signature Generator</span>
        </h1>
        <p className="mt-2 text-gray-500 text-sm">
          Vul je gegevens in en genereer jouw gepersonaliseerde e-mailhandtekening.
        </p>
      </header>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h2 className="text-base font-bold text-gray-800">Jouw gegevens</h2>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Naam <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Davy Merckx"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Telefoonnummer <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+32 479 38 14 12"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Website
            </label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="www.pro-active.be"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            />
          </div>

          {/* Photo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Profielfoto <span className="text-red-500">*</span>
            </label>
            <PhotoUpload
              photoBase64={photoBase64}
              onPhotoChange={setPhotoBase64}
            />
          </div>

          {!isComplete && (
            <p className="text-xs text-gray-400">
              * Vul je naam en foto in om de handtekening te genereren.
            </p>
          )}
        </div>

        {/* Right: Preview + Actions */}
        <div className="space-y-6">
          {/* Preview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <SignaturePreview html={signatureHTML} />
          </div>

          {/* Copy buttons */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h2 className="text-base font-bold text-gray-800">
              Handtekening gebruiken
            </h2>
            <CopyButton html={signatureHTML} disabled={!isComplete} />
          </div>

          {/* Gmail Instructions */}
          <GmailInstructions />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-gray-400">
        Pro Active Performance Marketing &mdash; Intern gebruik
      </footer>
    </div>
  );
}
