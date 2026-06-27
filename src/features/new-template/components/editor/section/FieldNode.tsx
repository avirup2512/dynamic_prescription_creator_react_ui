import { memo } from "react";
import {
    GripVertical,
    MoreHorizontal,
    Copy,
    Trash2,
    Type,
    Calendar,
    ChevronDownSquare,
    Hash,
    CheckSquare,
    CircleDot,
    ToggleLeft,
    FileText,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Input } from "./types";

interface FieldNodeProps {
    field: Input;

    selectedId?: string;

    onSelect(id: string): void;

    onDuplicate?(id: string): void;

    onDelete?(id: string): void;
}

const iconMap: Record<string, React.ElementType> = {
    INPUT_TYPE_1: Type,
    INPUT_TYPE_2: ChevronDownSquare,
    INPUT_TYPE_3: Calendar,
    INPUT_TYPE_4: Hash,
    INPUT_TYPE_5: CheckSquare,
    INPUT_TYPE_6: CircleDot,
    INPUT_TYPE_7: ToggleLeft,
};

const FieldNode = memo(function FieldNode({
    field,
    selectedId,
    onSelect,
    onDuplicate,
    onDelete,
}: FieldNodeProps) {
    const Icon = iconMap[field.input_type_name] ?? FileText;

    const selected = selectedId === field.input_id;

    return (
        <div
            onClick={() => onSelect(field.input_id)}
            className={cn(
                "group relative flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 transition-all duration-200",

                selected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-transparent hover:border-border hover:bg-muted/40"
            )}
        >
            {/* Selection Bar */}

            {selected && (
                <div className="absolute left-0 top-1 bottom-1 w-1 rounded-r-full bg-primary" />
            )}

            {/* Drag */}

            <GripVertical
                className="
            h-4
            w-4
            text-muted-foreground
            opacity-0
            transition-opacity
            group-hover:opacity-100
        "
            />

            {/* Type Icon */}

            <div
                className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-md
            bg-muted
        "
            >
                <Icon className="h-4 w-4 text-muted-foreground" />
            </div>

            {/* Content */}

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                    {field.input_entity_name || field.input_name}
                </p>

                <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>
                        {field.input_type_name.replace("INPUT_TYPE_", "")}
                    </span>

                    {field.show_label === 1 && (
                        <>
                            <span>•</span>
                            <span>Label</span>
                        </>
                    )}

                    {field.show_quantity === 1 && (
                        <>
                            <span>•</span>
                            <span>Quantity</span>
                        </>
                    )}

                    {field.extra_note === 1 && (
                        <>
                            <span>•</span>
                            <span>Note</span>
                        </>
                    )}
                </div>
            </div>

            {/* Font */}

            {field.is_bold === 1 && (
                <span
                    className="
            rounded-md
            bg-muted
            px-2
            py-0.5
            text-[10px]
            font-semibold
          "
                >
                    B
                </span>
            )}

            {/* Menu */}

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="
                h-8
                w-8
                opacity-0
                transition-opacity
                group-hover:opacity-100
            "
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() => onDuplicate?.(field.input_id)}
                    >
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDelete?.(field.input_id)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
});
export default FieldNode;