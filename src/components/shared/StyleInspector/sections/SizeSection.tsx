// src/components/StyleInspector/sections/SizeSection.tsx

import AccordionSection from "../controls/AccordionSection";
import NumberInput from "../controls/NumberInput";

import { type StyleSectionProps } from "../types";

export default function SizeSection({
    value,
    onChange,
}: StyleSectionProps) {
    return (
        <AccordionSection title="Size">
            <div className="space-y-5">

                <div className="grid grid-cols-2 gap-4">

                    <NumberInput
                        label="Width"
                        value={value.width}
                        allowNull
                        min={0}
                        unit="px"
                        placeholder="Auto"
                        onChange={(v) =>
                            onChange("width", v)
                        }
                    />

                    <NumberInput
                        label="Height"
                        value={value.height}
                        allowNull
                        min={0}
                        unit="px"
                        placeholder="Auto"
                        onChange={(v) =>
                            onChange("height", v)
                        }
                    />

                </div>

            </div>
        </AccordionSection>
    );
}