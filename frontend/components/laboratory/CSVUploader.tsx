// components/laboratory/CSVUploader.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CSVUploader({
  onUpload,
  isLoading,
}: {
  onUpload: (file: File) => void;
  isLoading: boolean;
}) {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onUpload(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden file input */}
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
        id="csv-upload"
      />

      {/* Button with label */}
      <label htmlFor="csv-upload">
        <Button
          variant="secondary"
          className="w-full"
          asChild // Use asChild to delegate props to the label
        >
          <span>{fileName || "Upload CSV"}</span>
        </Button>
      </label>

      {/* Display file name */}
      {fileName && <p className="text-sm text-gray-500 truncate">{fileName}</p>}
    </div>
  );
}