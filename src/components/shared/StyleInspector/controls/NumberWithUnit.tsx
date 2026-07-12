// components/style-panel/controls/NumberWithUnit.tsx

import * as React from "react";
import { NumberInput } from "./NumberInput";
import { cn } from "@/lib/utils";

export interface NumberWithUnitProps {
    value: number;
    onChange: (value: number) => void;
    unit: string; // "px" | "em" | "%" | ...
    min?: number;
    max?: number;
    step?: number;
    id?: string;
    className?: string;
    disabled?: boolean;
}

/**
 * Numeric field with a fixed unit suffix rendered inside the same
 * bordered container (e.g. "64  px", "-0.02  em"). Matches Size,
 * Line height, and Letter spacing fields in the Typography section.
 */
export function NumberWithUnit({
    value,
    onChange,
    unit,
    min,
    max,
    step,
    id,
    className,
    disabled,
}: NumberWithUnitProps): React.ReactElement {
    return (
        <div
            className={cn(
                "flex h-9 items-center rounded-md border border-input bg-background pr-3",
                "focus-within:ring-1 focus-within:ring-ring",
                className
            )}
        >
            <NumberInput
                id={id}
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                className="h-full border-0 shadow-none focus-visible:ring-0"
            />
            <span className="shrink-0 select-none text-xs text-muted-foreground">
                {unit}
            </span>
        </div>
    );
}