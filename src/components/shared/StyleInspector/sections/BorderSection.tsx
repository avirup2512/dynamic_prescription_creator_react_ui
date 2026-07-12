// components/style-panel/sections/BorderSection.tsx

import * as React from "react";
import { RectangleHorizontal } from "lucide-react";
import { AccordionSection } from "../controls/AccordionSection";
import { PropertyRow } from "../controls/PropertyRow";
import { PropertyGroup } from "../controls/PropertyGroup";
import { NumberWithUnit } from "../controls/NumberWithUnit";
import { SelectInput } from "../controls/SelectInput";
import { ColorInput } from "../controls/ColorInput";
import type { BorderState } from "../types";
import { BORDER_STYLE_OPTIONS } from "../constants";

export interface BorderSectionProps {
    value: BorderState;
    onChange: (value: BorderState) => void;
    defaultOpen?: boolean;
}

/**
 * BORDER section — Border width, Border style, Border color.
 * Border color reuses ColorInput but this section doesn't track a
 * separate border opacity in the design, so opacity is fixed at 100
 * and not surfaced as an editable field here.
 */
export function BorderSection({
    value,
    onChange,
    defaultOpen,
}: BorderSectionProps): React.ReactElement {
    const patch = (partial: Partial<BorderState>) =>
        onChange({ ...value, ...partial });

    return (
        <AccordionSection
            id="border"
            icon={<RectangleHorizontal />}
            title="Border"
            defaultOpen={defaultOpen}
        >
            <PropertyGroup columns={2}>
                <PropertyRow label="Width" htmlFor="border-width">
                    <NumberWithUnit
                        id="border-width"
                        value={value.width}
                        onChange={(width) => patch({ width })}
                        unit="px"
                        min={0}
                    />
                </PropertyRow>

                <PropertyRow label="Style" htmlFor="border-style">
                    <SelectInput
                        id="border-style"
                        value={value.style}
                        onChange={(style) => patch({ style: style as BorderState["style"] })}
                        options={BORDER_STYLE_OPTIONS}
                    />
                </PropertyRow>
            </PropertyGroup>

            <PropertyRow label="Color" htmlFor="border-color">
                <ColorInput
                    id="border-color"
                    color={value.color}
                    opacity={100}
                    onColorChange={(color) => patch({ color })}
                    onOpacityChange={() => {
                        /* border opacity not modeled in this design; no-op */
                    }}
                />
            </PropertyRow>
        </AccordionSection>
    );
}