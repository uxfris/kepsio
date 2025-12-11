"use client"

import { Button } from "@/components/ui/button";
import { GeneratorAdvancedOptions } from "./generator-advanced-options";
import { GeneratorContentInput } from "./generator-content-input";
import { GeneratorPlatformSelector } from "./generator-platform-selector";
import { Kbd } from "@/components/ui/kbd";
import { SettingAdjustIcon, SparkleFilledIcon } from "@/components/icons";
import { GeneratorForm } from "@/app/(dashboard)/generate/types";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

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
export function GeneratorSidebar({ onSubmit, isLoading }: { onSubmit: (data: GeneratorForm) => void; isLoading: boolean }) {
    const [form, setForm] = useState<GeneratorForm>({
        platform: "instagram",
        cta: "",
        content: "",
        hashtagCount: 5,
        captionLength: "Medium",
        emojiStyle: "Minimal",
    })

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
            <div className="fixed bottom-0 left-0 w-[440px] border-r border-t border-border bg-background px-16 py-5">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
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
                            className="w-full rounded-2xl h-12 text-base"
                            size="lg"
                            aria-label="Generate captions (⌘+Enter)"
                        >
                            {isLoading ? <Spinner /> : <SparkleFilledIcon className="size-6" />}
                            {isLoading ? "Generating" : "Generate Captions"}
                            {!isLoading && <div className="flex items-center gap-1 ml-2">
                                <Kbd>⌘</Kbd>
                                <Kbd>Enter</Kbd>
                            </div>}
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
