import type { CSSProperties, ReactNode } from "react";
import { useMemo, useState } from "react";
import { HeartPulse, Pipette } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const backgroundColors = [
    { value: "transparent", label: "None", className: "bg-white" },
    { value: "#ffffff", label: "White", className: "bg-white" },
    { value: "#f8fafc", label: "Slate-50", className: "bg-slate-50" },
    { value: "#effaf7", label: "Mint-50", className: "bg-emerald-50" },
];

const fieldStyles = [
    { value: "outlined", label: "Outlined" },
    { value: "filled", label: "Filled" },
    { value: "underlined", label: "Underlined" },
];

const densityOptions = [
    { value: "compact", label: "Compact" },
    { value: "comfortable", label: "Comfortable" },
    { value: "spacious", label: "Spacious" },
];

const shadowOptions = [
    { value: "none", label: "None" },
    { value: "subtle", label: "Subtle" },
    { value: "soft", label: "Soft" },
    { value: "elevated", label: "Elevated" },
];

const iconStyles = [
    { value: "outline", label: "Outline" },
    { value: "filled", label: "Filled" },
    { value: "duotone", label: "Duotone" },
];

const accentColors = [
    { value: "#0f9f9a", label: "Teal" },
    { value: "#0f8fe8", label: "Blue" },
    { value: "#8b8bd8", label: "Indigo" },
    { value: "#8c5fd3", label: "Violet" },
    { value: "#f59e0b", label: "Amber" },
    { value: "#e96f78", label: "Rose" },
];

const headingSizes = [
    { value: "12", label: "Sm" },
    { value: "13", label: "Md" },
    { value: "14", label: "Lg" },
];

const fontWeights = [
    { value: "400", label: "400" },
    { value: "500", label: "500" },
    { value: "600", label: "600" },
    { value: "700", label: "700" },
];

const labelSizes = [
    { value: "11", label: "11px" },
    { value: "12", label: "12px" },
    { value: "13", label: "13px" },
    { value: "14", label: "14px" },
];

interface StyleState {
    backgroundColor: string;
    borderColor: string;
    borderStyle: string;
    borderWidth: number;
    borderRadius: number;
    shadow: string;
    headingSize: string;
    fontWeight: string;
    textColor: string;
    letterSpacing: number;
    uppercase: boolean;
    muted: boolean;
    labelSize: string;
    fieldStyle: string;
    density: string;
    accentColor: string;
    iconStyle: string;
}

function SectionBlock({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="space-y-3 rounded-md border border-slate-100 bg-slate-50/60 p-3">
            <h4 className="text-[12px] font-semibold leading-none text-slate-950">{title}</h4>
            {children}
        </section>
    );
}

