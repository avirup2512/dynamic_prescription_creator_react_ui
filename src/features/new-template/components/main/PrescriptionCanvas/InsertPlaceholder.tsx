import { LibraryBig, Plus } from "lucide-react";

import type { CanvasMode } from "./prescriptionCanvasTypes";
import { Button } from "@/components/ui/button";

interface InsertPlaceholderProps {
    mode: CanvasMode;
    label: string;
    onClick?: () => void;
}

export default function InsertPlaceholder({ mode, label, onClick }: InsertPlaceholderProps) {
    if (mode === "preview") return null;

    return (
        <Button
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
            variant="outline"
            size="sm"
            className="h-8 justify-center gap-1.5 border-dashed text-xs font-medium text-primary hover:bg-primary/5 hover:text-primary"
        >
            {/* <LibraryBig className="h-3.5 w-3.5" /> */}
            <Plus className="h-3.5 w-3.5" />
            {label}
        </Button >
    );
}
