import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Props {

    title: string;

    children: ReactNode;

    defaultOpen?: boolean;

}

export default function SectionCard({

    title,

    children,

    defaultOpen = true,

}: Props) {

    return (

        <Collapsible defaultOpen={defaultOpen}>

            <div className="rounded-lg border bg-card">

                <CollapsibleTrigger asChild>

                    <button
                        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold hover:bg-muted/40 transition"
                    >

                        {title}

                        <ChevronDown
                            className="h-4 w-4"
                        />

                    </button>

                </CollapsibleTrigger>

                <CollapsibleContent>

                    <div className="space-y-4 border-t p-4">

                        {children}

                    </div>

                </CollapsibleContent>

            </div>

        </Collapsible>

    );

}