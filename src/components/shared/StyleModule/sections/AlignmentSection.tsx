import { useState } from "react";
import {
    ArrowLeftRight,
    AlignStartVertical,
    AlignCenterVertical,
    AlignEndVertical,
    AlignStartHorizontal,
    AlignCenterHorizontal,
    AlignEndHorizontal,
} from "lucide-react";
import Row from "../reUsableComponents/Row";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import Section from "../reUsableComponents/Section";
function cx(...cs: (string | false | null | undefined)[]) {
    return cs.filter(Boolean).join(" ");
}
const AlignmentSection = function () {
    const [hAlign, setHAlign] = useState("center");
    const [vAlign, setVAlign] = useState("center");

    const hItems = [
        { v: "start", icon: <AlignStartVertical size={11} /> },
        { v: "center", icon: <AlignCenterVertical size={11} /> },
        { v: "end", icon: <AlignEndVertical size={11} /> },
    ];
    const vItems = [
        { v: "start", icon: <AlignStartHorizontal size={11} /> },
        { v: "center", icon: <AlignCenterHorizontal size={11} /> },
        { v: "end", icon: <AlignEndHorizontal size={11} /> },
    ];

    const AlignGroup = ({
        label,
        value,
        onValueChange,
        items,
    }: {
        label: string;
        value: string;
        onValueChange: (v: string) => void;
        items: { v: string; icon: React.ReactNode }[];
    }) => (
        <Row label={label}>
            <ToggleGroup.Root
                type="single"
                value={value}
                onValueChange={(v) => v && onValueChange(v)}
                className="flex gap-px flex-1"
            >
                {items.map(({ v, icon }) => (
                    <ToggleGroup.Item
                        key={v}
                        value={v}
                        className={cx(
                            "flex-1 h-[24px] flex items-center justify-center rounded-md transition-colors",
                            "bg-slate-100 text-slate-600",
                            "hover:bg-slate-200 data-[state=on]:bg-blue-600 data-[state=on]:text-white",
                        )}
                    >
                        {icon}
                    </ToggleGroup.Item>
                ))}
            </ToggleGroup.Root>
        </Row>
    );

    return (
        <Section value="alignment" icon={<ArrowLeftRight size={12} />} title="Alignment">
            <AlignGroup label="Horizontal" value={hAlign} onValueChange={setHAlign} items={hItems} />
            <AlignGroup label="Vertical" value={vAlign} onValueChange={setVAlign} items={vItems} />
        </Section>
    );
}

export default AlignmentSection;
