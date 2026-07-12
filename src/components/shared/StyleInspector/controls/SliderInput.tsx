// src/components/StyleInspector/controls/SliderInput.tsx

import * as React from "react";

import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SliderInputProps {
    label?: string;

    value: number;

    onChange: (value: number) => void;

    min?: number;

    max?: number;

    step?: number;

    unit?: string;

    className?: string;
}

export default function SliderInput({
    label,
    value,
    onChange,

    min = 0,

    max = 100,

    step = 1,

    unit = "px",

    className,
}: SliderInputProps) {
    const handleInput = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        let next = Number(e.target.value);

        if (Number.isNaN(next)) {
            next = min;
        }

        next = Math.max(min, Math.min(max, next));

        onChange(next);
    };

    return (
        <div className={cn("space-y-3", className)}>
            {label && (
                <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-muted-foreground">
                        {label}
                    </label>

                    <span className="text-xs text-muted-foreground">
                        {value}
                        {unit}
                    </span>
                </div>
            )}

            <div className="flex items-center gap-3">
                <Slider
                    value={[value]}
                    min={min}
                    max={max}
                    step={step}
                    onValueChange={(values) => onChange(values[0])}
                    className="flex-1"
                />

                <div className="relative w-20">
                    <Input
                        type="number"
                        value={value}
                        onChange={handleInput}
                        className="pr-8 text-center"
                    />

                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        {unit}
                    </span>
                </div>
            </div>
        </div>
    );
}