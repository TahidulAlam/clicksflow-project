"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";
import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

interface AttachmentInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
  required?: boolean;
  imagePreview?: boolean;
  accept?: string;
  onUpload?: (file: File | null) => void;
}

const AttachmentInput = <T extends FieldValues>({
  name,
  label,
  imagePreview = false,
  register,
  errors,
  disabled = false,
  required = false,
  accept,
  onUpload,
}: AttachmentInputProps<T>) => {
  const error = errors[name];
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Detect if the component is inside a form
  useEffect(() => {
    let parent = fileInputRef.current?.parentElement;
    while (parent) {
      if (parent.tagName === "FORM") {
        formRef.current = parent as HTMLFormElement;
        break;
      }
      parent = parent.parentElement;
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      if (imagePreview && selectedFile.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(objectUrl);
      } else {
        setPreviewUrl(null);
      }
    } else {
      setFile(null);
      setFileName(null);
      setPreviewUrl(null);
    }
  };

  const handleChooseFileClick = () => {
    if (fileInputRef.current && !disabled) {
      fileInputRef.current.click();
    }
  };

  const handleUploadClick = () => {
    if (disabled) return;

    if (onUpload) {
      // If a custom onUpload callback is provided, use it
      onUpload(file);
    } else if (formRef.current) {
      // Otherwise, trigger form submission if inside a form
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  // Truncate file name for display (e.g., "Scre...5.png")
  const truncateFileName = (name: string, maxLength: number = 10) => {
    if (name.length <= maxLength) return name;
    const start = name.substring(0, 4);
    const end = name.substring(name.length - 5);
    return `${start}...${end}`;
  };

  // Cleanup preview URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-600">*</span>}
      </label>

      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
        {/* Choose File Button */}
        <button
          type="button"
          onClick={handleChooseFileClick}
          disabled={disabled}
          className={`px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Choose file"
        >
          Choose File
        </button>

        {/* Hidden File Input */}
        <input
          id={name}
          type="file"
          accept={accept}
          disabled={disabled}
          {...register(name)}
          onChange={(e) => {
            handleFileChange(e);
            register(name).onChange(e);
          }}
          className="hidden"
          ref={fileInputRef}
        />

        {/* File Name Display */}
        <div
          className={`flex-1 px-3 py-2 text-sm text-gray-500 bg-white border-x border-gray-300 truncate ${
            !fileName ? "text-gray-400" : ""
          }`}
        >
          {fileName ? truncateFileName(fileName) : "No file chosen"}
        </div>

        {/* Upload Button */}
        <button
          type="button"
          onClick={handleUploadClick}
          disabled={disabled || !fileName}
          className={`flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
            disabled || !fileName ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Upload file"
        >
          <FiUpload className="w-4 h-4" aria-hidden="true" />
          Upload
        </button>
      </div>

      {imagePreview && previewUrl && (
        <Image
          src={previewUrl}
          alt="Image preview"
          width={128}
          height={128}
          className="object-cover rounded-md border border-gray-300 mt-2"
        />
      )}

      {error && (
        <p className="text-sm text-red-600 mt-1">{error.message?.toString()}</p>
      )}
    </div>
  );
};

export default AttachmentInput;
