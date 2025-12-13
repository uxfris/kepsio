"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CAPTION_RESULT_FILTERS, MOCK_CAPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { CaptionCard } from "../result/caption-card";
import { GeneratorDifferentOption } from "../generator-different-option";
import { AICaption, CaptionForm } from "@/types";
import { motion, AnimatePresence, Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.4,
            ease: "easeOut"
        }
    })
};

/**
 * Result state component displaying generated captions with filtering options.
 * Shows a grid of caption cards with filter buttons and additional options.
 * 
 * @example
 * ```tsx
 * <GeneratorResultState />
 * ```
 */
export function GeneratorResultState({ captions, onGenerateVariation }: { captions: AICaption[], onGenerateVariation: (variation: string) => void }) {
    const [activeFilter, setActiveFilter] = useState("All")

    console.log("GeneratorResultState received captions:", captions);

    if (!captions || captions.length === 0) {
        return <div className="p-8 text-center text-muted-foreground">No captions generated.</div>;
    }


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
            <motion.div
                className="grid grid-cols-2 gap-5 gap-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence mode="popLayout">
                    {filteredCaptions.map((caption, index) => (
                        <motion.div
                            key={caption.id}
                            layout
                            custom={index}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className={cn(index === 0 && "col-span-2", filteredCaptions.length % 2 == 0 && "col-span-2")}
                        >
                            <CaptionCard
                                caption={caption}
                                className="h-full"
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <GeneratorDifferentOption onOptionSelect={onGenerateVariation} />
        </div>
    );
}
