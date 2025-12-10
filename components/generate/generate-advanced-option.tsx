"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "../ui/slider";
import { useState } from "react";

/**
 * Advanced options component for the generate page.
 * Provides additional configuration options including CTA selection, hashtag count, caption length, and emoji style.
 */
export function AdvancedOption() {
  const [sliderValue, setSliderValue] = useState<number>(5)
  return (
    <div className="shadow-shadowbrand rounded-2xl">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:bg-muted text-base font-normal font-body px-4 hover:no-underline">
            Advanced Options
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-8 border-t border-border px-4 py-5">
              <div className="flex flex-col gap-3">
                <label htmlFor="cta">Call-to-Action</label>
                <Select>
                  <SelectTrigger className="w-full bg-input rounded-2xl p-4 shadow-shadowbrand">
                    <SelectValue placeholder="Select Call-to-Action" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="link-in-bio" className="rounded-md">Link in bio</SelectItem>
                    <SelectItem value="shop-now">Shop now</SelectItem>
                    <SelectItem value="dm-me">DM me</SelectItem>
                    <SelectItem value="comment-below">Comment below</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="hashtag">Hashtag: <span className="text-accent">{sliderValue}</span></label>
                <Slider defaultValue={[sliderValue]} max={10} step={1}
                  onValueChange={(val: number[]) => setSliderValue(val[0])} />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground-2">Min</p>
                  <p className="text-xs text-muted-foreground-2">Max</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="caption-length">Caption length</label>
                <Tabs defaultValue="medium" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="short">
                      <p className="text-xs">Short</p>
                    </TabsTrigger>
                    <TabsTrigger value="medium">
                      <p className="text-xs">Medium</p>
                    </TabsTrigger>
                    <TabsTrigger value="long">
                      <p className="text-xs">Long</p>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="emoji-style">Emoji Style</label>
                <Tabs defaultValue="minimal" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="none">
                      <p className="text-xs">None</p>
                    </TabsTrigger>
                    <TabsTrigger value="minimal" className="">
                      <p className="text-xs">Minimal</p>
                    </TabsTrigger>
                    <TabsTrigger value="generous">
                      <p className="text-xs">Generous</p>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
