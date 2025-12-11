"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import Image from 'next/image'
import Link from "next/link"
import { usePathname } from "next/navigation"

/**
 * Main navigation bar component.
 * Displays the app logo, navigation links with active state highlighting, plan information, and user avatar.
 */
export function Navbar() {
    const pathName = usePathname();

    const isActive = (path: string) => pathName === path


    return <nav className="bg-background px-8 py-2 sticky top-0 z-50 border-b">
        <div className="flex items-center justify-between">
            <Image src="/kepsio.svg" width={94} height={28} alt={'kepsio'} />
            <div className="hidden sm:ml-7 sm:block sm:grow">
                <div className="flex space-x-8 text-sm">
                    <Link href={"/generate"} className={cn(isActive("/generate") && "text-accent")}>Generate</Link>
                    <Link href={"/library"} className={cn(isActive("/library") && "text-accent")}>Library</Link>
                    <Link href={"/voice"} className={cn(isActive("/voice") && "text-accent")}>Voice</Link>
                </div>
            </div>
            <div className="flex items-center justify-center gap-2 px-3 pt-2 pb-[10px] rounded-xl bg-secondary mr-3">
                <p className="text-xs">Free Plan</p>
                <div className="w-1 h-1 bg-[#D9D9D9] rounded-full" />
                <p className="text-xs underline underline-offset-3 cursor-pointer">Upgrade</p>
            </div>
            <Avatar className="border-2 border-white">
                <AvatarImage src="/images/fris.jpg" className="size-9 object-cover" />
                <AvatarFallback className="bg-muted text-muted-foreground-2 text-xs">CN</AvatarFallback>
            </Avatar>
        </div>
    </nav>
}