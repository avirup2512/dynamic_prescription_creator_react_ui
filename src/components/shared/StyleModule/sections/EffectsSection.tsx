import { useState } from "react";
import CompactSelect from "../reUsableComponents/CompactSelect";
import Section from "../reUsableComponents/Section";
import { Sparkles } from "lucide-react";
import Row from "../reUsableComponents/Row";
import Num from "../reUsableComponents/Num";
import Unit from "../reUsableComponents/Unit";

const EffectsSection = function () {
    const [enabled, setEnabled] = useState(false);
    const [preset, setPreset] = useState("none");

    const InlineControl = (
        <div className="flex items-center gap-1.5">
            <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="w-3 h-3 rounded-sm accent-blue-600 cursor-pointer"
            />
            <CompactSelect
                value={preset}
                onValueChange={setPreset}
                className="w-[72px]"
                options={[
                    { value: "none", label: "None" },
                    { value: "drop-shadow", label: "Drop Shadow" },
                    { value: "inner-shadow", label: "Inner Shadow" },
                    { value: "blur", label: "Blur" },
                    { value: "glow", label: "Glow" },
                ]}
            />
        </div>
    );

    return (
        <Section
            value="effects"
            icon={<Sparkles size={12} />}
            title="Effects"
            inline={InlineControl}
        >
            {enabled && (
                <Row label="Opacity">
                    <Num value={75} w="w-12" />
                    <Unit>%</Unit>
                </Row>
            )}
        </Section>
    );
}
export default EffectsSection;