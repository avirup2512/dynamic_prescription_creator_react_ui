// FieldEditor.tsx

import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

import GeneralEditor from "./field/GeneralEditor";
import StyleEditor from "./field/StyleEditor";
import LogicEditor from "./field/LogicEditor";

export default function FieldEditor() {
    return (
        <Accordion
            type="multiple"
            defaultValue={[
                "general",
                "style",
                "logic",
            ]}
        >
            <AccordionItem value="general">
                <AccordionTrigger>
                    General
                </AccordionTrigger>

                <AccordionContent>
                    <GeneralEditor />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="style">
                <AccordionTrigger>
                    Style
                </AccordionTrigger>

                <AccordionContent>
                    <StyleEditor />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="logic">
                <AccordionTrigger>
                    Logic
                </AccordionTrigger>

                <AccordionContent>
                    <LogicEditor />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}