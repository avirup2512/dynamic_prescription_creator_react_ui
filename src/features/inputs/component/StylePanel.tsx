import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const fontSizes = [
    { value: "13", label: "13px" },
    { value: "14", label: "14px" },
    { value: "15", label: "15px" },
    { value: "16", label: "16px" },
    { value: "17", label: "17px" },
];

const fontWeights = [
    { value: "400", label: "Regular" },
    { value: "500", label: "Medium" },
    { value: "600", label: "Semibold" },
    { value: "700", label: "Bold" },
];

const accentColors = [
    { value: "#2563eb", label: "Blue" },
    { value: "#059669", label: "Green" },
    { value: "#d97706", label: "Amber" },
    { value: "#be123c", label: "Red" },
    { value: "#6d28d9", label: "Purple" },
];

const StylePanel = () => {
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [accentColor, setAccentColor] = useState("#2563eb");
    const [textColor, setTextColor] = useState("#0f172a");
    const [borderColor, setBorderColor] = useState("#d1d5db");
    const [fontSize, setFontSize] = useState("15");
    const [fontWeight, setFontWeight] = useState("600");

    const previewStyles = useMemo(
        () => ({
            backgroundColor,
            color: textColor,
            borderColor,
            fontSize: `${fontSize}px`,
            fontWeight: Number(fontWeight),
        }),
        [backgroundColor, textColor, borderColor, fontSize, fontWeight],
    );

    return (
        <div className="flex min-w-0 flex-1 flex-col overflow-auto px-4 py-3">
            <div className="mb-4 rounded-md border border-slate-200 bg-slate-50 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Style settings</p>
                <p className="mt-2 text-sm text-slate-700">Adjust the appearance of input preview cards and labels across the inputs workspace.</p>
            </div>

            <div className="grid gap-3">
                <section className="rounded-md border border-slate-200 bg-white p-3">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-sm font-semibold text-slate-900">Theme</h2>
                            <p className="text-[11px] text-slate-500">Background, border, and highlight colors.</p>
                        </div>
                        <Button type="button" variant="outline" size="sm">
                            Reset
                        </Button>
                    </div>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="style-background" className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                                Background
                            </Label>
                            <Input
                                id="style-background"
                                type="color"
                                value={backgroundColor}
                                onChange={(event) => setBackgroundColor(event.target.value)}
                                className="h-10 rounded-md border border-slate-200 p-0"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="style-border" className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                                Border
                            </Label>
                            <Input
                                id="style-border"
                                type="color"
                                value={borderColor}
                                onChange={(event) => setBorderColor(event.target.value)}
                                className="h-10 rounded-md border border-slate-200 p-0"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="style-accent" className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                                Accent
                            </Label>
                            <div className="flex items-center gap-2">
                                {accentColors.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setAccentColor(option.value)}
                                        className={`h-9 w-9 rounded-lg border transition ${accentColor === option.value ? "border-slate-900 ring-2 ring-slate-900/10" : "border-slate-200 hover:border-slate-300"}`}
                                        style={{ backgroundColor: option.value }}
                                        aria-label={`Accent color ${option.label}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="style-text" className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                                Text
                            </Label>
                            <Input
                                id="style-text"
                                type="color"
                                value={textColor}
                                onChange={(event) => setTextColor(event.target.value)}
                                className="h-10 rounded-md border border-slate-200 p-0"
                            />
                        </div>
                    </div>
                </section>

                <section className="rounded-md border border-slate-200 bg-white p-3">
                    <h2 className="text-sm font-semibold text-slate-900">Typography</h2>
                    <p className="mt-1 text-[11px] text-slate-500">Control font size and weight for input labels and chips.</p>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="style-font-size" className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                                Font size
                            </Label>
                            <Select value={fontSize} onValueChange={(value) => setFontSize(value)}>
                                <SelectTrigger id="style-font-size" size="sm" className="w-full" />
                                <SelectContent>
                                    {fontSizes.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="style-font-weight" className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                                Font weight
                            </Label>
                            <Select value={fontWeight} onValueChange={(value) => setFontWeight(value)}>
                                <SelectTrigger id="style-font-weight" size="sm" className="w-full" />
                                <SelectContent>
                                    {fontWeights.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </section>

                <section className="rounded-md border border-slate-200 bg-white p-3">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-sm font-semibold text-slate-900">Preview</h2>
                            <p className="text-[11px] text-slate-500">See the selected style on a sample input card.</p>
                        </div>
                        <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
                            Live
                        </span>
                    </div>

                    <div className="mt-4 rounded-2xl border border-slate-200 p-4 shadow-sm" style={{ backgroundColor: backgroundColor, borderColor, color: textColor }}>
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <p className="text-[12px] font-semibold" style={{ fontSize: previewStyles.fontSize, fontWeight: previewStyles.fontWeight }}>
                                Prescription Input
                            </p>
                            <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] text-slate-600" style={{ border: `1px solid ${borderColor}` }}>
                                {accentColor === "#2563eb" ? "Blue" : accentColor === "#059669" ? "Green" : accentColor === "#d97706" ? "Amber" : accentColor === "#be123c" ? "Red" : "Purple"}
                            </span>
                        </div>
                        <div className="rounded-xl bg-white p-3 shadow-sm" style={{ border: `1px solid ${borderColor}` }}>
                            <div className="mb-2 text-[12px] uppercase tracking-[0.18em] text-slate-500">Label</div>
                            <div className="rounded-lg bg-slate-50 p-3 text-sm" style={{ color: textColor, fontSize: previewStyles.fontSize, fontWeight: previewStyles.fontWeight }}>
                                Sample value
                            </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-600" style={{ border: `1px solid ${borderColor}` }}>
                                styled tag
                            </span>
                            <span className="rounded-full bg-[rgba(37,99,235,0.08)] px-2.5 py-1 text-[11px] text-blue-700">
                                accent tag
                            </span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default StylePanel;
