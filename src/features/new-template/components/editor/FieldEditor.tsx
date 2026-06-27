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
            className="rounded-md border border-slate-200 bg-white px-3"
            type="multiple"
            defaultValue={[
                "general",
                "style",
                "logic",
            ]}
        >
            <AccordionItem value="general">
                <AccordionTrigger className="py-2 text-[12px] font-semibold text-slate-800">
                    General
                </AccordionTrigger>

                <AccordionContent className="pb-3">
                    <GeneralEditor />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="style">
                <AccordionTrigger className="py-2 text-[12px] font-semibold text-slate-800">
                    Style
                </AccordionTrigger>

                <AccordionContent className="pb-3">
                    <StyleEditor />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="logic">
                <AccordionTrigger className="py-2 text-[12px] font-semibold text-slate-800">
                    Logic
                </AccordionTrigger>

                <AccordionContent className="pb-3">
                    <LogicEditor />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
