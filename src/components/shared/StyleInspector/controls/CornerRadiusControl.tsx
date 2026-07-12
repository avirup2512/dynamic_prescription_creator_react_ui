// components/style-panel/controls/CornerRadiusControl.tsx

import * as React from "react";
import { Link, Unlink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NumberWithUnit } from "./NumberWithUnit";
import { PropertyLabel } from "./PropertyLabel";
import type { CornerRadius } from "../types";
import { cn } from "@/lib/utils";

export interface CornerRadiusControlProps {
    value: CornerRadius;
    onChange: (value: CornerRadius) => void;
    min?: number;
    max?: number;
    id?: string;
    className?: string;
    disabled?: boolean;
}

type Corner = "topLeft" | "topRight" | "bottomRight" | "bottomLeft";

const CORNER_LABELS: Record<Corner, string> = {
    topLeft: "Top left",
    topRight: "Top right",
    bottomRight: "Bottom right",
    bottomLeft: "Bottom left",
};

// Matches the design's visual order: Top left, Top right, Bottom right, Bottom left
const CORNER_ORDER: Corner[] = ["topLeft", "topRight", "bottomRight", "bottomLeft"];

/**
 * 4-up corner radius control: one NumberWithUnit field per corner
 * (Top left / Top right / Bottom right / Bottom left) laid out in a
 * row, with a link/unlink toggle at the end. When linked, editing
 * any corner propagates to all four — mirrors the design's single
 * link icon placed after Bottom left.
 */
export function CornerRadiusControl({
    value,
    onChange,
    min = 0,
    max = 9999,
    id,
    className,
    disabled,
}: CornerRadiusControlProps): React.ReactElement {
    const setCorner = (corner: Corner, next: number) => {
        if (value.linked) {
            onChange({
                ...value,
                topLeft: next,
                topRight: next,
                bottomRight: next,
                bottomLeft: next,
            });
        } else {
            onChange({ ...value, [corner]: next });
        }
    };

    const toggleLinked = () => {
        if (!value.linked) {
            onChange({
                ...value,
                linked: true,
                topRight: value.topLeft,
                bottomRight: value.topLeft,
                bottomLeft: value.topLeft,
            });
        } else {
            onChange({ ...value, linked: false });
        }
    };

    return (
        <div className={cn("flex flex-col gap-3", className)}>
            <div className="grid grid-cols-4 gap-2">
                {CORNER_ORDER.map((corner, index) => (
                    <div key={corner} className="flex flex-col gap-1.5">
                        <PropertyLabel
                            htmlFor={index === 0 ? id : undefined}
                            className="text-xs"
                        >
                            {CORNER_LABELS[corner]}
                        </PropertyLabel>
                        <NumberWithUnit
                            id={index === 0 ? id : undefined}
                            value={value[corner]}
                            onChange={(next) => setCorner(corner, next)}
                            unit="px"
                            min={min}
                            max={max}
                            disabled={disabled}
                        />
                    </div>
                ))}
            </div>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={disabled}
                onClick={toggleLinked}
                aria-label={value.linked ? "Unlink corners" : "Link corners"}
                aria-pressed={value.linked}
                className={cn(
                    "h-8 w-8 self-end rounded-md",
                    value.linked && "text-primary"
                )}
            >
                {value.linked ? <Link className="h-4 w-4" /> : <Unlink className="h-4 w-4" />}
            </Button>
        </div>
    );
}