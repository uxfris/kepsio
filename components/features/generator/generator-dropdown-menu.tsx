"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GENERATE_DROPDOWN_MENU_ITEMS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { AddIcon, CheckIcon } from "@/components/icons"
import { useDropdownMenuState } from "@/hooks"

/**
 * Dropdown menu for adding optional content sections.
 * Allows users to add product links or upload images to their content input.
 * 
 * @example
 * ```tsx
 * <GeneratorDropdownMenu />
 * ```
 */
export function GeneratorDropdownMenu() {
    const menuStateMap = useDropdownMenuState(GENERATE_DROPDOWN_MENU_ITEMS);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full [&[data-state=open]>svg]:rotate-45">
                    <AddIcon className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-2xl shadow-lg p-2" align="start">
                {GENERATE_DROPDOWN_MENU_ITEMS.map(({ id, icon: IconComponent, title }) => {
                    const state = menuStateMap[id]
                    return (
                        <DropdownMenuItem
                            onClick={() => state.toggle()}
                            key={id}
                            className={cn("rounded-lg mb-1", state.isOpen && "bg-sidebar-primary")}
                        >
                            <div className="flex items-center w-full">
                                <div className="flex-1 flex items-center gap-2">
                                    <IconComponent className="size-5" />
                                    {title}
                                </div>
                                {state.isOpen && <CheckIcon className="size-6" />}
                            </div>
                        </DropdownMenuItem>
                    )
                })}</DropdownMenuContent>
        </DropdownMenu>
    )
}
