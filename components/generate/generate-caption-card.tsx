"use client"

import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "../icons/chevron-down-icon";
import { Badge } from "../ui/badge";
import { StarFilledIcon } from "../icons/start-filled-icon";
import { CheckIcon, SparkleFilledIcon } from "../icons";
import { CopyIcon } from "../icons/copy-icon";
import { EditIcon } from "../icons/edit-icon";
import { SaveIcon } from "../icons/save-icon";
import { cn, copyToClipboard } from "@/lib/utils";

interface caption {
    id: string,
    isTopPick: boolean,
    isHighPotential: boolean,
    text: string,
    length: string,
    style: string
}

export function CaptionCard({ caption, className }: { caption: caption; className?: string }) {
    const [expanded, setExpanded] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
    const textRef = useRef<HTMLParagraphElement>(null);

    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (!caption.isTopPick && textRef.current) {
            const el = textRef.current;

            // Compute line height safely
            const lineHeight = parseInt(getComputedStyle(el).lineHeight) || 24;
            const twoLinesHeight = lineHeight * 2;

            // Determine if "Read more" button is needed
            setShowReadMore(el.scrollHeight > twoLinesHeight);

            // Set maxHeight for collapsed state
            setMaxHeight(twoLinesHeight);
        }
    }, [caption.text, caption.isTopPick]);

    const handleCopy = async () => {
        const success = await copyToClipboard(caption.text);
        if (success) {
            setCopied(true);
            setTimeout(() => {
                setCopied(false)
            }, 2000);
        }
    }

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
                        onClick={() => setExpanded(!expanded)}
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
                <Button onClick={handleCopy} className="flex-1 bg-foreground hover:bg-foreground/95">
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
