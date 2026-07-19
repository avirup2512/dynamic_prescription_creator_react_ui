import { useEffect, useMemo, useState } from "react";
import { Eye, FileText, Hash, MessageSquareText, Plus } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import Section from "@/components/shared/StyleModule/reUsableComponents/Section";
import SearchableOptionSelect from "@/components/shared/SearchableOptionSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import type { ColumnInputItem } from "@/features/new-template/type/TemplateType";
import { INPUT_TYPE } from "@/constant/inputType.enum";
import SearchableOptionSelectForQuantity from "@/components/shared/SearchableOptionSelectForQuantity";

interface InputHeaderProps {
    input: ColumnInputItem;
    inputEntityId?: string;
    onFormDataChange?: (data: InputFormData) => void;
}

type QuantityMode = "single" | "range";

interface InputFormData {
    label: string;
    value: string;
    dropdownValue: string;
    quantityEnabled: boolean;
    quantityMode: QuantityMode;
    quantityId: string;
    quantityName: string;
    extraNoteEnabled: boolean;
    extraNoteValue: string;
    visible: boolean;
}

export default function InputHeader({
    input,
    inputEntityId,
    onFormDataChange,
}: InputHeaderProps) {
    const [inputLabel, setInputLabel] = useState<string>((input as any)?.input_name || (input as any)?.name || "Untitled")
    const [inputValue, setInputValue] = useState<any>((input as any)?.template_input_value || (input as any)?.value || "Untitled")
    const [currentInputType, setCurrentInputType] = useState<string>((input as any)?.input_type_name || (input as any)?.type || (input as any)?.type_name || "Untyped")
    const [showQuantity, setShowQuantity] = useState<boolean>(Boolean((input as any)?.show_quantity));
    const [quantityMode, setQuantityMode] = useState<QuantityMode>((input as any)?.template_quantity_type_single ? "single" : "range");
    const [openSections, setOpenSections] = useState<string[]>(["content"]);
    const [selectedQuantity, setSelectedQuantity] = useState((input as any)?.template_input_quantity_id || (input as any)?.quantity_id || "");
    const [selectedQuantityName, setSelectedQuantityName] = useState((input as any)?.template_quantity_name || (input as any)?.quantity_name || "");
    const [selectedExtraNote, setSelectedExtraNote] = useState<string>(String((input as any)?.template_input_extranotes ?? (input as any)?.extra_note ?? ""));
    const [showExtraNote, setShowExtraNote] = useState<boolean>(Boolean((input as any)?.extra_note));
    const [visible, setVisible] = useState<boolean>(Boolean((input as any)?.is_visible));
    const [selectedRelationshipValue, setSelectedRelationshipValue] = useState("");
    const [selectedDropdownValue, setSelectedDropdownValue] = useState<string>((input as any)?.template_input_value || (input as any)?.value || "");

    useEffect(() => {
        if ((input as any)?.input_name !== undefined) {
            setInputLabel((input as any).input_name || "Untitled")
        }
        if ((input as any)?.template_input_value !== undefined) {
            setInputValue((input as any).template_input_value)
        }
        if ((input as any)?.input_type_name !== undefined) {
            setCurrentInputType((input as any)?.input_type_name || "Untyped")
        }
        if ((input as any)?.show_quantity !== undefined) {
            setShowQuantity(Boolean((input as any)?.show_quantity))
        }
        if ((input as any)?.template_input_quantity_id !== undefined) {
            setSelectedQuantity((input as any)?.template_input_quantity_id)
        }
        if ((input as any)?.template_quantity_name !== undefined) {
            setSelectedQuantityName((input as any)?.template_quantity_name)
        }
        if ((input as any)?.template_quantity_type_single !== undefined) {
            setQuantityMode((input as any)?.template_quantity_type_single ? "single" : "range")
        }
        if ((input as any)?.extra_note !== undefined) {
            setShowExtraNote(Boolean((input as any)?.extra_note))
        }
        if ((input as any)?.template_input_extranotes !== undefined) {
            setSelectedExtraNote(String((input as any)?.template_input_extranotes ?? ""))
        }
        if ((input as any)?.is_visible !== undefined) {
            setVisible(Boolean((input as any)?.is_visible))
        }
        if ((input as any)?.template_input_value !== undefined) {
            setSelectedDropdownValue((input as any)?.template_input_value || (input as any)?.value || "")
        }
    }, [input])

    const formData = useMemo<InputFormData>(() => ({
        label: inputLabel,
        value: inputValue,
        dropdownValue: selectedDropdownValue,
        quantityEnabled: showQuantity,
        quantityMode,
        quantityId: selectedQuantity,
        quantityName: selectedQuantityName,
        extraNoteEnabled: showExtraNote,
        extraNoteValue: selectedExtraNote,
        visible,
    }), [inputLabel, inputValue, selectedDropdownValue, showQuantity, quantityMode, selectedQuantity, selectedQuantityName, showExtraNote, selectedExtraNote, visible]);

    useEffect(() => {
        onFormDataChange?.(formData);
    }, [formData, onFormDataChange]);

    return (
        <div className="bg-white">
            <Accordion.Root
                type="multiple"
                value={openSections}
                onValueChange={(value) => setOpenSections(value as string[])}
            >
                <Section value="content" icon={<FileText size={12} />} title="Content">
                    <div className="space-y-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="input-label" className="text-[11px] font-semibold tracking-wide text-slate-600">
                                Label Input
                            </Label>
                            <Input
                                id="input-label"
                                value={inputLabel}
                                onChange={(event) => setInputLabel(event.target.value)}
                                placeholder="Enter label"
                            />
                        </div>
                        {
                            currentInputType && currentInputType !== INPUT_TYPE.INPUTTYPE_2 &&
                            <div className="space-y-1.5">
                                <Label htmlFor="input-value" className="text-[11px] font-semibold tracking-wide text-slate-600">
                                    Value Input
                                </Label>
                                <Input
                                    id="input-value"
                                    value={inputValue}
                                    onChange={(event) => setInputValue(event.target.value)}
                                    placeholder="Enter value"
                                />
                            </div>
                        }
                        {
                            currentInputType && currentInputType == INPUT_TYPE.INPUTTYPE_2 &&
                            <div className="space-y-1.5">
                                <Label className="text-[11px] font-semibold tracking-wide text-slate-600">
                                    Dropdown
                                </Label>
                                <SearchableOptionSelect
                                    value={selectedDropdownValue}
                                    input_entity_id={inputEntityId}
                                    placeholder="Select option"
                                    searchPlaceholder="Search option..."
                                    emptyMessage="No options found."
                                    onChange={(option: any) => setSelectedDropdownValue(option?.value || option?.label || "")}
                                />
                            </div>
                        }
                    </div>
                </Section>

                <div className="px-3 pb-2 m-3">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-center rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Different Input
                    </Button>
                </div>

                <Section value="quantity" icon={<Hash size={12} />} title="Quantity">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2.5">
                            <div className="space-y-0.5">
                                <p className="text-[11px] font-semibold text-slate-700">Quantity Toggle</p>
                                <p className="text-[11px] text-slate-500">Enable quantity controls for this field.</p>
                            </div>
                            <Switch checked={Boolean(showQuantity)} onCheckedChange={(value) => setShowQuantity(Boolean(value))} />
                        </div>

                        <div className={cn("overflow-hidden transition-all duration-200", Boolean(showQuantity) ? "max-h-56 opacity-100" : "max-h-0 opacity-0")}>
                            <div className="space-y-2 pt-2">
                                <ToggleGroup
                                    type="single"
                                    value={quantityMode}
                                    onValueChange={(value) => value && setQuantityMode(value as QuantityMode)}
                                    className="grid w-full grid-cols-2 rounded-lg border border-slate-200 bg-slate-50 p-[3px]"
                                >
                                    <ToggleGroupItem
                                        value="single"
                                        className="justify-center rounded-[6px] px-2 py-1.5 text-[11px] font-medium leading-none data-[state=on]:bg-white data-[state=on]:text-slate-900 data-[state=on]:shadow-sm"
                                    >
                                        Single
                                    </ToggleGroupItem>
                                    <ToggleGroupItem
                                        value="range"
                                        className="justify-center rounded-[6px] px-2 py-1.5 text-[11px] font-medium leading-none data-[state=on]:bg-white data-[state=on]:text-slate-900 data-[state=on]:shadow-sm"
                                    >
                                        Range
                                    </ToggleGroupItem>
                                </ToggleGroup>
                                <div className="space-y-1.5">
                                    <Label className="text-[11px] font-semibold tracking-wide text-slate-600">
                                        Dropdown
                                    </Label>
                                    <SearchableOptionSelectForQuantity
                                        quantity_id={selectedQuantity}
                                        quantity_name={selectedQuantityName}
                                        placeholder="Select option"
                                        searchPlaceholder="Search option..."
                                        emptyMessage="No options found."
                                        onChange={(option: any) => {
                                            setSelectedQuantity(option?.id || "");
                                            setSelectedQuantityName(option?.name || "");
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                <Section value="relationship" icon={<MessageSquareText size={12} />} title="Relationship with Previous">
                    <div className="space-y-1.5">
                        <Label className="text-[11px] font-semibold tracking-wide text-slate-600">
                            Dropdown
                        </Label>
                        <SearchableOptionSelect
                            value={selectedRelationshipValue}
                            input_entity_id={inputEntityId}
                            placeholder="Select relationship"
                            searchPlaceholder="Search relationship..."
                            emptyMessage="No relationships found."
                            onChange={(option: any) => setSelectedRelationshipValue(option?.value || option?.label || "")}
                        />
                    </div>
                </Section>

                <Section value="extra-note" icon={<FileText size={12} />} title="Extra Note">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2.5">
                            <div className="space-y-0.5">
                                <p className="text-[11px] font-semibold text-slate-700">Enable extra note</p>
                                <p className="text-[11px] text-slate-500">Show a multiline note for this field.</p>
                            </div>
                            <Switch checked={Boolean(showExtraNote)} onCheckedChange={(value) => setShowExtraNote(Boolean(value))} />
                        </div>

                        <div className={cn("overflow-hidden transition-all duration-200", Boolean(showExtraNote) ? "max-h-56 opacity-100" : "max-h-0 opacity-0")}>
                            <div className="space-y-2 pt-2">
                                <div className="space-y-1.5">
                                    <Label className="text-[11px] font-semibold tracking-wide text-slate-600">
                                        Note
                                    </Label>
                                    <Textarea
                                        value={selectedExtraNote}
                                        onChange={(event) => setSelectedExtraNote(event.target.value)}
                                        rows={4}
                                        placeholder="Add an extra note"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                <Section
                    value="visibility"
                    icon={<Eye size={12} />}
                    title="Visibility"
                    inline={<Switch checked={Boolean(visible)} onCheckedChange={(value) => setVisible(Boolean(value))} />}
                />
            </Accordion.Root>
        </div >
    );
}
