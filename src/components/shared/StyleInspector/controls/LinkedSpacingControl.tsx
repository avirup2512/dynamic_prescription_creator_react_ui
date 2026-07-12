// components/style-panel/controls/LinkedSpacingControl.tsx

import * as React from "react";
import { Link, Unlink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { BoxSpacing } from "../types";
import { cn } from "@/lib/utils";

export interface LinkedSpacingControlProps {
    value: BoxSpacing;
    onChange: (value: BoxSpacing) => void;
    id?: string;
    className?: string;
    disabled?: boolean;
    /** Whether "auto" is a valid value alongside numbers (Margin allows it, Padding does not) */
    allowAuto?: boolean;
}

type Side = "top" | "right" | "bottom" | "left";

/**
 * Box-shaped spacing control matching the design's Padding/Margin rows:
 * a bordered box with Top centered above, Left/Right on the sides,
 * Bottom centered below, and a link/unlink toggle in the middle.
 * When linked, editing any side propagates the same value to all four.
 */
export function LinkedSpacingControl({
    value,
    onChange,
    id,
    className,
    disabled,
    allowAuto = false,
}: LinkedSpacingControlProps): React.ReactElement {
    const setSide = (side: Side, raw: string) => {
        const parsed: number | "auto" =
            allowAuto && raw.trim().toLowerCase() === "auto" ? "auto" : Number(raw);

        if (parsed !== "auto" && Number.isNaN(parsed)) return;

        if (value.linked) {
            onChange({ ...value, top: parsed, right: parsed, bottom: parsed, left: parsed });
        } else {
            onChange({ ...value, [side]: parsed });
        }
    };

    const toggleLinked = () => {
        if (!value.linked) {
            // Re-linking: sync all sides to the top value
            onChange({
                ...value,
                linked: true,
                right: value.top,
                bottom: value.top,
                left: value.top,
            });
        } else {
            onChange({ ...value, linked: false });
        }
    };

    const renderField = (side: Side) => (
        <Input
            id={side === "top" ? id : undefined}
            value={String(value[side])}
            disabled={disabled}
            onChange={(e) => setSide(side, e.target.value)}
            aria-label={`${side} spacing`}
            className="h-9 w-16 text-center text-sm"
        />
    );

    return (
        <div
            className={cn(
                "relative flex flex-col items-center gap-2 rounded-md border border-input p-3",
                className
            )}
        >
            {renderField("top")}
            <div className="flex w-full items-center justify-between">
                {renderField("left")}
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={disabled}
                    onClick={toggleLinked}
                    aria-label={value.linked ? "Unlink sides" : "Link sides"}
                    aria-pressed={value.linked}
                    className={cn(
                        "h-8 w-8 shrink-0 rounded-md",
                        value.linked && "text-primary"
                    )}
                >
                    {value.linked ? <Link className="h-4 w-4" /> : <Unlink className="h-4 w-4" />}
                </Button>
                {renderField("right")}
            </div>
            {renderField("bottom")}
        </div>
    );
}