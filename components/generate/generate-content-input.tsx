"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import GenerateImageInput from "./generate-image-input";
import { GenerateDropdownMenuContent } from "./generate-dropdown-menu";
import { useDropdownMenuStore } from "@/store/dropdown-menu-store";
import { LinkIcon, ImageIcon } from "../icons";

/**
 * Content input component for the generate page.
 * Includes a textarea for content description and optional sections for product links and image uploads.
 */
export function ContentInput() {
  const { isProductLinkOpen, isUploadImageOpen, toggleProductLink, toggleUploadImage } = useDropdownMenuStore();
  return (
    <div className="flex flex-col gap-3 mb-8">
      <label htmlFor="content">What&apos;s your content about</label>
      <div className="rounded-[20px]  pt-3 pb-4 bg-white shadow-shadowbrand">
        <div className="px-3">
          <Textarea
            id="content"
            className="h-20 resize-none w-full shadow-none"
            placeholder="product launch, announcement, event recap, milestone, etc."
          />
        </div>
        <div className="w-full flex items-end justify-between px-4">
          <GenerateDropdownMenuContent />
          <p className="text-xs to-muted-foreground">27/500</p>
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
              id="product-link"
              type="url"
              placeholder="https://example.com/product"
            />
          </div>}
          {isUploadImageOpen && <GenerateImageInput />}
        </div>}
      </div>
    </div>
  );
}
