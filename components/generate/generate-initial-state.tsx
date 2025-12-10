import Image from "next/image";

export function InitialState() {
    return (
        <div className="flex flex-col items-center justify-center gap-12 pb-32">
            <Image src={"/icons/logo-outline.svg"} alt={"Logo"} width={120} height={98} />
            <div className="space-y-5 text-center">
                <h2 className="text-3xl font-heading">Your content will appear here</h2>
                <p className="text-sm">Describe your content on the left, and we'll generate 5 variations in your voice</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl shadow-shadowbrand p-3">
                <Image src={"/icons/bulb.svg"} alt={"Idea"} width={20} height={20} />
                <p className="text-sm">Pro tip: The more context you add, the better your captions</p>
            </div>
        </div>
    )
}