function ControlStack({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
    return (
        <div className={`space-y-1.5 ${className}`}>
            <Label className="text-[10px] font-semibold uppercase text-slate-500">{label}</Label>
            <div className="min-w-0">{children}</div>
        </div>
    );
}

function SmallSelect({
    value,
    onValueChange,
    options,
    className = "",
}: {
    value: string;
    onValueChange: (value: string) => void;
    options: Array<{ value: string; label: string }>;
    className?: string;
}) {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className={`h-8 rounded-md border-slate-200 bg-white px-2 text-[11px] shadow-none ${className}`}>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

function SegmentedControl({
    value,
    options,
    onChange,
    columns,
}: {
    value: string;
    options: Array<{ value: string; label: string }>;
    onChange: (value: string) => void;
    columns?: number;
}) {
    return (
        <div
            className="grid min-h-8 overflow-hidden rounded-md border border-slate-200 bg-white"
            style={{ gridTemplateColumns: `repeat(${columns ?? options.length}, minmax(0, 1fr))` }}
        >
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    onClick={() => onChange(option.value)}
                    className={`min-h-8 border-r border-slate-200 px-2 text-[11px] font-medium transition last:border-r-0 ${value === option.value
                        ? "bg-sky-50 text-sky-700 shadow-[inset_0_0_0_1px_rgba(14,165,233,0.35)]"
                        : "text-slate-600 hover:bg-slate-50"
                        }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}

function RangeControl({
    value,
    min,
    max,
    step = 1,
    unit,
    onChange,
}: {
    value: number;
    min: number;
    max: number;
    step?: number;
    unit: string;
    onChange: (value: number) => void;
}) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex h-8 min-w-12 items-center justify-center rounded-md border border-slate-200 bg-white px-2 text-[11px] font-medium text-slate-800">
                {value}
                {unit}
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(event) => onChange(Number(event.target.value))}
                className="h-1.5 min-w-0 flex-1 cursor-pointer accent-sky-500"
            />
        </div>
    );
}

function ColorValue({
    value,
    onChange,
    swatchClassName = "",
}: {
    value: string;
    onChange: (value: string) => void;
    swatchClassName?: string;
}) {
    return (
        <div className="flex h-8 items-center overflow-hidden rounded-md border border-slate-200 bg-white">
            <span
                className={`ml-2 h-5 w-7 shrink-0 rounded border border-slate-200 ${swatchClassName}`}
                style={{ backgroundColor: value === "transparent" ? undefined : value }}
            />
            <Input
                value={value === "transparent" ? "None" : value.toUpperCase()}
                onChange={(event) => onChange(event.target.value)}
                className="h-8 border-0 bg-transparent px-2 text-[11px] font-semibold text-slate-700 shadow-none focus-visible:ring-0"
                aria-label="Color value"
            />
        </div>
    );
}

function BackgroundSwatch({
    option,
    selected,
    onClick,
}: {
    option: (typeof backgroundColors)[number];
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button type="button" onClick={onClick} className="grid justify-items-center gap-1 text-[9px] font-medium text-slate-600">
            <span
                className={`relative flex h-8 w-8 items-center justify-center rounded-full border transition ${selected ? "border-sky-500 ring-2 ring-sky-100" : "border-slate-200 hover:border-slate-300"} ${option.className}`}
            >
                {option.value === "transparent" && <span className="h-px w-9 rotate-[-45deg] bg-rose-300" />}
            </span>
            <span className="max-w-12 truncate">{option.label}</span>
        </button>
    );
}

function AccentSwatch({
    value,
    selected,
    label,
    onClick,
}: {
    value: string;
    selected: boolean;
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={`Accent color ${label}`}
            className={`h-7 w-7 rounded-full transition ${selected ? "ring-2 ring-sky-500 ring-offset-2" : "hover:scale-105"}`}
            style={{ backgroundColor: value }}
        />
    );
}

export default function StyleTab() {
    const [style, setStyle] = useState<StyleState>({
        backgroundColor: "#f8fafc",
        borderColor: "#e5e7eb",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 12,
        shadow: "soft",
        headingSize: "13",
        fontWeight: "600",
        textColor: "#0f172a",
        letterSpacing: 0.01,
        uppercase: false,
        muted: true,
        labelSize: "12",
        fieldStyle: "outlined",
        density: "comfortable",
        accentColor: "#0f8fe8",
        iconStyle: "outline",
    });

    const previewClassName = useMemo(() => {
        const densityClass = {
            compact: "px-3 py-2",
            comfortable: "px-3.5 py-3",
            spacious: "px-4 py-4",
        }[style.density];

        const shadowClass = {
            none: "shadow-none",
            subtle: "shadow-[0_1px_2px_rgba(15,23,42,0.06)]",
            soft: "shadow-[0_8px_18px_rgba(15,23,42,0.07)]",
            elevated: "shadow-[0_14px_30px_rgba(15,23,42,0.13)]",
        }[style.shadow];

        return `${densityClass} ${shadowClass}`;
    }, [style.density, style.shadow]);

    const fieldClassName = {
        outlined: "border border-slate-200 bg-white",
        filled: "border border-transparent bg-slate-100",
        underlined: "border-b border-slate-300 bg-transparent rounded-none",
    }[style.fieldStyle];

    const previewStyle: CSSProperties = {
        backgroundColor: style.backgroundColor === "transparent" ? "transparent" : style.backgroundColor,
        borderColor: style.borderColor,
        borderWidth: style.borderWidth,
        borderStyle: style.borderStyle,
        borderRadius: style.borderRadius,
        color: style.textColor,
    };

    return (
        <div className="space-y-3">
            <div className="space-y-3">
                <SectionBlock title="Appearance">
                    <ControlStack label="Background">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                                {backgroundColors.map((option) => (
                                    <BackgroundSwatch
                                        key={option.value}
                                        option={option}
                                        selected={style.backgroundColor === option.value}
                                        onClick={() => setStyle({ ...style, backgroundColor: option.value })}
                                    />
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={() => setStyle({ ...style, backgroundColor: "#f8fafc" })}
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                                aria-label="Pick custom background"
                            >
                                <Pipette className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </ControlStack>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-semibold uppercase text-slate-500">Border</Label>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="col-span-2">
                                <SmallSelect
                                    value={style.borderStyle}
                                    onValueChange={(value) => setStyle({ ...style, borderStyle: value })}
                                    options={[{ value: "solid", label: "Solid" }, { value: "dashed", label: "Dashed" }]}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-[10px] font-medium text-slate-500">Width</Label>
                                <RangeControl value={style.borderWidth} min={0} max={4} unit="px" onChange={(value) => setStyle({ ...style, borderWidth: value })} />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-[10px] font-medium text-slate-500">Radius</Label>
                                <RangeControl value={style.borderRadius} min={0} max={20} unit="px" onChange={(value) => setStyle({ ...style, borderRadius: value })} />
                            </div>
                        </div>
                    </div>

                    <ControlStack label="Border color">
                        <ColorValue value={style.borderColor} onChange={(value) => setStyle({ ...style, borderColor: value })} />
                    </ControlStack>

                    <ControlStack label="Shadow">
                        <SegmentedControl value={style.shadow} options={shadowOptions} columns={2} onChange={(value) => setStyle({ ...style, shadow: value })} />
                    </ControlStack>
                </SectionBlock>

                <SectionBlock title="Typography">
                    <div className="grid grid-cols-2 gap-2">
                        <ControlStack label="Heading">
                            <SmallSelect value={style.headingSize} onValueChange={(value) => setStyle({ ...style, headingSize: value })} options={headingSizes} />
                        </ControlStack>
                        <ControlStack label="Weight">
                            <SmallSelect value={style.fontWeight} onValueChange={(value) => setStyle({ ...style, fontWeight: value })} options={fontWeights} />
                        </ControlStack>
                    </div>

                    <ControlStack label="Text color">
                        <ColorValue value={style.textColor} onChange={(value) => setStyle({ ...style, textColor: value })} swatchClassName="w-5" />
                    </ControlStack>

                    <ControlStack label="Letter spacing">
                        <RangeControl
                            value={style.letterSpacing}
                            min={0}
                            max={0.08}
                            step={0.01}
                            unit="em"
                            onChange={(value) => setStyle({ ...style, letterSpacing: value })}
                        />
                    </ControlStack>

                    <ControlStack label="Label style">
                        <div className="grid grid-cols-2 gap-2">
                            <label className="flex h-8 items-center justify-between gap-2 rounded-md border border-slate-200 bg-white px-2 text-[11px] font-medium text-slate-700">
                                Uppercase
                                <Switch size="sm" checked={style.uppercase} onCheckedChange={(checked) => setStyle({ ...style, uppercase: checked })} />
                            </label>
                            <label className="flex h-8 items-center justify-between gap-2 rounded-md border border-slate-200 bg-white px-2 text-[11px] font-medium text-slate-700">
                                Muted
                                <Switch size="sm" checked={style.muted} onCheckedChange={(checked) => setStyle({ ...style, muted: checked })} />
                            </label>
                            <div className="col-span-2">
                                <SmallSelect value={style.labelSize} onValueChange={(value) => setStyle({ ...style, labelSize: value })} options={labelSizes} />
                            </div>
                        </div>
                    </ControlStack>
                </SectionBlock>

                <SectionBlock title="Field style">
                    <div className="space-y-3">
                        <ControlStack label="Field style">
                            <SegmentedControl value={style.fieldStyle} options={fieldStyles} onChange={(value) => setStyle({ ...style, fieldStyle: value })} />
                        </ControlStack>
                        <ControlStack label="Density">
                            <SegmentedControl value={style.density} options={densityOptions} onChange={(value) => setStyle({ ...style, density: value })} />
                        </ControlStack>
                    </div>

                    <div className="space-y-3">
                        <ControlStack label="Accent color">
                            <div className="flex flex-wrap items-center gap-3 rounded-md border border-slate-100 bg-white p-2">
                                {accentColors.map((option) => (
                                    <AccentSwatch
                                        key={option.value}
                                        value={option.value}
                                        label={option.label}
                                        selected={style.accentColor === option.value}
                                        onClick={() => setStyle({ ...style, accentColor: option.value })}
                                    />
                                ))}
                            </div>
                        </ControlStack>
                        <ControlStack label="Icon style">
                            <SegmentedControl value={style.iconStyle} options={iconStyles} onChange={(value) => setStyle({ ...style, iconStyle: value })} />
                        </ControlStack>
                    </div>
                </SectionBlock>

                <SectionBlock title="Live preview">
                    <div className={`${previewClassName} flex items-center justify-between gap-3 border ${fieldClassName}`} style={previewStyle}>
                        <div className="flex min-w-0 items-center gap-2.5">
                            <span
                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${style.iconStyle === "filled" ? "text-white" : "bg-white"}`}
                                style={{
                                    backgroundColor: style.iconStyle === "filled" ? style.accentColor : style.iconStyle === "duotone" ? `${style.accentColor}18` : "#ffffff",
                                    color: style.accentColor,
                                }}
                            >
                                <HeartPulse className="h-4 w-4" />
                            </span>
                            <span
                                className="truncate"
                                style={{
                                    fontSize: Number(style.headingSize),
                                    fontWeight: Number(style.fontWeight),
                                    letterSpacing: style.letterSpacing,
                                    textTransform: style.uppercase ? "uppercase" : "none",
                                    color: style.muted ? "#334155" : style.textColor,
                                }}
                            >
                                Blood Pressure
                            </span>
                        </div>
                        <span className="shrink-0 text-[14px] font-bold" style={{ color: style.accentColor }}>
                            120/80 mmHg
                        </span>
                    </div>
                </SectionBlock>
            </div>
        </div>
    );
}
