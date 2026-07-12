import { useState } from "react";
import Num from "../reUsableComponents/Num";
import Section from "../reUsableComponents/Section";
import { Circle, Link2, Unlink2 } from "lucide-react";
import Row from "../reUsableComponents/Row";
import * as Slider from "@radix-ui/react-slider";
import Label from "../reUsableComponents/Label";

interface Corners {
    tl: number; tr: number; br: number; bl: number; linked: boolean;
}
const RadiusSection = function () {
    const [global, setGlobal] = useState(25);
    const [corners, setCorners] = useState<Corners>({
        tl: 12, tr: 12, br: 12, bl: 12, linked: true,
    });

    const setCorner = (k: keyof Omit<Corners, "linked">, v: number) => {
        setCorners((c) =>
            c.linked ? { ...c, tl: v, tr: v, br: v, bl: v } : { ...c, [k]: v },
        );
    };

    const CornerIn = ({
        k,
        label,
    }: {
        k: keyof Omit<Corners, "linked">;
        label: string;
    }) => (
        <div className="flex flex-col items-center gap-[3px] flex-1">
            <span className="text-[9px] text-slate-400 leading-none">{label}</span>
            <Num
                value={corners[k]}
                onChange={(v) => setCorner(k, Number(v))}
                w="w-full"
            />
        </div>
    );

    return (
        <Section value="radius" icon={<Circle size={12} />} title="Radius">
            {/* Global radius */}
            <Row label="Global radius">
                <Slider.Root
                    value={[global]}
                    onValueChange={([v]) => setGlobal(v)}
                    min={0}
                    max={100}
                    step={1}
                    className="relative flex-1 flex items-center h-4 touch-none select-none"
                >
                    <Slider.Track className="bg-slate-300 rounded-full h-[5px] flex-1 relative">
                        <Slider.Range className="absolute h-full bg-blue-600 rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-[13px] h-[13px] rounded-full bg-blue-600 border-[2px] border-white shadow outline-none focus:ring-2 focus:ring-blue-400/40" />
                </Slider.Root>
                <span className="text-xs text-slate-500 shrink-0 w-8 text-right">{global}px</span>
                <Num value={global} onChange={(v) => setGlobal(Number(v))} w="w-8" />
            </Row>

            {/* Corner radius */}
            <div className="space-y-[5px]">
                <Label>Corner radius</Label>
                <div className="flex items-end gap-1">
                    <CornerIn k="tl" label="Top left" />
                    <CornerIn k="tr" label="Top right" />
                    <button
                        onClick={() => setCorners((c) => ({ ...c, linked: !c.linked }))}
                        className="w-5 h-[24px] flex items-center justify-center rounded-md bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 border border-slate-200 transition-colors shrink-0 self-end"
                    >
                        {corners.linked ? <Link2 size={8} /> : <Unlink2 size={8} />}
                    </button>
                    <CornerIn k="br" label="Bottom right" />
                    <CornerIn k="bl" label="Bottom left" />
                </div>
            </div>
        </Section>
    );
}
export default RadiusSection;