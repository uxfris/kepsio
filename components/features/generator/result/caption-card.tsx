"use client"

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@/components/icons/chevron-down-icon";
import { Badge } from "@/components/ui/badge";
import { StarFilledIcon } from "@/components/icons/start-filled-icon";
import { CheckIcon, SparkleFilledIcon } from "@/components/icons";
import { CopyIcon } from "@/components/icons/copy-icon";
import { EditIcon } from "@/components/icons/edit-icon";
import { SaveIcon } from "@/components/icons/save-icon";
import { cn } from "@/lib/utils";
import { useCaptionCard, useClipboard } from "@/features/generator/hooks";
import type { Caption } from "@/features/generator/types";

interface CaptionCardProps {
    /** Caption data to display */
    caption: Caption;
    /** Optional className for styling */
    className?: string;
}

/**
 * Card component for displaying a generated caption with expand/collapse and copy functionality.
 * 
 * Features:
 * - Expandable text with "Read more" for non-top picks
 * - Copy to clipboard functionality
 * - Edit and save buttons
 * - Badges for length, style, and high-potential marking
 * - Special banner for top picks
 */
export function CaptionCard({ caption, className }: CaptionCardProps) {
    const textRef = useRef<HTMLParagraphElement>(null);

    // Custom hooks for business logic
    const { expanded, showReadMore, maxHeight, toggleExpanded, checkReadMore } = useCaptionCard();
    const { copied, handleCopy } = useClipboard();

    // Check if "Read more" is needed when caption changes
    useEffect(() => {
        checkReadMore(textRef.current, caption.isTopPick);
    }, [caption.text, caption.isTopPick, checkReadMore]);

    return (
        <div
            className={cn(
                "relative group flex flex-col bg-card shadow-shadowbrand rounded-2xl overflow-clip",
                caption.isTopPick ? "pb-6 gap-5" : "py-6 gap-5",
                className
            )}
        >
            {/* Top pick banner */}
            {caption.isTopPick && (
                <div className="flex items-center gap-[6px] px-3 py-2 bg-secondary border-b border-border">
                    <SparkleFilledIcon className="size-4" />
                    <p className="font-medium text-sm">Our top pick for you</p>
                </div>
            )}

            <div className="space-y-2 px-6">
                <div
                    className="overflow-hidden transition-[max-height] duration-300"
                    style={{
                        maxHeight: caption.isTopPick
                            ? undefined
                            : expanded
                                ? textRef.current?.scrollHeight
                                : maxHeight,
                    }}
                >
                    <p ref={textRef} className="text-card-foreground text-[14px] leading-6">
                        {caption.text}
                    </p>
                </div>

                {!caption.isTopPick && showReadMore && (
                    <Button
                        variant="ghost"
                        className=" text-accent gap-1 inline-flex p-0 hover:bg-transparent hover:text-accent rounded-full h-8"
                        onClick={toggleExpanded}
                    >
                        <p className="text-xs">{expanded ? "Read less" : "Read more"}</p>
                        <ChevronDownIcon
                            className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""
                                }`}
                        />
                    </Button>
                )}
            </div>

            {/* Badge row */}
            <div className="flex items-center gap-1 px-6 opacity-100 translate-y-0 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
                <Badge variant="secondary">{caption.length}</Badge>
                <Badge variant="secondary">{caption.style}</Badge>
                {caption.isHighPotential && <Badge variant="secondary">
                    <StarFilledIcon />
                    High-potential
                </Badge>}
            </div>

            {/* Hover button group */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <Button
                    onClick={() => handleCopy(caption.text)}
                    className="flex-1 bg-foreground hover:bg-foreground/95"
                >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                    {copied ? "Copied" : "Copy"}
                </Button>
                <Button variant="secondary" className="text-foreground">
                    <EditIcon />
                    Edit
                </Button>
                <Button variant="secondary" className="text-foreground">
                    <SaveIcon />
                    Save
                </Button>
            </div>
        </div>
    );
}
