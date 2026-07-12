// src/components/StyleInspector/controls/SegmentedControl.tsx

import { cn } from "@/lib/utils";

export interface SegmentedOption<T = string | number> {
    label: string;
    value: T;
    icon?: React.ReactNode;
}

interface SegmentedControlProps<T = string | number> {
    value: T;

    options: SegmentedOption<T>[];

    onChange: (value: T) => void;

    className?: string;

    disabled?: boolean;

    fullWidth?: boolean;
}

export default function SegmentedControl<T extends string | number>({
    value,
    options,
    onChange,
    className,
    disabled = false,
    fullWidth = true,
}: SegmentedControlProps<T>) {
    return (
        <div
            className={cn(
                "inline-flex rounded-lg border bg-muted p-1",
                fullWidth && "w-full",
                className
            )}
        >
            {options.map((option) => {
                const active = option.value === value;

                return (
                    <button
                        key={String(option.value)}
                        type="button"
                        disabled={disabled}
                        onClick={() => onChange(option.value)}
                        className={cn(
                            "flex h-9 flex-1 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium transition-all",

                            active
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-background/60",

                            disabled &&
                            "cursor-not-allowed opacity-50"
                        )}
                    >
                        {option.icon}

                        <span>{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
}