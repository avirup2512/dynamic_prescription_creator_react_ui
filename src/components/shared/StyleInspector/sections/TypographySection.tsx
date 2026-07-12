// components/style-panel/sections/TypographySection.tsx

import * as React from "react";
import { Type, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import { AccordionSection } from "../controls/AccordionSection";
import { PropertyRow } from "../controls/PropertyRow";
import { PropertyGroup } from "../controls/PropertyGroup";
import { SelectInput } from "../controls/SelectInput";
import { IconToggleGroup } from "../controls/IconToggleGroup";
import { NumberWithUnit } from "../controls/NumberWithUnit";
import { SliderWithInput } from "../controls/SliderWithInput";
import { ColorInput } from "../controls/ColorInput";
import type {
    TypographyState,
    FontWeightOption,
    TextAlignOption,
} from "../types";
import {
    FONT_FAMILY_OPTIONS,
    FONT_WEIGHT_OPTIONS,
    TEXT_ALIGN_OPTIONS,
    FONT_SIZE_MIN,
    FONT_SIZE_MAX,
} from "../constants";

export interface TypographySectionProps {
    value: TypographyState;
    onChange: (value: TypographyState) => void;
    defaultOpen?: boolean;
}

const TEXT_ALIGN_ICONS: Record<TextAlignOption, React.ReactNode> = {
    left: <AlignLeft className="h-4 w-4" />,
    center: <AlignCenter className="h-4 w-4" />,
    right: <AlignRight className="h-4 w-4" />,
    justify: <AlignJustify className="h-4 w-4" />,
};

/**
 * TYPOGRAPHY section — Font family, Weight, Size, Line height,
 * Letter spacing, Text align, Text color (+ opacity).
 * Pure composition: no styling/business logic beyond wiring
 * child field changes back into the aggregate TypographyState.
 */
export function TypographySection({
    value,
    onChange,
    defaultOpen,
}: TypographySectionProps): React.ReactElement {
    const patch = (partial: Partial<TypographyState>) =>
        onChange({ ...value, ...partial });

    return (
        <AccordionSection
            id="typography"
            icon={<Type />}
            title="Typography"
            defaultOpen={defaultOpen}
        >
            <PropertyRow label="Font family" htmlFor="font-family">
                <SelectInput
                    id="font-family"
                    value={value.fontFamily}
                    onChange={(fontFamily) => patch({ fontFamily })}
                    options={FONT_FAMILY_OPTIONS}
                />
            </PropertyRow>

            <PropertyRow label="Weight">
                <IconToggleGroup<FontWeightOption>
                    value={value.fontWeight}
                    onChange={(fontWeight) => patch({ fontWeight })}
                    options={FONT_WEIGHT_OPTIONS.map((opt) => ({
                        value: opt.value,
                        label: opt.label,
                        ariaLabel: opt.label,
                    }))}
                />
            </PropertyRow>

            <PropertyGroup columns={2}>
                <PropertyRow label="Size" htmlFor="font-size">
                    <NumberWithUnit
                        id="font-size"
                        value={value.fontSize}
                        onChange={(fontSize) => patch({ fontSize })}
                        unit="px"
                        min={FONT_SIZE_MIN}
                        max={FONT_SIZE_MAX}
                    />
                </PropertyRow>
                <PropertyRow label="Line height" htmlFor="line-height">
                    <NumberWithUnit
                        id="line-height"
                        value={value.lineHeight}
                        onChange={(lineHeight) => patch({ lineHeight })}
                        unit="px"
                        min={0}
                    />
                </PropertyRow>
            </PropertyGroup>

            {/* Slider for Size sits below the Size/Line height pair, matching design */}
            <SliderWithInput
                value={value.fontSize}
                onChange={(fontSize) => patch({ fontSize })}
                min={FONT_SIZE_MIN}
                max={FONT_SIZE_MAX}
                unit="px"
                className="-mt-2"
            />

            <PropertyGroup columns={2}>
                <PropertyRow label="Letter spacing" htmlFor="letter-spacing">
                    <NumberWithUnit
                        id="letter-spacing"
                        value={value.letterSpacing}
                        onChange={(letterSpacing) => patch({ letterSpacing })}
                        unit="em"
                        step={0.01}
                    />
                </PropertyRow>
                <PropertyRow label="Text align">
                    <IconToggleGroup<TextAlignOption>
                        value={value.textAlign}
                        onChange={(textAlign) => patch({ textAlign })}
                        options={TEXT_ALIGN_OPTIONS.map((opt) => ({
                            value: opt.value,
                            icon: TEXT_ALIGN_ICONS[opt.value],
                            ariaLabel: opt.ariaLabel,
                        }))}
                    />
                </PropertyRow>
            </PropertyGroup>

            <PropertyRow label="Text color" htmlFor="text-color">
                <ColorInput
                    id="text-color"
                    color={value.textColor}
                    opacity={value.textOpacity}
                    onColorChange={(textColor) => patch({ textColor })}
                    onOpacityChange={(textOpacity) => patch({ textOpacity })}
                />
            </PropertyRow>
        </AccordionSection>
    );
}