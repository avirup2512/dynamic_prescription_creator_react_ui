// components/style-panel/controls/PropertyGroup.tsx

import * as React from "react";
import { cn } from "@/lib/utils";

export interface PropertyGroupProps {
    children: React.ReactNode;
    /** Number of columns for side-by-side rows, e.g. Size + Line height */
    columns?: 1 | 2;
    className?: string;
}

/**
 * Lays out a set of PropertyRows in a grid. Used to reproduce pairs
 * like "Size / Line height" and "Letter spacing / Text align" that
 * sit side-by-side in the Typography section.
 */
export function PropertyGroup({
    children,
    columns = 1,
    className,
}: PropertyGroupProps): React.ReactElement {
    return (
        <div
            className={cn(
                "grid gap-4",
                columns === 2 ? "grid-cols-2" : "grid-cols-1",
                className
            )}
        >
            {children}
        </div>
    );
}