"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthDialog } from "@/components/landing/auth-dialog";
import { XIcon } from "../icons/x-icon";
import { InstagramIcon, LinkedInIcon, SparkleFilledIcon } from "../icons";
import { GeneratorPlatformSelector } from "../features/generator";
import { Textarea } from "../ui/textarea";


export function Hero() {
    const [activePlatform, setActivePlatform] = useState<"instagram" | "linkedin" | "x">("instagram");

    return (
        <section className="flex flex-col items-center pt-32 pb-24 gap-12 w-full max-w-[1200px] mx-auto px-4">
            <div className="flex flex-col items-center justify-center gap-8">
                {/* Trusted By Badge */}
                <div className="flex items-center gap-3 bg-[#D8FFCC] pl-3 pr-2 py-2 rounded-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative">
                                {/* Placeholder for avatars - using colored divs or generic user icons if images not available */}
                                <div className={`w-full h-full bg-linear-to-br from-orange-100 to-orange-200`} />
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 px-3">
                        <span className="text-sm font-medium text-foreground">Trusted by</span>
                        <div className="flex items-center gap-0.5 bg-[#B1F29D] px-2 py-1 rounded-full">
                            <SparkleFilledIcon className="size-5" />
                            <span className="text-sm text-foreground">12,000+ creators</span>
                        </div>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-5xl md:text-6xl text-center leading-16 tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                    Your Content. Your Voice. <br />
                    <span className="text-primary">Zero Blank Screens.</span>
                </h1>
                <p className="text-lg md:text-xl font-lexend-deca text-foreground text-center animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                    Generate scroll-stopping captions in seconds. Try free—no card required.
                </p>
            </div>

            <div className="w-full flex flex-col items-center gap-4">
                {/* Platform Selector */}
                <GeneratorPlatformSelector
                    value={activePlatform}
                    onChange={(platform) => setActivePlatform(platform)}
                    isWithTitle={false}
                    isWithLabel={true}
                />

                {/* Interactive Input Mockup */}
                <Textarea
                    id="content"
                    // value={""}
                    // onChange={(e) => { }}
                    className="h-24 resize-none w-full max-w-2xl shadow-lg p-4 border border-gray-100 rounded-3xl text-base! text-foreground animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400"
                    placeholder="product launch announcement"
                    maxLength={500}
                />
                <div className="w-full max-w-2xl bg-white p-2 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
                    <div className="relative">
                        <div className="w-full h-24 px-6 py-5 text-lg text-gray-800 font-lexend-deca flex items-center">
                            Product launch announcement
                        </div>
                        <div className="absolute right-3 bottom-3 md:top-1/2 md:-translate-y-1/2 md:bottom-auto">
                            <AuthDialog
                                trigger={
                                    <Button className="rounded-full w-10 h-10 p-0 bg-[#ff4602] hover:bg-[#ff5f24]">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                            <path d="M5 12h14" />
                                            <path d="m12 5 7 7-7 7" />
                                        </svg>
                                    </Button>
                                }
                            />
                        </div>
                    </div>
                </div>

            </div>
            {/* Suggestion Chips */}
            <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-9 duration-700 delay-500">
                <p className="text-sm font-medium text-foreground">Not sure where to start? Try one of these:</p>
                <div className="flex flex-wrap justify-center gap-3">
                    <SuggestionChip icon={rocketLaunch} text="Product launch announcement" />
                    <SuggestionChip icon={clapperBoard} text="Behind-the-scenes moment" />
                    <SuggestionChip icon={speechBubble} text="Customer testimonial post" />
                </div>
            </div>
        </section>
    );
}

function SuggestionChip({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <button className="flex items-center gap-2 bg-white border border-transparent hover:border-gray-200 hover:shadow-shadowbrand px-5 py-3 rounded-full text-sm font-medium text-foreground transition-all">
            <span>{icon}</span>
            {text}
        </button>
    )
}

