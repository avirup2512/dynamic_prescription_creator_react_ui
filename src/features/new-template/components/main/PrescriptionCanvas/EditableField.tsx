import { useState, useEffect, useMemo } from "react";
import { Check, GripVertical, Palette, Pencil, Settings, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { CanvasInput, CanvasMode } from "./prescriptionCanvasTypes";
import { useSelector } from "react-redux";
import { selectInputStyle, DEFAULT_STYLE } from "@/features/new-template/store/TemplateStyleSlice";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { ColumnInputItem } from "@/features/new-template/type/TemplateType";

interface EditableFieldProps {
    input: ColumnInputItem;
    mode: CanvasMode;
    selected: boolean;
    onSelect: () => void;
    onSettings?: () => void;
    onQuickStyle?: () => void;
    onValueChanges?: (value: string) => void;
    onLabelChanges?: (value: string) => void;
    onStatusChange?: (value: any) => void;
    sectionId: string;
    rowId: string;
    columnId: string;
}

export default function EditableField({ input, mode, selected, onSelect, onSettings, onQuickStyle, onStatusChange, onValueChanges, onLabelChanges, sectionId, rowId, columnId }: EditableFieldProps) {
    const [editing, setEditing] = useState((input?.status && input?.status == "draft") ? true : false)
    // Fetch style from store for this input; stable fallback to DEFAULT_STYLE
    const reduxStyle = useSelector((state: any) => selectInputStyle(state.templateStyle, input?.template_input_id));
    const style = useMemo(() => reduxStyle || { ...DEFAULT_STYLE, template_input_id: input?.template_input_id || "" }, [reduxStyle, input?.template_input_id]);
    console.log(style)
    const toPx = (v: any) => (v === undefined || v === null ? undefined : typeof v === "number" ? `${v}px` : String(v));
    const hasBorder = style.border_width !== undefined && style.border_width !== null && style.border_width !== "";
    const containerStyle: React.CSSProperties = {
        backgroundColor: style.background_color || undefined,
        // borderWidth: hasBorder ? toPx(style.border_width) : undefined,
        borderWidth: 0,
        borderColor: hasBorder ? (style.border_color || undefined) : undefined,
        borderStyle: hasBorder ? "solid" : undefined,
        borderRadius: style.border_radius ? toPx(style.border_radius) : undefined,
        paddingTop: toPx(style.padding_top),
        paddingRight: toPx(style.padding_right),
        paddingBottom: toPx(style.padding_bottom),
        paddingLeft: toPx(style.padding_left),
        width: style.width || undefined,
        height: style.height || undefined,
    };
    const textStyle: React.CSSProperties = {
        fontFamily: style.font_family || undefined,
        fontSize: style.font_size ? (typeof style.font_size === "number" ? `${style.font_size}px` : String(style.font_size)) : undefined,
        fontWeight: style.font_weight as any || undefined,
        fontStyle: style.font_style || undefined,
        textDecoration: style.text_decoration || undefined,
        color: style.text_color || undefined,
        textAlign: style.text_align as any || undefined,
        lineHeight: style.line_height ? String(style.line_height) : undefined,
        letterSpacing: style.letter_spacing ? String(style.letter_spacing) : undefined,
    };
    // const isMultiline = value?.includes("\n") || value?.length > 72;
    const [debounceQuery, setDebounceQuery] = useState(input.value || input?.template_input_value || input?.input_entity_value);
    const [debounceQueryForLabel, setDebounceQueryForLabel] = useState(input.name || input.input_name);
    useEffect(() => {
        if (debounceQuery) {
            const timeout = setTimeout(() => {
                onValueChanges?.(debounceQuery);
            }, 500); // or 300–500ms
            return () => clearTimeout(timeout);
        }
    }, [debounceQuery])
    useEffect(() => {
        if (debounceQueryForLabel !== null) {
            const timeout = setTimeout(() => {
                onLabelChanges?.(debounceQueryForLabel)
            }, 500); // or 300–500ms
            return () => clearTimeout(timeout);
        }
    }, [debounceQueryForLabel])
    const save = () => {
        const payload = { status: "active", label: debounceQueryForLabel, value: debounceQuery };
        onStatusChange?.(payload);
        setEditing(false);
    }

    const cancel = () => {
        // setDraft({ label: input.label, value: input.value });
        // onChange(field.id, { editing: false });
        setEditing(false);
    };
    if (editing) {
        return (
            <div className="group relative rounded-xl border border-primary/40 bg-background p-3 ring-2 ring-primary/10">
                <div className="space-y-2">
                    <div>
                        <Label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            Label
                        </Label>
                        <Input
                            autoFocus
                            value={debounceQueryForLabel}
                            onChange={(event) => { setDebounceQueryForLabel?.(event.target.value) }}
                            placeholder="Enter label"
                            className="h-8 text-sm"
                        />
                    </div>
                    <div>
                        <Label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            Value
                        </Label>
                        <Textarea
                            value={debounceQuery}
                            onChange={(event) => { setDebounceQuery?.(event.target.value) }}
                            placeholder="Enter value"
                            rows={2}
                            className="min-h-[56px] resize-none text-sm"
                        />
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-end gap-1.5">
                    <Button size="sm" variant="ghost" onClick={cancel} className="h-7 gap-1 px-2 text-xs">
                        <X className="h-3.5 w-3.5" /> Cancel
                    </Button>
                    <Button size="sm" onClick={save} className="h-7 gap-1 px-2.5 text-xs">
                        <Check className="h-3.5 w-3.5" /> Save
                    </Button>
                </div>
            </div>
        );
    }
    return (
        <div
            className={cn(
                "group/field relative",
                mode === "edit" && "transition",
                mode === "edit" && selected && "ring-1 ring-sky-200"
            )}
            style={containerStyle}
            onClick={onSelect}
        >
            {mode === "edit" && (
                <></>
            )}
            {
                mode === "preview" ? (
                    <>
                        {
                            debounceQueryForLabel && input?.showLabel &&
                            <p style={textStyle}>
                                {debounceQueryForLabel || " "}
                            </p>
                        }
                        <p style={textStyle}>
                            {debounceQuery || " "}
                        </p>
                    </>

                ) : <>
                    <div className="group relative flex items-start gap-2 rounded-md border border-border bg-background p-2 transition-colors hover:border-primary/30 hover:bg-accent/30">
                        {/* <button
                            type="button"
                            aria-label="Drag"
                            className="mt-0.5 cursor-grab text-muted-foreground/40 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                            <GripVertical className="h-4 w-4" />
                        </button> */}

                        <div className="min-w-0 flex-1">
                            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                                {debounceQueryForLabel || "Untitled"}
                            </div>
                            <div className="mt-0.5 truncate text-sm text-foreground">
                                {debounceQuery || <span className="text-muted-foreground/60">—</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                            {/* <IconBtn label="Edit" onClick={() => onChange(field.id, { editing: true })}> */}
                            {/* </IconBtn> */}
                            <button
                                type="button"
                                aria-label={debounceQueryForLabel}
                                onClick={() => { setEditing(true) }}
                                className={cn(
                                    "inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors",
                                )}
                            >
                                <Pencil className="h-3.5 w-3.5" />
                            </button>
                            {/* <button
                                    type="button"
                                    aria-label={debounceQueryForLabel}
                                    // onClick={onClick}
                                    className={cn(
                                        "inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:bg-destructive/10 hover:text-destructive",
                                    )}
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button> */}
                            {/* <IconBtn label="Remove" tone="danger" onClick={() => onRemove(field.id)}>
                                
                            </IconBtn> */}
                        </div>
                    </div>
                </>
            }
        </div >
    );
}