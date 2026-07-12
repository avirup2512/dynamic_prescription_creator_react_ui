// components/style-panel/sections/EffectsSection.tsx

import * as React from "react";
import { Sparkles, Square } from "lucide-react";
import { AccordionSection } from "../controls/AccordionSection";
import { PropertyRow } from "../controls/PropertyRow";
import { SelectInput } from "../controls/SelectInput";
import type { EffectsState } from "../types";
import { EFFECT_PRESET_OPTIONS } from "../constants";

export interface EffectsSectionProps {
    value: EffectsState;
    onChange: (value: EffectsState) => void;
    defaultOpen?: boolean;
}

/**
 * EFFECTS section — a single Effect preset dropdown, right-aligned
 * next to the section header in the design (rather than in its own
 * row below, matching the "EFFECTS ... [None ⌄]" layout seen in the
 * collapsed/inline state of the screenshot).
 */
export function EffectsSection({
    value,
    onChange,
    defaultOpen,
}: EffectsSectionProps): React.ReactElement {
    return (
        <AccordionSection
            id="effects"
            icon={<Sparkles />}
            title="Effects"
            defaultOpen={defaultOpen}
        >
            <PropertyRow label="Preset" htmlFor="effect-preset" layout="inline">
                <SelectInput
                    id="effect-preset"
                    value={value.preset}
                    onChange={(preset) => onChange({ preset: preset as EffectsState["preset"] })}
                    options={EFFECT_PRESET_OPTIONS}
                    icon={value.preset === "none" ? <Square className="h-3.5 w-3.5" strokeDasharray="2 2" /> : undefined}
                    className="w-40"
                />
            </PropertyRow>
        </AccordionSection>
    );
}