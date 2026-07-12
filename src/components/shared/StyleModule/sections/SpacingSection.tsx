import { useState } from "react";
import Section from "../reUsableComponents/Section";
import { Square } from "lucide-react";
import SpacingCross from "./SpacingCross";
interface Sides {
    top: number | "auto";
    right: number | "auto";
    bottom: number | "auto";
    left: number | "auto";
    linked: boolean;
}
const SpacingSection = function () {
    const [padding, setPadding] = useState<Sides>({
        top: 40, right: 40, bottom: 32, left: 40, linked: true,
    });
    const [margin, setMargin] = useState<Sides>({
        top: 24, right: "auto", bottom: 24, left: "auto", linked: false,
    });

    return (
        <Section value="spacing" icon={<Square size={12} />} title="Spacing">
            <div className="flex gap-2">
                <SpacingCross label="Padding" values={padding} onChange={setPadding} />
                <div className="w-px bg-slate-200 self-stretch my-0.5" />
                <SpacingCross label="Margin" values={margin} onChange={setMargin} />
            </div>
        </Section>
    );
}
export default SpacingSection;
