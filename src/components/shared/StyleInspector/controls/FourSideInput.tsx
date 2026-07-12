// src/components/StyleInspector/controls/FourSideInput.tsx

import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

import NumberInput from "./NumberInput";

interface FourSideInputProps {
    label?: string;

    top: number;
    right: number;
    bottom: number;
    left: number;

    onTopChange: (value: number) => void;
    onRightChange: (value: number) => void;
    onBottomChange: (value: number) => void;
    onLeftChange: (value: number) => void;
}

export default function FourSideInput({
    label = "Spacing",

    top,
    right,
    bottom,
    left,

    onTopChange,
    onRightChange,
    onBottomChange,
    onLeftChange,
}: FourSideInputProps) {
    return (
        <div className="space-y-4">

            <label className="text-xs font-medium text-muted-foreground">
                {label}
            </label>

            <div className="rounded-xl border bg-muted/20 p-4">

                <div className="grid grid-cols-3 gap-3">

                    {/* Top */}

                    <div />

                    <div className="flex flex-col items-center gap-2">

                        <ArrowUp className="h-4 w-4 text-muted-foreground" />

                        <NumberInput
                            value={top}
                            unit=""
                            onChange={(v) => onTopChange(v ?? 0)}
                        />

                    </div>

                    <div />

                    {/* Left */}

                    <div className="flex flex-col items-center gap-2">

                        <ArrowLeft className="h-4 w-4 text-muted-foreground" />

                        <NumberInput
                            value={left}
                            unit=""
                            onChange={(v) => onLeftChange(v ?? 0)}
                        />

                    </div>

                    {/* Center */}

                    <div className="flex items-center justify-center rounded-lg border border-dashed bg-background text-xs font-medium text-muted-foreground">

                        {label}

                    </div>

                    {/* Right */}

                    <div className="flex flex-col items-center gap-2">

                        <ArrowRight className="h-4 w-4 text-muted-foreground" />

                        <NumberInput
                            value={right}
                            unit=""
                            onChange={(v) => onRightChange(v ?? 0)}
                        />

                    </div>

                    {/* Bottom */}

                    <div />

                    <div className="flex flex-col items-center gap-2">

                        <ArrowDown className="h-4 w-4 text-muted-foreground" />

                        <NumberInput
                            value={bottom}
                            unit=""
                            onChange={(v) => onBottomChange(v ?? 0)}
                        />

                    </div>

                    <div />

                </div>

            </div>

        </div>
    );
}