import SectionCard from "./SectionCard";
import NumberInput from "./NumberInput";
import FourSideInput from "./FourSideInput";

import { type StyleSectionProps } from "./types";

export default function SpacingSection({
    value,
    onChange,
}: StyleSectionProps) {

    return (

        <SectionCard title="Spacing">

            <div className="space-y-6">

                <NumberInput
                    label="Line Height"
                    value={value.line_height}
                    step={0.1}
                    min={0.5}
                    max={5}
                    onChange={(v) =>
                        onChange(
                            "line_height",
                            v ?? 1.2
                        )
                    }
                />

                <NumberInput
                    label="Letter Spacing"
                    value={value.letter_spacing}
                    step={0.5}
                    min={-10}
                    max={50}
                    onChange={(v) =>
                        onChange(
                            "letter_spacing",
                            v ?? 0
                        )
                    }
                />

                <FourSideInput
                    title="Padding"

                    top={value.padding_top}
                    right={value.padding_right}
                    bottom={value.padding_bottom}
                    left={value.padding_left}

                    onTopChange={(v) =>
                        onChange("padding_top", v)
                    }

                    onRightChange={(v) =>
                        onChange("padding_right", v)
                    }

                    onBottomChange={(v) =>
                        onChange("padding_bottom", v)
                    }

                    onLeftChange={(v) =>
                        onChange("padding_left", v)
                    }
                />

                <FourSideInput
                    title="Margin"

                    top={value.margin_top}
                    right={value.margin_right}
                    bottom={value.margin_bottom}
                    left={value.margin_left}

                    onTopChange={(v) =>
                        onChange("margin_top", v)
                    }

                    onRightChange={(v) =>
                        onChange("margin_right", v)
                    }

                    onBottomChange={(v) =>
                        onChange("margin_bottom", v)
                    }

                    onLeftChange={(v) =>
                        onChange("margin_left", v)
                    }
                />

            </div>

        </SectionCard>

    );

}