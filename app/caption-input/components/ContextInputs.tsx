import React from "react";
import { X } from "lucide-react";
import { Input } from "../../../components/ui/Input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../components/ui/Select";
import { PREVIOUS_POSTS } from "../utils/constants";
import { ContextData } from "../types";

interface ContextInputsProps {
  selectedContextItems: string[];
  contextData: ContextData;
  onContextDataUpdate: (updates: Partial<ContextData>) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export const ContextInputs = ({
  selectedContextItems,
  contextData,
  onContextDataUpdate,
  onImageUpload,
  onRemoveImage,
}: ContextInputsProps) => {
  return (
    <>
      {/* Product Link Input */}
      {selectedContextItems.includes("product-link") && (
        <div className="border-t border-border p-4 bg-section">
          <label className="block text-sm font-medium text-primary mb-2">
            Product Link
          </label>
          <Input
            type="url"
            value={contextData.productLink}
            onChange={(e) =>
              onContextDataUpdate({ productLink: e.target.value })
            }
            placeholder="https://example.com/product"
            className="w-full"
          />
        </div>
      )}

      {/* Image Upload Input */}
      {selectedContextItems.includes("upload-image") && (
        <div className="border-t border-border p-4 bg-section">
          <label className="block text-sm font-medium text-primary mb-2">
            Upload Image
          </label>
          {!contextData.imagePreview ? (
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <svg
                  className="w-8 h-8 text-text-body"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm text-text-body">
                  Click to upload an image
                </span>
                <span className="text-xs text-hint">
                  PNG, JPG, GIF up to 10MB
                </span>
              </label>
            </div>
          ) : (
            <div className="relative">
              <img
                src={contextData.imagePreview}
                alt="Uploaded preview"
                className="w-full h-32 object-cover rounded-xl"
              />
              <button
                onClick={onRemoveImage}
                className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Previous Post Select */}
      {selectedContextItems.includes("previous-post") && (
        <div className="border-t border-border p-4 bg-section">
          <label className="block text-sm font-medium text-primary mb-2">
            Select Previous Post
          </label>
          <Select
            value={contextData.selectedPreviousPost}
            onValueChange={(value) =>
              onContextDataUpdate({ selectedPreviousPost: value })
            }
          >
            <SelectTrigger className="w-full border border-border rounded-xl bg-surface text-sm">
              <SelectValue placeholder="Choose a previous post" />
            </SelectTrigger>
            <SelectContent>
              {PREVIOUS_POSTS.map((post) => (
                <SelectItem key={post.id} value={post.title}>
                  <div className="flex flex-col">
                    <span className="font-medium">{post.title}</span>
                    <span className="text-xs text-hint">{post.date}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
};
