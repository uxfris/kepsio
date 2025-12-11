"use client"

import React, { useState } from "react";
import { Button } from "../ui/button";
import { captionResultFilters } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { CaptionCard } from "./generate-caption-card";
import { DifferentOption } from "./generate-different-option";

export function ResultState() {
    const [activeFilter, setActiveFilter] = useState("All")


    return (
        <div className="h-[calc(100vh-52px)] w-full overflow-y-auto py-8 space-y-5 pb-36">
            <h2 className="text-2xl font-heading">5 Captions ready for Instagram</h2>
            <div className="flex items-center gap-1">
                {captionResultFilters.map((filter, index) => (
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
            <CaptionCard isTopPick={true} className="mb-6" />
            <div className="grid grid-cols-2 gap-5 gap-y-6">
                {[1, 2, 3, 4].map((caption) => (
                    <CaptionCard key={caption} isTopPick={false} />
                ))}
            </div>
            <DifferentOption />
        </div>
    );
}
