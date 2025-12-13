export function getCommandKey(): string {
    if (typeof navigator === "undefined") return "Ctrl"; // SSR fallback

    // Use modern API if available
    const platform = (navigator as any).userAgentData?.platform?.toLowerCase()
        || navigator.userAgent.toLowerCase();

    if (platform.includes("mac")) return "⌘";
    return "Ctrl";
}
