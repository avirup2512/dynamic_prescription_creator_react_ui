// FieldCard.tsx

import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBuilder } from "../../context/BuilderContext";
interface Props {
    field: {
        id: string;
        label: string;
        type: string;
    };
}

export default function FieldCard({
    field,
}: Props) {
    const { openEditor } = useBuilder();
    return (
        <div
            className="
        flex
        items-center
        justify-between
        rounded-md
        border
        p-2
      "
        >
            <div>
                <div className="text-sm font-medium">
                    {field.label}
                </div>

                <div className="text-xs text-muted-foreground">
                    {field.type}
                </div>
            </div>

            <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                    openEditor(
                        "section",
                        "section_1"
                    )
                }
            >
                <Settings2 className="h-4 w-4" />
            </Button>
        </div>
    );
}