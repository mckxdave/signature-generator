"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";

interface PhotoUploadProps {
  photoBase64: string;
  onPhotoChange: (base64: string) => void;
}

export default function PhotoUpload({
  photoBase64,
  onPhotoChange,
}: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [error, setError] = useState("");

  function processFile(file: File) {
    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Enkel afbeeldingen zijn toegestaan (JPG, PNG, ...).");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError(
        "Afbeelding is groter dan 2MB. Dit kan problemen geven in sommige e-mailclients."
      );
    }

    setFileName(file.name);
    setFileSize(file.size);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onPhotoChange(result);
    };
    reader.readAsDataURL(file);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors text-center
          ${isDragging ? "border-brand-yellow bg-yellow-50" : "border-gray-300 hover:border-brand-yellow hover:bg-yellow-50"}`}
      >
        {photoBase64 ? (
          <div className="flex flex-col items-center gap-3">
            <img
              src={photoBase64}
              alt="Preview"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            />
            <span className="text-sm text-gray-500">
              Klik of sleep om te vervangen
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 16v-4m0 0V8m0 4h4m-4 0H8m13 4a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="font-medium text-gray-600">Sleep foto hierheen</p>
            <p className="text-sm">of klik om te bladeren</p>
            <p className="text-xs text-gray-400">JPG, PNG — max. aanbevolen 2MB</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {fileName && (
        <p className="mt-2 text-xs text-gray-500">
          {fileName} ({formatBytes(fileSize)})
        </p>
      )}

      {error && (
        <p className="mt-2 text-xs text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}
