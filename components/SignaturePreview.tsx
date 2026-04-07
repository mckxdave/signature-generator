"use client";

interface SignaturePreviewProps {
  html: string;
}

export default function SignaturePreview({ html }: SignaturePreviewProps) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Preview
      </h2>
      <div className="border border-gray-200 rounded-lg bg-white p-6 min-h-[160px] overflow-x-auto">
        {html ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <div className="flex items-center justify-center h-32 text-gray-300 text-sm">
            Vul het formulier in om een preview te zien
          </div>
        )}
      </div>
    </div>
  );
}