const rocketLaunch = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.7625 6.32001C8.98824 4.74007 10.5594 3.46172 12.3556 2.58291C14.1518 1.70409 16.1253 1.24815 18.125 1.25001C18.2908 1.25001 18.4497 1.31585 18.5669 1.43306C18.6842 1.55027 18.75 1.70925 18.75 1.87501C18.75 6.08834 16.7642 9.83751 13.68 12.2383C13.7261 12.5272 13.7494 12.8228 13.75 13.125C13.75 14.6168 13.1574 16.0476 12.1025 17.1025C11.0476 18.1574 9.61684 18.75 8.125 18.75C7.95924 18.75 7.80027 18.6842 7.68306 18.5669C7.56585 18.4497 7.5 18.2908 7.5 18.125V14.6825L7.4775 14.665C6.67614 14.0296 5.95153 13.3031 5.31833 12.5H1.875C1.70924 12.5 1.55027 12.4342 1.43306 12.3169C1.31585 12.1997 1.25 12.0408 1.25 11.875C1.24993 11.0612 1.42645 10.2571 1.76735 9.51816C2.10826 8.77922 2.60544 8.12305 3.22459 7.59493C3.84374 7.06681 4.57011 6.67933 5.35356 6.45922C6.13702 6.2391 6.9589 6.19161 7.7625 6.32001ZM12.5 5.62501C12.0027 5.62501 11.5258 5.82255 11.1742 6.17418C10.8225 6.52581 10.625 7.00272 10.625 7.50001C10.625 7.99729 10.8225 8.4742 11.1742 8.82583C11.5258 9.17746 12.0027 9.37501 12.5 9.37501C12.9973 9.37501 13.4742 9.17746 13.8258 8.82583C14.1775 8.4742 14.375 7.99729 14.375 7.50001C14.375 7.00272 14.1775 6.52581 13.8258 6.17418C13.4742 5.82255 12.9973 5.62501 12.5 5.62501Z" fill="#FF4602" />
        <path d="M4.38332 14.3683C4.44915 14.3192 4.50466 14.2577 4.54669 14.1871C4.58873 14.1166 4.61645 14.0385 4.62829 13.9572C4.64013 13.876 4.63585 13.7932 4.6157 13.7136C4.59554 13.634 4.55991 13.5591 4.51082 13.4933C4.46174 13.4275 4.40018 13.372 4.32964 13.33C4.25911 13.2879 4.18098 13.2602 4.09973 13.2484C4.01848 13.2365 3.93569 13.2408 3.85609 13.261C3.7765 13.2811 3.70165 13.3167 3.63582 13.3658C2.99636 13.8412 2.49913 14.4824 2.198 15.2201C1.89688 15.9578 1.80333 16.7638 1.92749 17.5508C1.94764 17.6819 2.00896 17.8032 2.10259 17.8971C2.19622 17.991 2.3173 18.0528 2.44832 18.0733C2.66944 18.1072 2.89499 18.1244 3.12499 18.125C3.80663 18.1257 4.47896 17.9668 5.08817 17.661C5.69738 17.3553 6.22655 16.9111 6.63332 16.3642C6.68399 16.2985 6.72108 16.2234 6.74244 16.1433C6.7638 16.0632 6.769 15.9796 6.75774 15.8974C6.74648 15.8153 6.71898 15.7362 6.67685 15.6648C6.63471 15.5933 6.57879 15.531 6.51233 15.4814C6.44587 15.4318 6.3702 15.3959 6.28974 15.3759C6.20928 15.3558 6.12563 15.352 6.04366 15.3646C5.9617 15.3771 5.88306 15.4059 5.81232 15.4492C5.74159 15.4925 5.68017 15.5494 5.63166 15.6167C5.34123 16.0077 4.96319 16.3252 4.52787 16.5437C4.09256 16.7623 3.61208 16.8757 3.12499 16.875C3.12499 15.85 3.61832 14.9392 4.38332 14.3683Z" fill="#FF4602" />
    </svg>
)
const clapperBoard = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g clip-path="url(#clip0_6603_2900)">
            <path d="M10.0001 15.8334C10.0001 16.1167 10.0251 16.3917 10.0667 16.6667H3.33341C2.89139 16.6667 2.46746 16.4911 2.1549 16.1786C1.84234 15.866 1.66675 15.4421 1.66675 15V5.00004C1.66675 4.55801 1.84234 4.13409 2.1549 3.82153C2.46746 3.50897 2.89139 3.33337 3.33341 3.33337H4.16675L5.83341 6.66671H8.33341L6.66675 3.33337H8.33341L10.0001 6.66671H12.5001L10.8334 3.33337H12.5001L14.1667 6.66671H16.6667L15.0001 3.33337H18.3334V10.5667C17.4447 10.1439 16.4634 9.95302 15.4809 10.0118C14.4985 10.0706 13.547 10.3772 12.715 10.903C11.8831 11.4288 11.1978 12.1567 10.7231 13.0188C10.2483 13.8809 9.99961 14.8492 10.0001 15.8334ZM19.8334 17C19.9167 17 19.9167 17.0834 19.8334 17.1667L19.0001 18.5834C18.9167 18.6667 18.8334 18.6667 18.7501 18.6667L17.7501 18.3334C17.5001 18.5 17.3334 18.5834 17.0834 18.75L16.9167 19.8334C16.9167 19.9167 16.8334 20 16.7501 20H15.0834C15.0001 20 14.9167 19.9167 14.8334 19.8334L14.6667 18.75C14.4167 18.6667 14.1667 18.5 14.0001 18.3334L13.0001 18.75C12.9167 18.75 12.8334 18.75 12.7501 18.6667L11.9167 17.25C11.8334 17.1667 11.9167 17.0834 12.0001 17L12.9167 16.3334V15.5L12.0001 14.8334C11.9167 14.75 11.9167 14.6667 11.9167 14.5834L12.7501 13.1667C12.8334 13.0834 12.9167 13.0834 13.0001 13.0834L14.0001 13.5C14.2501 13.3334 14.4167 13.25 14.6667 13.0834L14.8334 12C14.8334 11.9167 14.9167 11.8334 15.0834 11.8334H16.7501C16.8334 11.8334 16.9167 11.9167 16.9167 12L17.0834 13.0834C17.3334 13.1667 17.5834 13.3334 17.8334 13.5L18.8334 13.0834C18.9167 13.0834 19.0834 13.0834 19.0834 13.1667L19.9167 14.5834C20.0001 14.6667 19.9167 14.75 19.8334 14.8334L18.9167 15.5V16.3334L19.8334 17ZM17.0834 15.8334C17.0834 15.1667 16.5001 14.5834 15.8334 14.5834C15.1667 14.5834 14.5834 15.1667 14.5834 15.8334C14.5834 16.5 15.1667 17.0834 15.8334 17.0834C16.5001 17.0834 17.0834 16.5 17.0834 15.8334Z" fill="#FF4602" />
        </g>
        <defs>
            <clipPath id="clip0_6603_2900">
                <rect width="20" height="20" fill="white" />
            </clipPath>
        </defs>
    </svg>
)
const speechBubble = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g clip-path="url(#clip0_6603_2904)">
            <path d="M11.2501 0H3.9501C2.5376 0 1.1626 0.7 0.475099 1.925C0.058941 2.66481 -0.0911305 3.52489 0.0498911 4.36192C0.190913 5.19896 0.61451 5.96238 1.2501 6.525V10.3625C1.2501 10.925 1.9251 11.2 2.3126 10.8L5.6251 7.5H11.1001C12.9126 7.5 14.5751 6.275 14.9251 4.5C15.3876 2.1 13.5626 0 11.2501 0ZM16.2501 8.75H8.9001C7.0876 8.75 5.4126 9.975 5.0751 11.75C4.96482 12.2948 4.97686 12.8573 5.11036 13.3969C5.24386 13.9364 5.49549 14.4396 5.84708 14.8702C6.19868 15.3007 6.64146 15.6478 7.14349 15.8864C7.64551 16.125 8.19425 16.2492 8.7501 16.25H14.3751L17.6876 19.5625C17.775 19.6481 17.8855 19.7063 18.0056 19.7297C18.1257 19.7531 18.25 19.7407 18.3631 19.6941C18.4763 19.6476 18.5732 19.5688 18.642 19.4676C18.7108 19.3665 18.7484 19.2473 18.7501 19.125V15.2875C19.5376 14.5875 20.0001 13.575 20.0001 12.5125C20.0001 11.5168 19.6054 10.5617 18.9025 9.85642C18.1996 9.15117 17.2458 8.75331 16.2501 8.75Z" fill="#FF4602" />
        </g>
        <defs>
            <clipPath id="clip0_6603_2904">
                <rect width="20" height="20" fill="white" />
            </clipPath>
        </defs>
    </svg>
)