import { useEffect, useMemo, useState } from "react";
import { Eye, FileText, Group, Hash, MessageSquareText, Notebook, Plus } from "lucide-react";
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
import type { ColumnInputItem, InputGroup } from "@/features/new-template/type/TemplateType";
import { INPUT_TYPE } from "@/constant/inputType.enum";
import SearchableOptionSelectForQuantity from "@/components/shared/SearchableOptionSelectForQuantity";

interface InputHeaderProps {
    inputGroup: InputGroup;
    inputEntityId?: string;
    hasPreviousInputGroup: boolean;
    onFormDataChange?: (data: InputFormData) => void;
}

type QuantityMode = "single" | "range";

interface InputFormData {
    label: string;
}

export default function InputGroupContent({
    inputGroup,
    inputEntityId,
    hasPreviousInputGroup,
    onFormDataChange,
}: InputHeaderProps) {
    // input_group_name
    const [inputGroupLabel, setInputGroupLabel] = useState<string>((inputGroup as any)?.input_group_name || "Untitled")
    const [openSections, setOpenSections] = useState<string[]>(["content"]);
    const [selectedRelationshipValue, setSelectedRelationshipValue] = useState((inputGroup as any)?.condition_with_previous_input_group_name);
    const [visible, setVisible] = useState<boolean>(Boolean((inputGroup as any)?.is_visible));

    useEffect(() => {
        if ((inputGroup as any)?.input_group_name !== undefined) {
            setInputGroupLabel((inputGroup as any).input_group_name || "Untitled")
        }
        if ((inputGroup as any)?.relationship !== undefined) {
            setSelectedRelationshipValue((inputGroup as any).relationship || "")
        }
        if ((inputGroup as any)?.is_visible !== undefined) {
            setVisible(Boolean((inputGroup as any)?.is_visible))
        }
        if ((inputGroup as any)?.condition_with_previous_input_group_name !== undefined) {
            setSelectedRelationshipValue((inputGroup as any).condition_with_previous_input_group_name || "")
        }
    }, [inputGroup])
    const formData = useMemo<InputFormData>(() => ({
        label: inputGroupLabel,
        visible,
        selectedRelationshipValue
    }), [inputGroupLabel, visible, selectedRelationshipValue]);

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
                                Label Input Group
                            </Label>
                            <Input
                                id="input-label"
                                value={inputGroupLabel}
                                onChange={(event) => setInputGroupLabel(event.target.value)}
                                placeholder="Enter label"
                            />
                        </div>
                    </div>
                </Section>

                <div className="px-3 pb-2 m-3">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-center rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Copy Input Group
                    </Button>
                </div>

                <Section value="relationship" icon={<MessageSquareText size={12} />} title="Relationship with Previous">
                    <div className="space-y-1.5">
                        {
                            hasPreviousInputGroup ?
                                <>
                                    <Label className="text-[11px] font-semibold tracking-wide text-slate-600">
                                        Dropdown
                                    </Label>
                                    <SearchableOptionSelect
                                        entityType="RELATIONSHIP"
                                        value={selectedRelationshipValue}
                                        placeholder="Select relationship"
                                        searchPlaceholder="Search relationship..."
                                        emptyMessage="No relationships found."
                                        onChange={(option: any) => setSelectedRelationshipValue(option?.value || option?.label || "")}
                                    />
                                </> : <div className="flex flex-col items-center justify-center py-4 text-center h-full rounded-md border border-dashed border-slate-200 bg-white shadow-[0_1px_1px_rgba(15,23,42,0.02)]">
                                    <p className="text-xs font-medium text-foreground mb-0.5">No Previous Group.</p>
                                    <p className="text-[11px] text-muted-foreground">Create an Input group before this.</p>
                                </div>
                        }

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
