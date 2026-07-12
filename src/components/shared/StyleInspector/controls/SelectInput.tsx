// components/style-panel/controls/SelectInput.tsx

import * as React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { SelectOption } from "../types";
import { cn } from "@/lib/utils";

export interface SelectInputProps {
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    id?: string;
    className?: string;
    disabled?: boolean;
    /** Optional icon rendered inside the trigger, before the value (e.g. Effects preset "None" dashed-square icon) */
    icon?: React.ReactNode;
}

/**
 * Generic dropdown wrapper around shadcn's Select. Reused for:
 *  - Font family (Typography)
 *  - Border style (Border)
 *  - Effect preset (Effects)
 */
export function SelectInput({
    value,
    onChange,
    options,
    placeholder = "Select...",
    id,
    className,
    disabled,
    icon,
}: SelectInputProps): React.ReactElement {
    return (
        <Select value={value} onValueChange={onChange} disabled={disabled}>
            <SelectTrigger id={id} className={cn("h-9 text-sm", className)}>
                <span className="flex items-center gap-2">
                    {icon}
                    <SelectValue placeholder={placeholder} />
                </span>
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}