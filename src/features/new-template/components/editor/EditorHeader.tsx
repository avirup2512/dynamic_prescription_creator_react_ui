import { Button } from "@/components/ui/button";
import {
    Copy,
    Trash2,
} from "lucide-react";
import SectionEditor from "./section/SectionEditor";

interface Props {
    type: string;
    data?: {
        label?: string;
        name?: string;
    };
}

export default function EditorHeader({
    type,
    data,
}: Props) {
    return (
        <div
            className="border-b border-slate-200 bg-white p-3"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h2 className="truncate text-[13px] font-semibold text-slate-900">
                        {data?.label ||
                            data?.name ||
                            "Editor"}
                    </h2>

                    <p className="mt-0.5 text-[11px] text-slate-500 capitalize">
                        {type}
                    </p>
                </div>

                <div className="flex gap-1.5">
                    <Button
                        size="icon-sm"
                        variant="outline"
                    >
                        <Copy className="h-3.5 w-3.5" />
                    </Button>

                    <Button
                        size="icon-sm"
                        variant="destructive"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>
            {
                type === "section" && <SectionEditor />
            }
        </div>
    );
}
