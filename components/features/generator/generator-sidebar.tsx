"use client"

import { Button } from "@/components/ui/button";
import { GeneratorAdvancedOptions } from "./generator-advanced-options";
import { GeneratorContentInput } from "./generator-content-input";
import { GeneratorPlatformSelector } from "./generator-platform-selector";
import { Kbd } from "@/components/ui/kbd";
import { SettingAdjustIcon, SparkleFilledIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { CaptionForm } from "@/types";
import { getCommandKey } from "@/lib/utils";
import { Shortcut } from "./states/generator-shortcut";

const FREE_GENERATIONS_LEFT = 10;
const MAX_FREE_GENERATIONS = 10;
const MAX_HASHTAG_COUNT = 10;

/**
 * Main input sidebar component for the generator page.
 * Contains platform selection, content input, advanced options, and generate button.
 * Fixed at 440px width with sticky footer containing action buttons.
 * 
 * @example
 * ```tsx
 * <GeneratorSidebar />
 * ```
 */
export function GeneratorSidebar({ onSubmit, isLoading }: { onSubmit: (data: CaptionForm) => void; isLoading: boolean }) {
    const [form, setForm] = useState<CaptionForm>({
        platform: "instagram",
        cta: "",
        content: "",
        hashtagCount: 5,
        captionLength: "Medium",
        emojiStyle: "Minimal",
    })

    const cmdKey = getCommandKey(); // "⌘" or "Ctrl"

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const isEnter = e.key === "Enter";
            const isCmdOrCtrl = e.metaKey || e.ctrlKey; // metaKey = Cmd on Mac
            if (isEnter && isCmdOrCtrl && !isLoading) {
                e.preventDefault();
                onSubmit(form);
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [form, onSubmit, isLoading]);

    return (
        <aside className="h-[calc(100vh-52px)] w-[440px] overflow-y-auto p-8 border-r border-border">
            <div className="relative pb-36">
                <GeneratorPlatformSelector
                    value={form.platform}
                    onChange={(platform) => setForm((f) => ({ ...f, platform }))}
                />
                <GeneratorContentInput
                    value={form.content}
                    productLink={form.productLink}
                    onChange={(content) => setForm((f) => ({ ...f, content }))}
                    onProductLinkChange={(productLink) => setForm((f) => ({ ...f, productLink }))}

                />
                <GeneratorAdvancedOptions cta={form.cta}
                    hashtagCount={form.hashtagCount}
                    captionLength={form.captionLength}
                    emojiStyle={form.emojiStyle}
                    onCTAChange={(cta) => setForm((f) => ({ ...f, cta }))}
                    onHashtagCountChange={(hashtagCount) => setForm((f) => ({ ...f, hashtagCount }))}
                    onCaptionLengthChange={(captionLength) => setForm((f) => ({ ...f, captionLength }))}
                    onEmojiStyleChange={(emojiStyle) => setForm((f) => ({ ...f, emojiStyle }))} />
            </div>
            <div className="fixed bottom-0 left-0 w-[440px] border-r border-t border-border bg-background py-5">
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="w-full flex items-center justify-center gap-3 px-8 mb-3">
                        <Button
                            variant="outline"
                            size="icon-lg"
                            className="border-primary rounded-2xl h-12 w-12"
                            aria-label="Settings"
                        >
                            <SettingAdjustIcon className="size-12 p-3" />
                        </Button>
                        <Button
                            onClick={() => onSubmit(form)}
                            disabled={isLoading}
                            className="flex-1 rounded-2xl h-12 text-base flex items-center justify-center gap-2"
                            size="lg"
                            aria-label="Generate captions (⌘+Enter)"
                        >
                            <span className="flex items-center justify-center w-6">
                                {isLoading ? <Spinner className="w-5 h-5 animate-spin" /> : <SparkleFilledIcon className="size-6" />}
                            </span>
                            <span className="text-center">
                                {isLoading ? "Generating..." : "Generate Captions"}
                            </span>
                            <Shortcut />
                        </Button>

                    </div>
                    <p className="text-center text-xs">
                        <span className="text-primary">{FREE_GENERATIONS_LEFT}/{MAX_FREE_GENERATIONS}</span> free generation left
                    </p>
                </div>
            </div>
        </aside>
    );
}
