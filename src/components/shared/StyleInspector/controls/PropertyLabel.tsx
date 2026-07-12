// components/style-panel/controls/PropertyLabel.tsx

import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface PropertyLabelProps {
    htmlFor?: string;
    children: React.ReactNode;
    className?: string;
}

/**
 * Small uppercase-free label used to the left/above a control
 * (e.g. "Font family", "Size", "Text color"). Thin wrapper around
 * shadcn's Label so typography stays consistent across all rows.
 */
export function PropertyLabel({
    htmlFor,
    children,
    className,
}: PropertyLabelProps): React.ReactElement {
    return (
        <Label
            htmlFor={htmlFor}
            className={cn("text-sm font-normal text-muted-foreground", className)}
        >
            {children}
        </Label>
    );
}