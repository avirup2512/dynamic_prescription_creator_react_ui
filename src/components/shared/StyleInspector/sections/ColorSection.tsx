// components/style-panel/sections/ColorSection.tsx

import * as React from "react";
import { Palette } from "lucide-react";
import { AccordionSection } from "../controls/AccordionSection";
import { PropertyRow } from "../controls/PropertyRow";
import { ColorInput } from "../controls/ColorInput";
import type { ColorState } from "../types";

export interface ColorSectionProps {
    value: ColorState;
    onChange: (value: ColorState) => void;
    defaultOpen?: boolean;
}

/**
 * COLORS section — Fill color and Background color, each paired
 * with its own opacity field. Pure composition over ColorInput.
 */
export function ColorSection({
    value,
    onChange,
    defaultOpen,
}: ColorSectionProps): React.ReactElement {
    const patch = (partial: Partial<ColorState>) =>
        onChange({ ...value, ...partial });

    return (
        <AccordionSection
            id="colors"
            icon={<Palette />}
            title="Colors"
            defaultOpen={defaultOpen}
        >
            <PropertyRow label="Fill color" htmlFor="fill-color">
                <ColorInput
                    id="fill-color"
                    color={value.fillColor}
                    opacity={value.fillOpacity}
                    onColorChange={(fillColor) => patch({ fillColor })}
                    onOpacityChange={(fillOpacity) => patch({ fillOpacity })}
                />
            </PropertyRow>

            <PropertyRow label="Background color" htmlFor="background-color">
                <ColorInput
                    id="background-color"
                    color={value.backgroundColor}
                    opacity={value.backgroundOpacity}
                    onColorChange={(backgroundColor) => patch({ backgroundColor })}
                    onOpacityChange={(backgroundOpacity) => patch({ backgroundOpacity })}
                />
            </PropertyRow>
        </AccordionSection>
    );
}