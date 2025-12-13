"use client";

import { Kbd } from "@/components/ui/kbd";
import { getCommandKey } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Shortcut() {
    const [cmdKey, setCmdKey] = useState("Ctrl"); // SSR fallback

    useEffect(() => {
        setCmdKey(getCommandKey());
    }, []);

    return (
        <span className="flex items-center gap-1 ml-2">
            <Kbd>{cmdKey}</Kbd>
            <Kbd>Enter</Kbd>
        </span>
    );
}
