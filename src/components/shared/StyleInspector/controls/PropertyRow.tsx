// components/style-panel/controls/PropertyRow.tsx

import * as React from "react";
import { PropertyLabel } from "./PropertyLabel";
import type { PropertyRowProps } from "../types";
import { cn } from "@/lib/utils";

export interface PropertyRowFullProps extends PropertyRowProps {
    /** Stack label above control (default) vs place side-by-side */
    layout?: "stacked" | "inline";
    className?: string;
}

/**
 * Generic row primitive: label (+ optional description) paired with
 * a control. Used for every single property across all sections
 * (Font family, Size, Line height, Text color, Padding, Border width...).
 *
 * "stacked" matches the design (label on its own line, control below) —
 * this is the default for nearly every row in the uploaded UI.
 * "inline" is available for cases like a two-column grid where the
 * parent section handles the grid and each row just supplies label+control.
 */
export function PropertyRow({
    label,
    description,
    children,
    htmlFor,
    layout = "stacked",
    className,
}: PropertyRowFullProps): React.ReactElement {
    if (layout === "inline") {
        return (
            <div className={cn("flex items-center justify-between gap-3", className)}>
                <div className="flex flex-col gap-0.5">
                    <PropertyLabel htmlFor={htmlFor}>{label}</PropertyLabel>
                    {description ? (
                        <span className="text-xs text-muted-foreground/70">{description}</span>
                    ) : null}
                </div>
                {children}
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            <PropertyLabel htmlFor={htmlFor}>{label}</PropertyLabel>
            {description ? (
                <span className="text-xs text-muted-foreground/70">{description}</span>
            ) : null}
            {children}
        </div>
    );
}