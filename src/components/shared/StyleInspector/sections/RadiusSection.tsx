// components/style-panel/sections/RadiusSection.tsx

import * as React from "react";
import { SquareRoundCorner } from "lucide-react";
import { AccordionSection } from "../controls/AccordionSection";
import { PropertyRow } from "../controls/PropertyRow";
import { SliderWithInput } from "../controls/SliderWithInput";
import { CornerRadiusControl } from "../controls/CornerRadiusControl";
import type { RadiusState } from "../types";
import { RADIUS_MIN, RADIUS_MAX } from "../constants";

export interface RadiusSectionProps {
    value: RadiusState;
    onChange: (value: RadiusState) => void;
    defaultOpen?: boolean;
}

/**
 * RADIUS section — Global radius (inline slider + numeric field,
 * "0 ─●──── 32px  [12] px") and Corner radius (Top left / Top right /
 * Bottom right / Bottom left fields + link toggle).
 *
 * Global radius changes propagate to all four corners only when
 * corners are linked, matching the mental model that "global" is a
 * convenience shortcut over the same underlying linked corner state.
 */
export function RadiusSection({
    value,
    onChange,
    defaultOpen,
}: RadiusSectionProps): React.ReactElement {
    const patch = (partial: Partial<RadiusState>) =>
        onChange({ ...value, ...partial });

    const handleGlobalChange = (global: number) => {
        if (value.corners.linked) {
            patch({
                global,
                corners: {
                    ...value.corners,
                    topLeft: global,
                    topRight: global,
                    bottomRight: global,
                    bottomLeft: global,
                },
            });
        } else {
            patch({ global });
        }
    };

    return (
        <AccordionSection
            id="radius"
            icon={<SquareRoundCorner />}
            title="Radius"
            defaultOpen={defaultOpen}
        >
            <PropertyRow label="Global radius" htmlFor="global-radius">
                <SliderWithInput
                    id="global-radius"
                    value={value.global}
                    onChange={handleGlobalChange}
                    min={RADIUS_MIN}
                    max={RADIUS_MAX}
                    unit="px"
                    showRangeLabels
                />
            </PropertyRow>

            <PropertyRow label="Corner radius">
                <CornerRadiusControl
                    value={value.corners}
                    onChange={(corners) => patch({ corners })}
                />
            </PropertyRow>
        </AccordionSection>
    );
}