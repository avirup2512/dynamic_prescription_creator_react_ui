import SectionCard from "./SectionCard";
import NumberInput from "./NumberInput";
import ColorPicker from "./ColorPicker";

import { type StyleSectionProps } from "./types";

export default function BorderSection({
    value,
    onChange,
}: StyleSectionProps) {

    return (

        <SectionCard title="Border">

            <div className="space-y-5">

                <NumberInput
                    label="Border Width"
                    value={value.border_width}
                    min={0}
                    max={20}
                    onChange={(v) =>
                        onChange(
                            "border_width",
                            v ?? 0
                        )
                    }
                />

                <NumberInput
                    label="Border Radius"
                    value={value.border_radius}
                    min={0}
                    max={100}
                    onChange={(v) =>
                        onChange(
                            "border_radius",
                            v ?? 0
                        )
                    }
                />

                <ColorPicker
                    label="Border Color"
                    value={value.border_color}
                    onChange={(v) =>
                        onChange(
                            "border_color",
                            v
                        )
                    }
                />

            </div>

        </SectionCard>

    );

}