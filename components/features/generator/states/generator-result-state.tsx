"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CAPTION_RESULT_FILTERS, MOCK_CAPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { CaptionCard } from "../result/caption-card";
import { GeneratorDifferentOption } from "../generator-different-option";
import { AICaption, CaptionForm } from "@/types";

/**
 * Result state component displaying generated captions with filtering options.
 * Shows a grid of caption cards with filter buttons and additional options.
 * 
 * @example
 * ```tsx
 * <GeneratorResultState />
 * ```
 */
export function GeneratorResultState({ captions }: { captions: AICaption[] }) {
    const [activeFilter, setActiveFilter] = useState("All")


    const filteredCaptions = captions.filter((caption) => {
        if (activeFilter === "All") return true;

        if (caption.length === activeFilter) return true;

        if (caption.style === activeFilter) return true;

        return false;
    })


    return (
        <div className="h-[calc(100vh-52px)] w-full overflow-y-auto py-8 space-y-5 pb-36">
            <h2 className="text-2xl font-heading">5 Captions ready for <span className="capitalize">{captions[0].platform}</span></h2>
            <div className="flex items-center gap-1">
                {CAPTION_RESULT_FILTERS.map((filter, index) => (
                    <React.Fragment key={filter}>
                        {/* Add divider after the 4th button */}
                        {index === 4 && <div className="border-r border-border h-7 w-1 pl-2 mr-2" />}
                        <Button
                            onClick={() => setActiveFilter(filter)}
                            variant="secondary"
                            className={cn("rounded-full text-xs font-normal text-foreground hover:bg-foreground hover:text-white", activeFilter == filter && "bg-foreground text-white")}
                        >
                            {filter}
                        </Button>
                    </React.Fragment>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-5 gap-y-6">
                {filteredCaptions.map((caption, index) => (
                    <CaptionCard
                        key={caption.id}
                        caption={caption}
                        className={cn(index === 0 && "col-span-2", filteredCaptions.length % 2 == 0 && "col-span-2")}
                    />
                ))}
            </div>

            <GeneratorDifferentOption />
        </div>
    );
}
