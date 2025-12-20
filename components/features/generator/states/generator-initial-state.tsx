import { LogoOutlineIcon, BulbIcon } from "@/components/icons";

/**
 * Initial state component displayed when no content has been generated yet.
 * Shows the app logo, instructions, and a helpful tip.
 * 
 * @example
 * ```tsx
 * <GeneratorInitialState />
 * ```
 */
export function GeneratorInitialState() {
    return (
        <div className="flex flex-col items-center justify-center gap-12 px-4 md:px-8 pt-12 md:pt-0 pb-32">
            <LogoOutlineIcon className="w-[120px] h-[98px]" />
            <div className="space-y-5 text-center">
                <h2 className="text-2xl md:text-3xl font-heading">Your content will appear here</h2>
                <p className="text-sm">Describe your content on the <span className="md:hidden">top</span><span className="hidden md:inline">left</span>, and we&apos;ll generate 5 variations in your voice</p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 rounded-2xl shadow-shadowbrand p-3">
                <BulbIcon className="size-5" />
                <p className="text-sm text-center md:text-start">Pro tip: The more context you add, the better your captions</p>
            </div>
        </div>
    )
}
