// components/style-panel/controls/NumberInput.tsx

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface NumberInputProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    id?: string;
    className?: string;
    disabled?: boolean;
    "aria-label"?: string;
}

/**
 * Bare numeric input, no unit suffix. Used standalone (e.g. Global
 * radius numeric field) or composed inside NumberWithUnit.
 * Clamps to min/max on blur; allows free typing while focused.
 */
export function NumberInput({
    value,
    onChange,
    min,
    max,
    step = 1,
    id,
    className,
    disabled,
    ...rest
}: NumberInputProps): React.ReactElement {
    const [draft, setDraft] = React.useState<string>(String(value));

    React.useEffect(() => {
        setDraft(String(value));
    }, [value]);

    const commit = (raw: string) => {
        const parsed = Number(raw);
        if (Number.isNaN(parsed)) {
            setDraft(String(value));
            return;
        }
        let next = parsed;
        if (typeof min === "number") next = Math.max(min, next);
        if (typeof max === "number") next = Math.min(max, next);
        setDraft(String(next));
        onChange(next);
    };

    return (
        <Input
            id={id}
            type="text"
            inputMode="decimal"
            value={draft}
            disabled={disabled}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={(e) => commit(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    commit((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).blur();
                }
                if (e.key === "ArrowUp") {
                    e.preventDefault();
                    onChange(value + step);
                }
                if (e.key === "ArrowDown") {
                    e.preventDefault();
                    onChange(value - step);
                }
            }}
            className={cn("h-9 text-sm", className)}
            {...rest}
        />
    );
}