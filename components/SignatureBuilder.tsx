"use client";

import { useState, useMemo } from "react";
import PhotoUpload from "./PhotoUpload";
import SignaturePreview from "./SignaturePreview";
import CopyButton from "./CopyButton";
import GmailInstructions from "./GmailInstructions";
import { generateSignatureHTML } from "@/lib/generateSignatureHTML";
import { generateSignatureHTMLv2 } from "@/lib/generateSignatureHTMLv2";

const LOGO_URL = "https://signature-generator-lac-nine.vercel.app/logo.png";

type Version = "v1" | "v2";

function formatBelgianPhone(input: string): string {
  const digits = input.replace(/\D/g, "").replace(/^0+/, "");
  // Strip leading 32 country code if present
  const local = digits.startsWith("32") ? digits.slice(2) : digits;
  // Belgian mobile numbers have 9 digits after country code
  const d = local.slice(0, 9);
  if (d.length === 0) return "";
  if (d.length <= 3) return `+32 ${d}`;
  if (d.length <= 5) return `+32 ${d.slice(0, 3)} ${d.slice(3)}`;
  if (d.length <= 7) return `+32 ${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5)}`;
  return `+32 ${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 7)} ${d.slice(7)}`;
}

export default function SignatureBuilder() {
  const [version, setVersion] = useState<Version>("v2");
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("www.pro-active.be");
  const [photoBase64, setPhotoBase64] = useState("");

  const signatureHTML = useMemo(() => {
    if (!name || !photoBase64) return "";
    if (version === "v1") {
      return generateSignatureHTML({
        name,
        phone,
        website,
        photoBase64,
        logoUrl: LOGO_URL,
      });
    }
    return generateSignatureHTMLv2({
      name,
      jobTitle,
      email,
      phone,
      website,
      photoBase64,
      logoUrl: LOGO_URL,
    });
  }, [version, name, jobTitle, email, phone, website, photoBase64]);

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

      {/* Version Tabs */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
          <button
            onClick={() => setVersion("v1")}
            className={`px-5 py-2 rounded-md text-sm font-semibold transition-all ${
              version === "v1"
                ? "bg-brand-yellow text-brand-black shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            V1 — Klassiek
          </button>
          <button
            onClick={() => setVersion("v2")}
            className={`px-5 py-2 rounded-md text-sm font-semibold transition-all ${
              version === "v2"
                ? "bg-brand-yellow text-brand-black shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            V2 — Brand Guide
          </button>
        </div>
      </div>

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

          {/* Job Title — V2 only */}
          {version === "v2" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Functietitel
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Performance Marketeer"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              />
            </div>
          )}

          {/* Email — V2 only */}
          {version === "v2" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                E-mailadres
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="davy@pro-active.be"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              />
            </div>
          )}

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Telefoonnummer <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(formatBelgianPhone(e.target.value))}
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
