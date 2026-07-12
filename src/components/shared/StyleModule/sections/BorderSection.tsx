import { useState } from "react";
import Section from "../reUsableComponents/Section";
import { Minus } from "lucide-react";
import Row from "../reUsableComponents/Row";
import Num from "../reUsableComponents/Num";
import Unit from "../reUsableComponents/Unit";
import CompactSelect from "../reUsableComponents/CompactSelect";
import ColorRow from "../reUsableComponents/ColorRow";

const BorderSection = function () {
    const [width, setWidth] = useState<number | "auto">(1);
    const [style, setStyle] = useState("solid");
    const [hex, setHex] = useState("E2E8F0");
    const [op, setOp] = useState(100);

    return (
        <Section value="border" icon={<Minus size={12} />} title="Border">
            <Row label="Width">
                <Num value={width} onChange={setWidth} w="w-12" />
                <Unit>px</Unit>
            </Row>
            <Row label="Style">
                <CompactSelect
                    value={style}
                    onValueChange={setStyle}
                    className="flex-1"
                    options={[
                        { value: "solid", label: "Solid" },
                        { value: "dashed", label: "Dashed" },
                        { value: "dotted", label: "Dotted" },
                        { value: "none", label: "None" },
                    ]}
                />
            </Row>
            <ColorRow label="Color" hex={hex} opacity={op} onHex={setHex} onOpacity={setOp} />
        </Section>
    );
}
export default BorderSection;