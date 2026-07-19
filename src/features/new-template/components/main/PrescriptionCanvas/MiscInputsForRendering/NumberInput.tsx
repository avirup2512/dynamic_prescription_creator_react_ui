import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ColumnInputItem } from "@/features/new-template/type/TemplateType";

interface NumberPickerProps {
    input: ColumnInputItem;
    onChange: (value: number) => void;
    mode: string;
    min?: number;
    max?: number;
    step?: number;
}

export function NumberInput({
    input,
    onChange,
    mode,
    min = 0,
    max = 100,
    step = 1,
}: NumberPickerProps) {
    const [value, setValue] = React.useState<number>(input?.template_input_value !== undefined && !isNaN(Number(input.template_input_value)) ? Number(input.template_input_value) : 0);
    const [debouncedValue, setDebouncedValue] = React.useState<number>(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, 1000); // Adjust the debounce delay as needed

        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    React.useEffect(() => {
        onChange(debouncedValue);
    }, [debouncedValue]);

    const increment = () =>
        setValue(Math.min(value + step, max));

    const decrement = () =>
        setValue(Math.max(value - step, min));

    return (
        <>
            {
                mode == "edit" ?
                    <>
                        <div className="min-w-0 flex-1 mb-2">
                            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                                {input.name || input.input_name || "Untitled"}
                            </div>
                        </div>
                        <div className="flex w-36 items-center rounded-md border">
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="rounded-r-none"
                                onClick={decrement}
                                disabled={value <= min}
                            >
                                <Minus className="h-4 w-4" />
                            </Button>

                            <Input
                                type="number"
                                value={value}
                                min={min}
                                max={max}
                                step={step}
                                onChange={(e) =>
                                    setValue(Number(e.target.value))
                                }
                                className="border-0 text-center shadow-none focus-visible:ring-0"
                            />

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="rounded-l-none"
                                onClick={increment}
                                disabled={value >= max}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </> : <div className="flex items-center gap-2 w-36 justify-start">{value}</div>
            }
        </>
    );
}