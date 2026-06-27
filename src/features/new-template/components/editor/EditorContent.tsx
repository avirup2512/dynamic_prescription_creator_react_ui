import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

import PropertyField from "./PropertyField";

import { editorConfig } from "../../config/editorConfig";

interface Props {
    type: string;
    data: unknown;
}

interface EditorFieldConfig {
    type: "input" | "switch" | "select";
    label: string;
    value?: string;
    options?: string[];
}

export default function EditorContent({
    type,
}: Props) {
    const config =
        editorConfig[
        type as keyof typeof editorConfig
        ];

    if (!config) return null;

    return (
        <div className="p-3">
            <Accordion
                type="multiple"
                defaultValue={Object.keys(config)}
            >
                {Object.entries(config).map(
                    ([section, fields]) => (
                        <AccordionItem
                            key={section}
                            value={section}
                        >
                            <AccordionTrigger className="py-2 text-[12px] font-semibold text-slate-800">
                                {section}
                            </AccordionTrigger>

                            <AccordionContent>
                                <div className="space-y-3 pb-2">
                                    {(fields as EditorFieldConfig[]).map(
                                        (field) => (
                                            <PropertyField
                                                key={field.label}
                                                field={field}
                                            />
                                        )
                                    )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )
                )}
            </Accordion>
        </div>
    );
}
