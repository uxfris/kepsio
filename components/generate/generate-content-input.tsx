import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import Image from "next/image";
import GenerateImageInput from "./generate-image-input";
import { GenerateDropdownMenuContent } from "./generate-dropdown-menu";

export function ContentInput() {
  return (
    <div className="flex flex-col gap-3 mb-8">
      <label htmlFor="content">What's your content about</label>
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
        <div className="mt-3 px-4 bg-background">
          <div className="border-b" />
          <div className="my-5">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="shadow-sm bg-input text-xs font-normal"
              >
                <Image
                  src={"/icons/link.svg"}
                  alt={"Link"}
                  width={20}
                  height={20}
                />
                Add product link
                <X />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="shadow-sm bg-input text-xs font-normal"
              >
                <Image
                  src={"/icons/image.svg"}
                  alt={"Link"}
                  width={20}
                  height={20}
                />
                Upload image
                <X />
              </Button>
            </div>
          </div>
          <div className="border-b" />
          <div className="flex flex-col gap-3 my-5">
            <label htmlFor="product-link">Product Link</label>
            <Input
              id="product-link"
              type="url"
              placeholder="https://example.com/product"
            />
          </div>
          <div className="border-b" />
          <GenerateImageInput />
        </div>
      </div>
    </div>
  );
}
