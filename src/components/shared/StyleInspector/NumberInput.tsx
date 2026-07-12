import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NumberInputProps {
    label?: string;
    value: number | null;
    onChange: (value: number | null) => void;
    min?: number;
    max?: number;
    step?: number;
    allowNull?: boolean;
    unit?: string;
}

export default function NumberInput({
    label,
    value,
    onChange,
    min,
    max,
    step = 1,
    allowNull = false,
    unit,
}: NumberInputProps) {
    const increase = () => {
        const next = (value ?? 0) + step;
        if (max !== undefined && next > max) return;
        onChange(next);
    };

    const decrease = () => {
        const next = (value ?? 0) - step;
        if (min !== undefined && next < min) return;
        onChange(next);
    };

    return (
        <div className="space-y-2">

            {label && (
                <label className="text-xs font-medium">
                    {label}
                </label>
            )}

            <div className="flex items-center gap-2">

                <Button
                    variant="outline"
                    size="icon"
                    onClick={decrease}
                >
                    <Minus className="h-4 w-4" />
                </Button>

                <Input
                    type="number"
                    value={value ?? ""}
                    onChange={(e) => {
                        if (allowNull && e.target.value === "") {
                            onChange(null);
                            return;
                        }

                        onChange(Number(e.target.value));
                    }}
                    className="text-center"
                />

                <Button
                    variant="outline"
                    size="icon"
                    onClick={increase}
                >
                    <Plus className="h-4 w-4" />
                </Button>

                {unit && (
                    <span className="text-xs text-muted-foreground">
                        {unit}
                    </span>
                )}

            </div>
        </div>
    );
}