import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as Slider from "@radix-ui/react-slider";
import * as Switch from "@radix-ui/react-switch";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Select from "@radix-ui/react-select";
import * as Popover from "@radix-ui/react-popover";
import {
    Search,
    RotateCcw,
    MoreHorizontal,
    ChevronDown,
    ChevronRight,
    Type,
    Circle,
    ArrowLeftRight,
    Square,
    Minus,
    Sparkles,
    Eye,
    Link2,
    Unlink2,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    AlignStartVertical,
    AlignCenterVertical,
    AlignEndVertical,
    AlignStartHorizontal,
    AlignCenterHorizontal,
    AlignEndHorizontal,
} from "lucide-react";

/* ─── tiny utilities ─────────────────────────────────────────────────────── */

function cx(...cs: (string | false | null | undefined)[]) {
    return cs.filter(Boolean).join(" ");
}

/* ─── types ──────────────────────────────────────────────────────────────── */

interface Sides {
    top: number | "auto";
    right: number | "auto";
    bottom: number | "auto";
    left: number | "auto";
    linked: boolean;
}

interface Corners {
    tl: number; tr: number; br: number; bl: number; linked: boolean;
}

/* ─── primitive inputs ───────────────────────────────────────────────────── */

/** Compact numeric (or "auto") field */
function Num({
    value,
    onChange,
    w = "w-10",
}: {
    value: number | string;
    onChange?: (v: number | "auto") => void;
    w?: string;
}) {
    return (
        <input
            type={value === "auto" ? "text" : "number"}
            value={value}
            onChange={(e) => {
                const raw = e.target.value;
                onChange?.(raw === "auto" ? "auto" : Number(raw));
            }}
            className={cx(
                w,
                "h-[24px] bg-[#F3F3F6] rounded-[4px] border-none outline-none",
                "text-[11px] font-medium text-[#111] text-center",
                "focus:ring-1 focus:ring-blue-500/50",
                "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none",
            )}
        />
    );
}

/** Small "px" / "%" label */
function Unit({ children }: { children: string }) {
    return <span className="text-[10px] text-[#AAA] shrink-0">{children}</span>;
}

/** Left-side property label */
function Label({ children, w = "w-[86px]" }: { children: string; w?: string }) {
    return (
        <span className={cx("text-[11px] text-[#888] shrink-0 leading-none", w)}>
            {children}
        </span>
    );
}

/** Section header text */
function SectionTitle({ children }: { children: string }) {
    return (
        <span className="text-[10px] font-semibold tracking-[0.08em] text-[#AAAAAA] uppercase select-none">
            {children}
        </span>
    );
}

/* ─── prop row ───────────────────────────────────────────────────────────── */

function Row({
    label,
    children,
    lw,
}: {
    label: string;
    children: React.ReactNode;
    lw?: string;
}) {
    return (
        <div className="flex items-center gap-1.5 min-h-[24px]">
            <Label w={lw}>{label}</Label>
            <div className="flex items-center gap-1 flex-1 min-w-0">{children}</div>
        </div>
    );
}

/* ─── color input ────────────────────────────────────────────────────────── */

