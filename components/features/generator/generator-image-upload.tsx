"use client"

import { X } from "lucide-react";
import Image from "next/image";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ImageSolidIcon } from "@/components/icons";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/gif"];

/**
 * Image upload component with drag-and-drop and preview functionality.
 * Supports PNG, JPG, and GIF files up to 10MB.
 * 
 * @example
 * ```tsx
 * <GeneratorImageUpload />
 * ```
 */
export function GeneratorImageUpload({ onFileSelect }: { onFileSelect?: (file: File | null) => void }) {
    const [preview, setPreview] = useState<string | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)

    const validateFile = useCallback((file: File | null): boolean => {
        if (!file) return false;

        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
            setError("Please upload a PNG, JPG, or GIF file");
            return false;
        }

        if (file.size > MAX_FILE_SIZE) {
            setError("File size must be less than 10MB");
            return false;
        }

        setError(null);
        return true;
    }, []);

    const handleFile = useCallback((file: File | null) => {
        if (!file || !validateFile(file)) return;

        setFile(file)
        onFileSelect?.(file);

        const url = URL.createObjectURL(file)
        setPreview(url)
    }, [validateFile, onFileSelect]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null
        handleFile(file)
    }, [handleFile]);

    const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0] ?? null
        handleFile(file)
    }, [handleFile]);

    const clear = useCallback(() => {
        if (preview) URL.revokeObjectURL(preview)
        setPreview(null)
        setFile(null)
        setError(null)
        onFileSelect?.(null);
    }, [preview, onFileSelect]);

    return (
        <div className="flex flex-col gap-3 my-5">
            <label>Upload image</label>
            <label
                htmlFor="image-upload"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="cursor-pointer"
            >
                <input
                    id="image-upload"
                    type="file"
                    accept={ACCEPTED_IMAGE_TYPES.join(", ")}
                    className="hidden"
                    onChange={handleInputChange}
                />
                {preview ?
                    <div className="relative">
                        <Image
                            src={preview}
                            alt="Preview"
                            width={344}
                            height={144}
                            className="w-full object-cover h-full rounded-2xl"
                        />
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                clear()
                            }}
                            variant="ghost"
                            className="absolute top-3 right-3 rounded-full bg-black/30 w-8 h-8"
                        >
                            <X className="text-white w-4 h-4" />
                        </Button>
                    </div>
                    :
                    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl px-4 py-8 border-2 border-dashed border-border cursor-pointer hover:border-accent transition-colors">
                        <ImageSolidIcon className="size-8" />
                        <p className="text-sm text-muted-foreground">Click to upload an image</p>
                        <p className="text-[10px] text-muted-foreground-2">PNG, JPG, GIF up to 10MB</p>
                    </div>
                }
            </label>
            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    )
}
