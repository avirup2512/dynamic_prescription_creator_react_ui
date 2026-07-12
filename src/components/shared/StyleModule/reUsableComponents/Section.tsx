import * as Accordion from "@radix-ui/react-accordion";
import SectionTitle from "./SectionTitle";
import { ChevronDown, ChevronLeft } from "lucide-react";
function cx(...cs: (string | false | null | undefined)[]) {
    return cs.filter(Boolean).join(" ");
}
const Section = function ({
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
        <Accordion.Item value={value} className="border-b border-slate-200 last:border-none">
            <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center gap-1.5 px-3 h-[34px] hover:bg-slate-50 transition-colors">
                    <span className="text-slate-400 shrink-0">{icon}</span>
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
                                "text-slate-400 transition-transform duration-150 group-data-[state=open]:rotate-180",
                                inline ? "" : "ml-auto",
                            )}
                        />
                    )}
                    {children === undefined && !inline && (
                        <ChevronLeft size={11} className="ml-auto text-slate-400" />
                    )}
                </Accordion.Trigger>
            </Accordion.Header>
            {children !== undefined && (
                <Accordion.Content className="overflow-hidden" style={{ willChange: 'height' }}>
                    <div className="px-3 pt-0.5 pb-2.5 space-y-[6px]">{children}</div>
                </Accordion.Content>
            )}
        </Accordion.Item>
    );
}
export default Section;