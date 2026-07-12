// components/style-panel/controls/SliderWithInput.tsx

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { NumberWithUnit } from "./NumberWithUnit";
import { cn } from "@/lib/utils";

export interface SliderWithInputProps {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
    unit?: string; // e.g. "px" — omit for no unit suffix
    id?: string;
    className?: string;
    disabled?: boolean;
    /** Optional min/max labels rendered below the slider, e.g. "0" / "32px" (Radius) */
    showRangeLabels?: boolean;
}

/**
 * Slider synchronized with a numeric input. Two layouts in the design
 * use this:
 *  - Font size: numeric field above, slider below, full width
 *  - Global radius: inline "0 ─●──── 32px" with numeric field to the right
 * Both are supported via `showRangeLabels` + external layout composition
 * in the parent section (this component itself just renders slider + input
 * side by side when showRangeLabels is true, or stacked when false).
 */
export function SliderWithInput({
    value,
    onChange,
    min,
    max,
    step = 1,
    unit = "px",
    id,
    className,
    disabled,
    showRangeLabels = false,
}: SliderWithInputProps): React.ReactElement {
    if (showRangeLabels) {
        return (
            <div className={cn("flex items-center gap-3", className)}>
                <span className="shrink-0 text-xs text-muted-foreground">{min}</span>
                <Slider
                    id={id}
                    value={[value]}
                    onValueChange={([next]) => onChange(next)}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    className="flex-1"
                />
                <span className="shrink-0 text-xs text-muted-foreground">
                    {max}
                    {unit}
                </span>
                <NumberWithUnit
                    value={value}
                    onChange={onChange}
                    unit={unit}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    className="w-[92px] shrink-0"
                />
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <Slider
                id={id}
                value={[value]}
                onValueChange={([next]) => onChange(next)}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
            />
        </div>
    );
}