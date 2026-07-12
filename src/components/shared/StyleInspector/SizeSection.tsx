import SectionCard from "./SectionCard";
import NumberInput from "./NumberInput";

import { type StyleSectionProps } from "./types";

export default function SizeSection({
    value,
    onChange,
}: StyleSectionProps) {

    return (

        <SectionCard title="Size">

            <div className="space-y-5">

                <NumberInput
                    label="Width"
                    value={value.width}
                    allowNull
                    min={0}
                    unit="px"
                    onChange={(v) =>
                        onChange(
                            "width",
                            v
                        )
                    }
                />

                <NumberInput
                    label="Height"
                    value={value.height}
                    allowNull
                    min={0}
                    unit="px"
                    onChange={(v) =>
                        onChange(
                            "height",
                            v
                        )
                    }
                />

            </div>

        </SectionCard>

    );

}