import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import SectionCard from "./SectionCard";

import { TEXT_ALIGN } from "./constants";
import { type StyleSectionProps } from "./types";

export default function AlignmentSection({
    value,
    onChange,
}: StyleSectionProps) {

    const buttons = [
        {
            value: TEXT_ALIGN.LEFT,
            icon: AlignLeft,
        },
        {
            value: TEXT_ALIGN.CENTER,
            icon: AlignCenter,
        },
        {
            value: TEXT_ALIGN.RIGHT,
            icon: AlignRight,
        },
        {
            value: TEXT_ALIGN.JUSTIFY,
            icon: AlignJustify,
        },
    ];

    return (

        <SectionCard title="Alignment">

            <div className="grid grid-cols-4 gap-2">

                {buttons.map((button) => {

                    const Icon = button.icon;

                    return (

                        <Button
                            key={button.value}
                            variant={
                                value.text_align === button.value
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() =>
                                onChange(
                                    "text_align",
                                    button.value
                                )
                            }
                        >

                            <Icon className="h-4 w-4" />

                        </Button>

                    );

                })}

            </div>

        </SectionCard>

    );

}