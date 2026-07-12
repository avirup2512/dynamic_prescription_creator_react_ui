// components/style-panel/controls/ColorInput.tsx

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PercentageInput } from "./PercentageInput";
import { cn } from "@/lib/utils";

export interface ColorInputProps {
    color: string; // hex, e.g. "#0F172A"
    opacity: number; // 0-100
    onColorChange: (color: string) => void;
    onOpacityChange: (opacity: number) => void;
    id?: string;
    className?: string;
    disabled?: boolean;
}

const HEX_PATTERN = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

/**
 * Color control combining: swatch preview (opens popover picker),
 * HEX text field, and opacity percentage field. Reused for
 * Text color, Fill color, and Background color rows.
 */
export function ColorInput({
    color,
    opacity,
    onColorChange,
    onOpacityChange,
    id,
    className,
    disabled,
}: ColorInputProps): React.ReactElement {
    const [hexDraft, setHexDraft] = React.useState(color);

    React.useEffect(() => {
        setHexDraft(color);
    }, [color]);

    const commitHex = (raw: string) => {
        const normalized = raw.startsWith("#") ? raw : `#${raw}`;
        if (HEX_PATTERN.test(normalized)) {
            onColorChange(normalized.toUpperCase());
        } else {
            setHexDraft(color);
        }
    };

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="flex h-9 flex-1 items-center gap-2 rounded-md border border-input bg-background px-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            type="button"
                            disabled={disabled}
                            aria-label="Open color picker"
                            className="h-5 w-5 shrink-0 rounded border border-black/10"
                            style={{ backgroundColor: color }}
                        />
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-3" align="start">
                        <div className="flex flex-col gap-3">
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => onColorChange(e.target.value.toUpperCase())}
                                className="h-32 w-full cursor-pointer rounded-md border border-input bg-transparent"
                                aria-label="Color picker"
                            />
                            <Input
                                value={hexDraft}
                                onChange={(e) => setHexDraft(e.target.value)}
                                onBlur={(e) => commitHex(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        commitHex((e.target as HTMLInputElement).value);
                                        (e.target as HTMLInputElement).blur();
                                    }
                                }}
                                className="h-8 text-sm"
                            />
                        </div>
                    </PopoverContent>
                </Popover>

                <Input
                    id={id}
                    value={hexDraft}
                    disabled={disabled}
                    onChange={(e) => setHexDraft(e.target.value)}
                    onBlur={(e) => commitHex(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            commitHex((e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).blur();
                        }
                    }}
                    className="h-full flex-1 border-0 px-0 shadow-none focus-visible:ring-0"
                />
            </div>

            <PercentageInput
                value={opacity}
                onChange={onOpacityChange}
                disabled={disabled}
                className="w-[76px] shrink-0"
            />
        </div>
    );
}