import { Circle } from "lucide-react";
import Section from "../reUsableComponents/Section";
import { useState } from "react";
import ColorRow from "../reUsableComponents/ColorRow";

const ColorsSection = function () {
    const [fillHex, setFillHex] = useState("4D38F1");
    const [fillOp, setFillOp] = useState(100);
    const [bgHex, setBgHex] = useState("F8F8FC");
    const [bgOp, setBgOp] = useState(0);

    return (
        <Section value="colors" icon={<Circle size={12} />} title="Colors">
            <ColorRow
                label="Fill color"
                hex={fillHex}
                opacity={fillOp}
                onHex={setFillHex}
                onOpacity={setFillOp}
            />
            <ColorRow
                label="Background color"
                hex={bgHex}
                opacity={bgOp}
                onHex={setBgHex}
                onOpacity={setBgOp}
            />
        </Section>
    );
}
export default ColorsSection;
