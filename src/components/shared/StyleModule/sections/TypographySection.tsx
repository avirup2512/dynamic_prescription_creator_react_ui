import { useState } from "react";
import {
    Type,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify
} from "lucide-react";
import Section from "../reUsableComponents/Section";
import Row from "../reUsableComponents/Row";
import CompactSelect from "../reUsableComponents/CompactSelect";
import Label from "../reUsableComponents/Label";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import Num from "../reUsableComponents/Num";
import Unit from "../reUsableComponents/Unit";
import ColorRow from "../reUsableComponents/ColorRow";
function cx(...cs: (string | false | null | undefined)[]) {
    return cs.filter(Boolean).join(" ");
}
const TypographySection = function () {
    const [font, setFont] = useState("inter");
    const [weight, setWeight] = useState("semibold");
    const [size, setSize] = useState<number | "auto">(64);
    const [lineH, setLineH] = useState<number | "auto">(70);
    const [lSpacing, setLSpacing] = useState<number | "auto">(-0.02);
    const [align, setAlign] = useState("left");
    const [textHex, setTextHex] = useState("1F1F3A");
    const [textOp, setTextOp] = useState(100);

    const weightPills = [
        { v: "light", l: "Light" },
        { v: "regular", l: "Regular" },
        { v: "medium", l: "Medium" },
        { v: "semibold", l: "SemiBold" },
        { v: "bold", l: "Bold" },
    ];

    const alignItems = [
        { v: "left", icon: <AlignLeft size={10} /> },
        { v: "center", icon: <AlignCenter size={10} /> },
        { v: "right", icon: <AlignRight size={10} /> },
        { v: "justify", icon: <AlignJustify size={10} /> },
    ];

    return (
        <Section value="typography" icon={<Type size={12} />} title="Typography">
            {/* Font family */}
            <Row label="Font family">
                <CompactSelect
                    value={font}
                    onValueChange={setFont}
                    className="flex-1"
                    options={[
                        { value: "inter", label: "Inter" },
                        { value: "roboto", label: "Roboto" },
                        { value: "sf-pro", label: "SF Pro" },
                        { value: "geist", label: "Geist" },
                        { value: "helvetica", label: "Helvetica Neue" },
                    ]}
                />
            </Row>

            {/* Weight */}
            <div className="space-y-[5px]">
                <Label>Weight</Label>
                <ToggleGroup.Root
                    type="single"
                    value={weight}
                    onValueChange={(v) => v && setWeight(v)}
                    className="flex gap-px w-full"
                >
                    {weightPills.map(({ v, l }) => (
                        <ToggleGroup.Item
                            key={v}
                            value={v}
                            className={cx(
                                "flex-1 h-[24px] text-[9px] font-semibold rounded-md transition-colors",
                                "bg-slate-100 text-slate-600",
                                "hover:bg-slate-200 data-[state=on]:bg-blue-600 data-[state=on]:text-white",
                            )}
                        >
                            {l}
                        </ToggleGroup.Item>
                    ))}
                </ToggleGroup.Root>
            </div>

            {/* Size + Line height on same row */}
            <div className="flex items-center gap-3">
                <Row label="Size" lw="w-auto">
                    <Num value={size} onChange={setSize} w="w-12" />
                </Row>
                <Row label="Line height" lw="w-auto">
                    <Num value={lineH} onChange={setLineH} w="w-12" />
                    <Unit>pt</Unit>
                </Row>
            </div>

            {/* Letter spacing + Text align */}
            <div className="flex items-center gap-3">
                <Row label="Letter space" lw="w-auto">
                    <Num value={lSpacing} onChange={setLSpacing} w="w-14" />
                </Row>
                <Row label="Text align" lw="w-auto">
                    <ToggleGroup.Root
                        type="single"
                        value={align}
                        onValueChange={(v) => v && setAlign(v)}
                        className="flex gap-px"
                    >
                        {alignItems.map(({ v, icon }) => (
                            <ToggleGroup.Item
                                key={v}
                                value={v}
                                className={cx(
                                    "w-[24px] h-[24px] flex items-center justify-center rounded-md transition-colors",
                                    "bg-slate-100 text-slate-600",
                                    "hover:bg-slate-200 data-[state=on]:bg-blue-600 data-[state=on]:text-white",
                                )}
                            >
                                {icon}
                            </ToggleGroup.Item>
                        ))}
                    </ToggleGroup.Root>
                </Row>
            </div>

            {/* Text color */}
            <ColorRow
                label="Text color"
                hex={textHex}
                opacity={textOp}
                onHex={setTextHex}
                onOpacity={setTextOp}
            />
        </Section>
    );
}
export default TypographySection;