function ColorRow({
    label,
    hex,
    opacity,
    onHex,
    onOpacity,
}: {
    label: string;
    hex: string;
    opacity: number;
    onHex: (h: string) => void;
    onOpacity: (o: number) => void;
}) {
    return (
        <Row label={label}>
            <Popover.Root>
                <Popover.Trigger asChild>
                    <button className="flex items-center gap-1.5 bg-[#F3F3F6] rounded-[4px] h-[24px] px-1.5 flex-1 min-w-0 hover:bg-[#EAEAED] transition-colors">
                        <span
                            className="w-3 h-3 rounded-[2px] border border-black/10 shrink-0"
                            style={{ background: `#${hex}` }}
                        />
                        <span className="text-[11px] font-mono text-[#222] uppercase truncate">
                            #{hex}
                        </span>
                    </button>
                </Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content
                        className="bg-white rounded-xl shadow-2xl border border-[#E8E8E8] p-3 z-50 w-52"
                        sideOffset={6}
                        align="start"
                    >
                        <input
                            type="color"
                            value={`#${hex}`}
                            onChange={(e) => onHex(e.target.value.slice(1))}
                            className="w-full h-28 cursor-pointer rounded-lg"
                        />
                        <div className="mt-2 flex items-center gap-1.5">
                            <span className="text-[10px] text-[#AAA]">HEX</span>
                            <input
                                type="text"
                                maxLength={6}
                                value={hex.toUpperCase()}
                                onChange={(e) => onHex(e.target.value.replace("#", ""))}
                                className="flex-1 bg-[#F3F3F6] rounded-[4px] text-[11px] px-2 h-6 outline-none font-mono uppercase"
                            />
                        </div>
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>

            <Num value={opacity} onChange={(v) => onOpacity(Number(v))} w="w-8" />
            <Unit>%</Unit>
        </Row>
    );
}

/* ─── reusable select ────────────────────────────────────────────────────── */

