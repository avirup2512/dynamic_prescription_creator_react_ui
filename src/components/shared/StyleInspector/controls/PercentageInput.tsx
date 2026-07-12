// components/style-panel/controls/PercentageInput.tsx

import * as React from "react";
import { NumberWithUnit } from "./NumberWithUnit";

export interface PercentageInputProps {
    value: number; // 0-100
    onChange: (value: number) => void;
    id?: string;
    className?: string;
    disabled?: boolean;
}

/**
 * Convenience wrapper over NumberWithUnit fixed to 0-100 / "%" unit.
 * Used for Text opacity, Fill opacity, Background opacity.
 */
export function PercentageInput({
    value,
    onChange,
    id,
    className,
    disabled,
}: PercentageInputProps): React.ReactElement {
    return (
        <NumberWithUnit
            id={id}
            value={value}
            onChange={onChange}
            unit="%"
            min={0}
            max={100}
            step={1}
            className={className}
            disabled={disabled}
        />
    );
}