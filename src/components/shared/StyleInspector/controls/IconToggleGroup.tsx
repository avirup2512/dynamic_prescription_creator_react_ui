// components/style-panel/controls/IconToggleGroup.tsx

import * as React from "react";
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export interface IconToggleGroupOption<T extends string> {
    value: T;
    /** Either an icon (e.g. Lucide AlignLeft) or short text label (e.g. "Bold") */
    icon?: React.ReactNode;
    label?: string;
    ariaLabel: string;
}

export interface IconToggleGroupProps<T extends string> {
    value: T;
    onChange: (value: T) => void;
    options: IconToggleGroupOption<T>[];
    id?: string;
    className?: string;
    disabled?: boolean;
}

/**
 * Single-select segmented toggle group. Used for:
 *  - Weight (Light / Regular / Medium / Semibold / Bold) — text labels
 *  - Text align (left / center / right / justify) — Lucide icons
 * Built on shadcn's ToggleGroup (type="single") so only one value
 * can be active at a time, matching the design's mutually exclusive rows.
 */
export function IconToggleGroup<T extends string>({
    value,
    onChange,
    options,
    id,
    className,
    disabled,
}: IconToggleGroupProps<T>): React.ReactElement {
    return (
        <ToggleGroup
            id={id}
            type="single"
            value={value}
            onValueChange={(next) => {
                // shadcn emits "" when re-clicking the active item — ignore to
                // keep the group always having exactly one selection.
                if (next) onChange(next as T);
            }}
            disabled={disabled}
            className={cn(
                "flex w-full gap-1 rounded-md border border-input bg-background p-1",
                className
            )}
        >
            {options.map((option) => (
                <ToggleGroupItem
                    key={option.value}
                    value={option.value}
                    aria-label={option.ariaLabel}
                    className={cn(
                        "h-7 flex-1 rounded-sm text-xs font-normal",
                        "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
                        option.icon ? "px-0" : "px-2"
                    )}
                >
                    {option.icon ?? option.label}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
}