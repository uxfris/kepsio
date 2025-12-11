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
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { CTA_OPTIONS, CAPTION_LENGTH_OPTIONS, EMOJI_STYLE_OPTIONS } from "@/lib/constants";

const DEFAULT_HASHTAG_COUNT = 5;
const MAX_HASHTAG_COUNT = 10;

/**
 * Advanced options accordion for caption generation configuration.
 * Provides options for CTA, hashtag count, caption length, and emoji style.
 * 
 * @example
 * ```tsx
 * <GeneratorAdvancedOptions />
 * ```
 */
export function GeneratorAdvancedOptions() {
    const [hashtagCount, setHashtagCount] = useState<number>(DEFAULT_HASHTAG_COUNT);

    return (
        <div className="shadow-shadowbrand rounded-2xl">
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="hover:bg-muted text-base font-normal font-body px-4 hover:no-underline">
                        Advanced Options
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-8 border-t border-border px-4 py-5">
                            {/* Call-to-Action Selection */}
                            <div className="flex flex-col gap-3">
                                <label htmlFor="cta">Call-to-Action</label>
                                <Select>
                                    <SelectTrigger className="w-full bg-input rounded-2xl p-4 shadow-shadowbrand">
                                        <SelectValue placeholder="Select Call-to-Action" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl">
                                        {CTA_OPTIONS.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                className="rounded-md"
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Hashtag Count Slider */}
                            <div className="flex flex-col gap-3">
                                <label htmlFor="hashtag">
                                    Hashtags: <span className="text-accent">{hashtagCount}</span>
                                </label>
                                <Slider
                                    defaultValue={[hashtagCount]}
                                    max={MAX_HASHTAG_COUNT}
                                    step={1}
                                    onValueChange={(val: number[]) => setHashtagCount(val[0])}
                                />
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-muted-foreground-2">Min</p>
                                    <p className="text-xs text-muted-foreground-2">Max</p>
                                </div>
                            </div>

                            {/* Caption Length Selection */}
                            <div className="flex flex-col gap-3">
                                <label htmlFor="caption-length">Caption length</label>
                                <Tabs defaultValue="Medium" className="w-full">
                                    <TabsList className="w-full">
                                        {CAPTION_LENGTH_OPTIONS.map((length) => (
                                            <TabsTrigger key={length} value={length}>
                                                <p className="text-xs">{length}</p>
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                </Tabs>
                            </div>

                            {/* Emoji Style Selection */}
                            <div className="flex flex-col gap-3">
                                <label htmlFor="emoji-style">Emoji Style</label>
                                <Tabs defaultValue="Minimal" className="w-full">
                                    <TabsList className="w-full">
                                        {EMOJI_STYLE_OPTIONS.map((style) => (
                                            <TabsTrigger key={style} value={style}>
                                                <p className="text-xs">{style}</p>
                                            </TabsTrigger>
                                        ))}
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
