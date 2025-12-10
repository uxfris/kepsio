"use client"
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { ImageSolidIcon } from "../icons";

export default function GenerateImageInput() {
    const [preview, setPreview] = useState<string | null>(null)
    const [_file, setFile] = useState<File | null>(null)

    function handleFile(file: File | null) {
        if (!file) return
        setFile(file)

        const url = URL.createObjectURL(file)
        setPreview(url)
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null
        handleFile(file)
    }

    function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0] ?? null
        handleFile(file)
    }

    function clear() {
        if (preview) URL.revokeObjectURL(preview)
        setPreview(null)
        setFile(null)
    }



    return <div className="flex flex-col gap-3 my-5">
        <label>Upload image</label>
        <label htmlFor="image-upload"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop
            }>
            <input id="image-upload" type="file" accept="image/png, image/jpeg, image/gif" className="hidden"
                onChange={handleInputChange} />
            {preview ?
                <div className="relative">
                    <Image src={preview} alt={"Preview"} width={344} height={144} className="w-full object-cover h-full rounded-2xl" />
                    <Button onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        clear()
                    }} variant="ghost" className="absolute top-3 right-3 rounded-full bg-black/30 w-8 h-8"><X className="text-white w-4 h-4" /></Button>
                </div>
                :
                <div className="flex flex-col items-center justify-center gap-2 rounded-2xl px-4 py-8 border-2 border-dashed border-border cursor-pointer">
                    <ImageSolidIcon className="size-8" />
                    <p className="text-sm text-muted-foreground">Click to upload an image</p>
                    <p className="text-[10px] text-muted-foreground-2">PNG, JPG, GIF up to 10MB</p>
                </div>}
        </label>
    </div>
}
