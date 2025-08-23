"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

interface ImageInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
  required?: boolean;
  imagePreview?: boolean;
}

const ImageInput = <T extends FieldValues>({
  name,
  label,
  imagePreview = false,
  register,
  errors,
  disabled = false,
  required = false,
}: ImageInputProps<T>) => {
  const error = errors[name];
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-600">*</span>}
      </label>

      <input
        id={name}
        type="file"
        accept="image/*"
        disabled={disabled}
        {...register(name)}
        onChange={(e) => {
          handleImageChange(e);
          register(name).onChange(e); // react-hook-form tracking
        }}
        className={`block w-full text-sm text-gray-700
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-gray-100 file:text-gray-700
          hover:file:bg-gray-200
          border rounded-md p-1
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      />
      {imagePreview && (
        <Image
          src={previewUrl || ""}
          alt="Image preview"
          width={128}
          height={128}
          className="object-cover rounded-md border border-gray-300"
        />
      )}

      {error && (
        <p className="text-sm text-red-600 mt-1">{error.message?.toString()}</p>
      )}
    </div>
  );
};

export default ImageInput;
