import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
} from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import SectionCard from "./SectionCard";
import NumberInput from "./NumberInput";

import {
    FONT_FAMILIES,
    FONT_WEIGHTS,
    FONT_STYLE,
    TEXT_DECORATION,
} from "./constants";

import { type StyleSectionProps } from "./types";

export default function TypographySection({
    value,
    onChange,
}: StyleSectionProps) {

    return (

        <SectionCard title="Typography">

            <div className="space-y-5">

                <div className="space-y-2">

                    <label className="text-xs font-medium">
                        Font Family
                    </label>

                    <Select
                        value={value.font_family}
                        onValueChange={(v) =>
                            onChange("font_family", v)
                        }
                    >

                        <SelectTrigger>

                            <SelectValue />

                        </SelectTrigger>

                        <SelectContent>

                            {FONT_FAMILIES.map(font => (

                                <SelectItem
                                    key={font}
                                    value={font}
                                >

                                    {font}

                                </SelectItem>

                            ))}

                        </SelectContent>

                    </Select>

                </div>

                <NumberInput
                    label="Font Size"
                    value={value.font_size}
                    min={8}
                    max={72}
                    onChange={(v) =>
                        onChange("font_size", v ?? 14)
                    }
                />

                <div className="space-y-2">

                    <label className="text-xs font-medium">
                        Font Weight
                    </label>

                    <Select
                        value={String(value.font_weight)}
                        onValueChange={(v) =>
                            onChange(
                                "font_weight",
                                Number(v)
                            )
                        }
                    >

                        <SelectTrigger>

                            <SelectValue />

                        </SelectTrigger>

                        <SelectContent>

                            {FONT_WEIGHTS.map(weight => (

                                <SelectItem
                                    key={weight.value}
                                    value={String(weight.value)}
                                >

                                    {weight.label}

                                </SelectItem>

                            ))}

                        </SelectContent>

                    </Select>

                </div>

                <div className="space-y-2">

                    <label className="text-xs font-medium">
                        Text Style
                    </label>

                    <div className="grid grid-cols-4 gap-2">

                        <Button
                            variant={
                                value.font_weight >= 700
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() =>
                                onChange(
                                    "font_weight",
                                    value.font_weight >= 700
                                        ? 400
                                        : 700
                                )
                            }
                        >

                            <Bold className="h-4 w-4" />

                        </Button>

                        <Button
                            variant={
                                value.font_style ===
                                    FONT_STYLE.ITALIC
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() =>
                                onChange(
                                    "font_style",
                                    value.font_style ===
                                        FONT_STYLE.ITALIC
                                        ? FONT_STYLE.NORMAL
                                        : FONT_STYLE.ITALIC
                                )
                            }
                        >

                            <Italic className="h-4 w-4" />

                        </Button>

                        <Button
                            variant={
                                value.text_decoration ===
                                    TEXT_DECORATION.UNDERLINE
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() =>
                                onChange(
                                    "text_decoration",
                                    value.text_decoration ===
                                        TEXT_DECORATION.UNDERLINE
                                        ? TEXT_DECORATION.NONE
                                        : TEXT_DECORATION.UNDERLINE
                                )
                            }
                        >

                            <Underline className="h-4 w-4" />

                        </Button>

                        <Button
                            variant={
                                value.text_decoration ===
                                    TEXT_DECORATION.LINE_THROUGH
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() =>
                                onChange(
                                    "text_decoration",
                                    value.text_decoration ===
                                        TEXT_DECORATION.LINE_THROUGH
                                        ? TEXT_DECORATION.NONE
                                        : TEXT_DECORATION.LINE_THROUGH
                                )
                            }
                        >

                            <Strikethrough className="h-4 w-4" />

                        </Button>

                    </div>

                </div>

            </div>

        </SectionCard>

    );

}