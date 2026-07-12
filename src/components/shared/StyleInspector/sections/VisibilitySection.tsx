// components/style-panel/sections/VisibilitySection.tsx

import * as React from "react";
import { Eye } from "lucide-react";
import { AccordionSection } from "../controls/AccordionSection";
import { PropertyRow } from "../controls/PropertyRow";
import { Switch } from "@/components/ui/switch";
import type { VisibilityState } from "../types";

export interface VisibilitySectionProps {
    value: VisibilityState;
    onChange: (value: VisibilityState) => void;
    defaultOpen?: boolean;
}

/**
 * VISIBILITY section — single Switch control, right-aligned next to
 * the header (matches the design's "VISIBILITY ... [toggle]" row,
 * which has no separate expanded body).
 */
export function VisibilitySection({
    value,
    onChange,
    defaultOpen,
}: VisibilitySectionProps): React.ReactElement {
    return (
        <AccordionSection
            id="visibility"
            icon={<Eye />}
            title="Visibility"
            defaultOpen={defaultOpen}
        >
            <PropertyRow label="Visible" htmlFor="visibility-switch" layout="inline">
                <Switch
                    id="visibility-switch"
                    checked={value.visible}
                    onCheckedChange={(visible) => onChange({ visible })}
                />
            </PropertyRow>
        </AccordionSection>
    );
}