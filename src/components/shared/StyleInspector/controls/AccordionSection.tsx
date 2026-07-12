// components/style-panel/controls/AccordionSection.tsx

import * as React from "react";
import {
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import type { AccordionSectionProps } from "../types";
import { cn } from "@/lib/utils";

/**
 * Reusable wrapper around shadcn's Accordion primitives.
 * Every section in the Style Panel (Typography, Colors, Alignment,
 * Spacing, Border, Radius, Effects, Visibility) renders through this
 * so header styling (icon + uppercase label + chevron) stays consistent.
 *
 * Note: must be rendered inside a shadcn <Accordion type="multiple"> root.
 */
export function AccordionSection({
    id,
    icon,
    title,
    children,
}: AccordionSectionProps): React.ReactElement {
    return (
        <AccordionItem
            value={id}
            className="border-b border-border last:border-b-0"
        >
            <AccordionTrigger
                className={cn(
                    "px-5 py-3.5 hover:no-underline",
                    "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                    "[&[data-state=open]]:text-foreground"
                )}
            >
                <span className="flex items-center gap-2.5">
                    <span className="flex h-4 w-4 items-center justify-center text-current [&>svg]:h-4 [&>svg]:w-4">
                        {icon}
                    </span>
                    {title}
                </span>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5 pt-1">
                <div className="flex flex-col gap-4">{children}</div>
            </AccordionContent>
        </AccordionItem>
    );
}