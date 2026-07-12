// components/style-panel/sections/SpacingSection.tsx

import * as React from "react";
import { Square } from "lucide-react";
import { AccordionSection } from "../controls/AccordionSection";
import { PropertyRow } from "../controls/PropertyRow";
import { PropertyGroup } from "../controls/PropertyGroup";
import { LinkedSpacingControl } from "../controls/LinkedSpacingControl";
import type { SpacingState } from "../types";

export interface SpacingSectionProps {
    value: SpacingState;
    onChange: (value: SpacingState) => void;
    defaultOpen?: boolean;
}

/**
 * SPACING section — Padding and Margin, side by side, each rendered
 * with the box-shaped LinkedSpacingControl. Margin allows "auto"
 * values (left/right auto in the design's example), Padding does not.
 */
export function SpacingSection({
    value,
    onChange,
    defaultOpen,
}: SpacingSectionProps): React.ReactElement {
    const patch = (partial: Partial<SpacingState>) =>
        onChange({ ...value, ...partial });

    return (
        <AccordionSection
            id="spacing"
            icon={<Square />}
            title="Spacing"
            defaultOpen={defaultOpen}
        >
            <PropertyGroup columns={2}>
                <PropertyRow label="Padding" htmlFor="padding">
                    <LinkedSpacingControl
                        id="padding"
                        value={value.padding}
                        onChange={(padding) => patch({ padding })}
                        allowAuto={false}
                    />
                </PropertyRow>

                <PropertyRow label="Margin" htmlFor="margin">
                    <LinkedSpacingControl
                        id="margin"
                        value={value.margin}
                        onChange={(margin) => patch({ margin })}
                        allowAuto={true}
                    />
                </PropertyRow>
            </PropertyGroup>
        </AccordionSection>
    );
}