function CompactSelect({
    value,
    onValueChange,
    options,
    className,
}: {
    value: string;
    onValueChange: (v: string) => void;
    options: { value: string; label: string }[];
    className?: string;
}) {
    return (
        <Select.Root value={value} onValueChange={onValueChange}>
            <Select.Trigger
                className={cx(
                    "flex items-center justify-between gap-1 bg-[#F3F3F6] rounded-[4px] h-[24px] px-2",
                    "text-[11px] text-[#222] outline-none hover:bg-[#EAEAED] transition-colors",
                    className,
                )}
            >
                <Select.Value />
                <Select.Icon>
                    <ChevronDown size={10} className="text-[#BBB]" />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content className="bg-white rounded-xl shadow-2xl border border-[#E8E8E8] z-50">
                    <Select.Viewport className="p-1">
                        {options.map((o) => (
                            <Select.Item
                                key={o.value}
                                value={o.value}
                                className="text-[11px] px-2.5 py-1.5 rounded-[4px] cursor-pointer text-[#222] outline-none data-[highlighted]:bg-[#F3F3F6]"
                            >
                                <Select.ItemText>{o.label}</Select.ItemText>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}

/* ─── accordion section wrapper ──────────────────────────────────────────── */

function Section({
    value,
    icon,
    title,
    inline,
    children,
}: {
    value: string;
    icon: React.ReactNode;
    title: string;
    /** rendered inline in the trigger header, right of the title */
    inline?: React.ReactNode;
    children?: React.ReactNode;
}) {
    return (
        <Accordion.Item value={value} className="border-b border-[#EDEDED] last:border-none">
            <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center gap-1.5 px-3 h-[34px] hover:bg-[#FAFAFA] transition-colors">
                    <span className="text-[#C0C0C0] shrink-0">{icon}</span>
                    <SectionTitle>{title}</SectionTitle>
                    {inline && (
                        <div
                            className="ml-auto flex items-center gap-1.5 mr-1"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {inline}
                        </div>
                    )}
                    {children !== undefined && (
                        <ChevronDown
                            size={11}
                            className={cx(
                                "text-[#CCCCCC] transition-transform duration-150 group-data-[state=open]:rotate-180",
                                inline ? "" : "ml-auto",
                            )}
                        />
                    )}
                    {children === undefined && !inline && (
                        <ChevronRight size={11} className="ml-auto text-[#CCCCCC]" />
                    )}
                </Accordion.Trigger>
            </Accordion.Header>
            {children !== undefined && (
                <Accordion.Content className="overflow-hidden">
                    <div className="px-3 pt-0.5 pb-2.5 space-y-[6px]">{children}</div>
                </Accordion.Content>
            )}
        </Accordion.Item>
    );
}

/* ─── TYPOGRAPHY ─────────────────────────────────────────────────────────── */

function TypographySection() {
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
                                "flex-1 h-[24px] text-[9px] font-semibold rounded-[4px] transition-colors",
                                "bg-[#F3F3F6] text-[#888]",
                                "hover:bg-[#E8E8EB] data-[state=on]:bg-[#2563EB] data-[state=on]:text-white",
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
                                    "w-[24px] h-[24px] flex items-center justify-center rounded-[4px] transition-colors",
                                    "bg-[#F3F3F6] text-[#888]",
                                    "hover:bg-[#E8E8EB] data-[state=on]:bg-[#2563EB] data-[state=on]:text-white",
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

/* ─── COLORS ─────────────────────────────────────────────────────────────── */

function ColorsSection() {
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

/* ─── ALIGNMENT ──────────────────────────────────────────────────────────── */

function AlignmentSection() {
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
                            "flex-1 h-[24px] flex items-center justify-center rounded-[4px] transition-colors",
                            "bg-[#F3F3F6] text-[#888]",
                            "hover:bg-[#E8E8EB] data-[state=on]:bg-[#2563EB] data-[state=on]:text-white",
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

/* ─── SPACING ────────────────────────────────────────────────────────────── */

function SpacingCross({
    label,
    values,
    onChange,
}: {
    label: string;
    values: Sides;
    onChange: (v: Sides) => void;
}) {
    const set = (k: keyof Omit<Sides, "linked">, v: number | "auto") => {
        onChange(
            values.linked && v !== "auto"
                ? { ...values, top: v, right: v, bottom: v, left: v }
                : { ...values, [k]: v },
        );
    };

    const N = ({ k }: { k: keyof Omit<Sides, "linked"> }) => (
        <Num value={values[k]} onChange={(v) => set(k, v)} w="w-9" />
    );

    return (
        <div className="flex flex-col gap-1">
            <span className="text-[10px] font-medium text-[#999]">{label}</span>
            <div className="grid grid-cols-3 gap-[3px] items-center justify-items-center">
                {/* row 1 */}
                <div />
                <N k="top" />
                <div />
                {/* row 2 */}
                <N k="left" />
                <button
                    onClick={() => onChange({ ...values, linked: !values.linked })}
                    className="w-5 h-5 flex items-center justify-center rounded-[3px] bg-[#E8E8EB] text-[#888] hover:bg-[#DDDDE0] transition-colors"
                >
                    {values.linked ? <Link2 size={8} /> : <Unlink2 size={8} />}
                </button>
                <N k="right" />
                {/* row 3 */}
                <div />
                <N k="bottom" />
                <div />
            </div>
        </div>
    );
}

function SpacingSection() {
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
                <div className="w-px bg-[#EDEDED] self-stretch my-0.5" />
                <SpacingCross label="Margin" values={margin} onChange={setMargin} />
            </div>
        </Section>
    );
}

/* ─── BORDER ─────────────────────────────────────────────────────────────── */

function BorderSection() {
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

/* ─── RADIUS ─────────────────────────────────────────────────────────────── */

function RadiusSection() {
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
            <span className="text-[9px] text-[#C0C0C0] leading-none">{label}</span>
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
                    className="flex-1 flex items-center h-4 touch-none select-none"
                >
                    <Slider.Track className="bg-[#E4E4E7] rounded-full h-[5px] flex-1 relative">
                        <Slider.Range className="absolute h-full bg-[#2563EB] rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-[13px] h-[13px] rounded-full bg-[#2563EB] border-[2px] border-white shadow outline-none focus:ring-2 focus:ring-blue-400/40" />
                </Slider.Root>
                <span className="text-[10px] text-[#AAA] shrink-0 w-8 text-right">{global}px</span>
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
                        className="w-5 h-[24px] flex items-center justify-center rounded-[3px] bg-[#E8E8EB] text-[#888] hover:bg-[#DDDDE0] transition-colors shrink-0 self-end"
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

/* ─── EFFECTS — inline dropdown in trigger ───────────────────────────────── */

function EffectsSection() {
    const [enabled, setEnabled] = useState(false);
    const [preset, setPreset] = useState("none");

    const InlineControl = (
        <div className="flex items-center gap-1.5">
            <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="w-3 h-3 rounded-[2px] accent-[#2563EB] cursor-pointer"
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

/* ─── VISIBILITY — inline switch in trigger ──────────────────────────────── */

function VisibilitySection() {
    const [on, setOn] = useState(true);

    const InlineSwitch = (
        <Switch.Root
            checked={on}
            onCheckedChange={setOn}
            className="relative inline-flex h-[18px] w-8 items-center rounded-full outline-none transition-colors bg-[#D1D5DB] data-[state=checked]:bg-[#2563EB]"
        >
            <Switch.Thumb className="block h-[13px] w-[13px] rounded-full bg-white shadow-sm transition-transform translate-x-[2px] data-[state=checked]:translate-x-[15px]" />
        </Switch.Root>
    );

    return (
        <Section
            value="visibility"
            icon={<Eye size={12} />}
            title="Visibility"
            inline={InlineSwitch}
        />
    );
}

/* ─── HEADER ─────────────────────────────────────────────────────────────── */

function PanelHeader() {
    return (
        <div className="flex items-center px-3 h-[46px] border-b border-[#EDEDED] shrink-0">
            <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#111] leading-snug truncate">
                    Hero Heading
                </p>
                <p className="text-[11px] text-[#BBBBBB] leading-none mt-[1px]">Text Element</p>
            </div>
            <div className="flex items-center gap-0.5 ml-2">
                {([<Search size={13} />, <RotateCcw size={13} />, <MoreHorizontal size={13} />] as const).map(
                    (icon, i) => (
                        <button
                            key={i}
                            className="w-[26px] h-[26px] flex items-center justify-center rounded-[5px] text-[#C0C0C0] hover:text-[#555] hover:bg-[#F3F3F6] transition-colors"
                        >
                            {icon}
                        </button>
                    ),
                )}
            </div>
        </div>
    );
}

/* ─── FOOTER ─────────────────────────────────────────────────────────────── */

function PanelFooter() {
    return (
        <div className="flex items-center gap-2 px-3 h-[46px] border-t border-[#EDEDED] shrink-0">
            <button className="flex items-center gap-1 h-[28px] px-2.5 rounded-[5px] text-[11px] font-medium text-[#666] border border-[#E0E0E0] hover:bg-[#F3F3F6] transition-colors">
                <RotateCcw size={11} />
                Reset
            </button>
            <div className="flex-1" />
            <button className="h-[28px] px-3 rounded-[5px] text-[11px] font-medium text-[#555] border border-[#E0E0E0] hover:bg-[#F3F3F6] transition-colors">
                Cancel
            </button>
            <button className="h-[28px] px-4 rounded-[5px] text-[11px] font-semibold bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors">
                Apply
            </button>
        </div>
    );
}

/* ─── PANEL ──────────────────────────────────────────────────────────────── */

export default function App() {
    const [open, setOpen] = useState([
        "typography",
        "colors",
        "spacing",
        "radius",
        "effects",
        "visibility",
    ]);

    return (
        <div
            className="min-h-screen flex items-start justify-center pt-10 pb-10"
            style={{ fontFamily: "'Inter', sans-serif", background: "#EEEEF1" }}
        >
            <div
                className="flex flex-col bg-white rounded-[14px] border border-[#E0E0E0] overflow-hidden w-[272px]"
                style={{
                    boxShadow:
                        "0 0 0 1px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.06), 0 16px 32px rgba(0,0,0,0.08)",
                    maxHeight: "calc(100vh - 80px)",
                }}
            >
                <PanelHeader />

                <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#E0E0E0 transparent" }}>
                    <Accordion.Root type="multiple" value={open} onValueChange={setOpen}>
                        <TypographySection />
                        <ColorsSection />
                        <AlignmentSection />
                        <SpacingSection />
                        <BorderSection />
                        <RadiusSection />
                        <EffectsSection />
                        <VisibilitySection />
                    </Accordion.Root>
                </div>

                <PanelFooter />
            </div>
        </div>
    );
}
