import { Button } from "@/components/ui/button";
import {
    Copy,
    Trash2,
} from "lucide-react";
import SectionEditor from "./section/SectionEditor";

interface Props {
    type: string;
    data: any;
}

export default function EditorHeader({
    type,
    data,
}: Props) {
    return (
        <div
            className="
        border-b
        p-5
      "
        >
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="font-semibold text-lg">
                        {data?.label ||
                            data?.name ||
                            "Editor"}
                    </h2>

                    <p className="text-sm text-muted-foreground capitalize">
                        {type}
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button
                        size="icon"
                        variant="outline"
                    >
                        <Copy className="h-4 w-4" />
                    </Button>

                    <Button
                        size="icon"
                        variant="destructive"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            {
                type === "section" && <SectionEditor />
            }
        </div>
    );
}