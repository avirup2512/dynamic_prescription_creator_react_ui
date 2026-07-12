// components/style-panel/sections/AlignmentSection.tsx

import * as React from "react";
import {
    Move,
    AlignHorizontalJustifyStart,
    AlignHorizontalJustifyCenter,
    AlignHorizontalJustifyEnd,
    AlignHorizontalSpaceBetween,
    AlignVerticalJustifyStart,
    AlignVerticalJustifyCenter,
    AlignVerticalJustifyEnd,
    AlignVerticalSpaceBetween,
} from "lucide-react";
import { AccordionSection } from "../controls/AccordionSection";
import { PropertyRow } from "../controls/PropertyRow";
import { IconToggleGroup } from "../controls/IconToggleGroup";
import type { AlignmentState, HorizontalAlign, VerticalAlign } from "../types";

export interface AlignmentSectionProps {
    value: AlignmentState;
    onChange: (value: AlignmentState) => void;
    defaultOpen?: boolean;
}

const HORIZONTAL_OPTIONS: { value: HorizontalAlign; icon: React.ReactNode; ariaLabel: string }[] = [
    { value: "left", icon: <AlignHorizontalJustifyStart className="h-4 w-4" />, ariaLabel: "Align left" },
    { value: "center", icon: <AlignHorizontalJustifyCenter className="h-4 w-4" />, ariaLabel: "Align center" },
    { value: "right", icon: <AlignHorizontalJustifyEnd className="h-4 w-4" />, ariaLabel: "Align right" },
    { value: "stretch", icon: <AlignHorizontalSpaceBetween className="h-4 w-4" />, ariaLabel: "Stretch horizontally" },
];

const VERTICAL_OPTIONS: { value: VerticalAlign; icon: React.ReactNode; ariaLabel: string }[] = [
    { value: "top", icon: <AlignVerticalJustifyStart className="h-4 w-4" />, ariaLabel: "Align top" },
    { value: "middle", icon: <AlignVerticalJustifyCenter className="h-4 w-4" />, ariaLabel: "Align middle" },
    { value: "bottom", icon: <AlignVerticalJustifyEnd className="h-4 w-4" />, ariaLabel: "Align bottom" },
    { value: "stretch", icon: <AlignVerticalSpaceBetween className="h-4 w-4" />, ariaLabel: "Stretch vertically" },
];

/**
 * ALIGNMENT section — horizontal and vertical alignment toggle
 * groups. Collapsed by default in the uploaded design (no visible
 * fields), so contents here are built from the same IconToggleGroup
 * pattern used by Text align in Typography, applied to layout axes.
 */
export function AlignmentSection({
    value,
    onChange,
    defaultOpen,
}: AlignmentSectionProps): React.ReactElement {
    const patch = (partial: Partial<AlignmentState>) =>
        onChange({ ...value, ...partial });

    return (
        <AccordionSection
            id="alignment"
            icon={<Move />}
            title="Alignment"
            defaultOpen={defaultOpen}
        >
            <PropertyRow label="Horizontal">
                <IconToggleGroup<HorizontalAlign>
                    value={value.horizontal}
                    onChange={(horizontal) => patch({ horizontal })}
                    options={HORIZONTAL_OPTIONS}
                />
            </PropertyRow>

            <PropertyRow label="Vertical">
                <IconToggleGroup<VerticalAlign>
                    value={value.vertical}
                    onChange={(vertical) => patch({ vertical })}
                    options={VERTICAL_OPTIONS}
                />
            </PropertyRow>
        </AccordionSection>
    );
}