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
    data: any;
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
        <div className="p-5">
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
                            <AccordionTrigger>
                                {section}
                            </AccordionTrigger>

                            <AccordionContent>
                                <div className="space-y-4">
                                    {(fields as any[]).map(
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