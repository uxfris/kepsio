"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { GeneratorImageUpload } from "./generator-image-upload";
import { GeneratorDropdownMenu } from "./generator-dropdown-menu";
import { useGeneratorStore } from "@/features/generator";
import { LinkIcon, ImageIcon } from "@/components/icons";

const MAX_CONTENT_LENGTH = 500;

/**
 * Content input component for the generator.
 * Includes a textarea for content description and optional sections for product links and image uploads.
 * 
 * @example
 * ```tsx
 * <GeneratorContentInput />
 * ```
 */
export function GeneratorContentInput({ value, onChange, productLink, onProductLinkChange, onImageChange }: { value: string; onChange: (val: string) => void; productLink?: string, onProductLinkChange?: (val: string) => void, onImageChange?: (file: File | null) => void }) {
    const { isProductLinkOpen, isUploadImageOpen, toggleProductLink, toggleUploadImage } = useGeneratorStore();

    return (
        <div className="flex flex-col gap-3 mb-8">
            <label htmlFor="content">What&apos;s your content about</label>
            <div className="rounded-[20px]  pt-3 pb-4 bg-white shadow-shadowbrand">
                <div className="px-3">
                    <Textarea
                        id="content"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="h-20 resize-none w-full shadow-none"
                        placeholder="product launch, announcement, event recap, milestone, etc."
                        maxLength={MAX_CONTENT_LENGTH}
                    />
                </div>
                <div className="w-full flex items-end justify-between px-4">
                    <GeneratorDropdownMenu />
                    <p className="text-xs to-muted-foreground">{value.length}/{MAX_CONTENT_LENGTH}</p>
                </div>
                {(isProductLinkOpen || isUploadImageOpen) && <div className="mt-3 px-4 bg-background">
                    <div className="border-b" />
                    <div className="my-5">
                        <div className="flex items-center gap-3">
                            {isProductLinkOpen && <div
                                className="flex items-center shadow-sm bg-white gap-1 pl-2 rounded-lg"
                            >
                                <LinkIcon className="size-5" />
                                <p className="text-xs font-normal">Add product link</p>
                                <Button variant="ghost" size="icon-sm" onClick={() => toggleProductLink()}><X /></Button>
                            </div>}
                            {isUploadImageOpen && <div
                                className="flex items-center shadow-sm bg-white gap-1 pl-2 rounded-lg"
                            >
                                <ImageIcon className="size-5" />
                                <p className="text-xs font-normal">Upload Image</p>
                                <Button variant="ghost" size="icon-sm" onClick={() => toggleUploadImage()}><X /></Button>
                            </div>}
                        </div>
                    </div>
                    <div className="border-b" />
                    {isProductLinkOpen && <div className="flex flex-col gap-3 my-5">
                        <label htmlFor="product-link">Product Link</label>
                        <Input
                            value={productLink ?? ""}
                            onChange={(e) => onProductLinkChange?.(e.target.value)}
                            id="product-link"
                            type="url"
                            placeholder="https://example.com/product"
                        />
                    </div>}
                    {isUploadImageOpen && <GeneratorImageUpload onFileSelect={onImageChange} />}
                </div>}
            </div>
        </div>
    );
}
