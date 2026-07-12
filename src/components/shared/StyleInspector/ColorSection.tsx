import SectionCard from "./SectionCard";
import ColorPicker from "./ColorPicker";

import { type StyleSectionProps } from "./types";

export default function ColorSection({
    value,
    onChange,
}: StyleSectionProps) {

    return (

        <SectionCard title="Colors">

            <div className="space-y-5">

                <ColorPicker
                    label="Text Color"
                    value={value.text_color}
                    onChange={(v) =>
                        onChange(
                            "text_color",
                            v
                        )
                    }
                />

                <ColorPicker
                    label="Background Color"
                    value={value.background_color}
                    onChange={(v) =>
                        onChange(
                            "background_color",
                            v
                        )
                    }
                />

            </div>

        </SectionCard>

    );

}