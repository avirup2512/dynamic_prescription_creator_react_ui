import { memo, useMemo, useState } from "react";
import {
    ChevronDown,
    ChevronRight,
    GripVertical,
    LayoutPanelTop,
    MoreHorizontal,
    Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

import FieldNode from "./FieldNode";
import type { Column, ColumnInputItem } from "@/features/section/type/SectionType";
import NodeHeader from "./NodeHeader";
import FieldItem from "./FieldItem";
import AddFieldButton from "./AddFieldButton";
// import type { Column, Input } from "./types";


const ColumnNode = memo(function ColumnNode({
    column
}: any) {
    const [open, setOpen] = useState(false);

    const fields = useMemo<ColumnInputItem[]>(() => {
        return column.inputGroup ? column.inputGroup.flatMap((group: any) => group.inputs) : [];
    }, [column]);

    return (
        <>
            <NodeHeader
                accent="col" open={open}
                onToggle={() => { setOpen(!open) }}
                name={column.name}
                onRename={() => { }}
                onDelete={() => { }}
                meta={`${fields.length} field`}
            />
            {open && (
                <div className="space-y-1 p-2">
                    {column?.inputGroup && column.inputGroup.map((inputGroup: any, inputGroupIndex: number) => (
                        inputGroup?.inputs && inputGroup.inputs.map((input: any, inputIndex: number) => (
                            <FieldItem
                                key={input.id} field={input}
                                onRename={() => { }}
                                onDelete={() => { }}
                            />
                        ))

                    ))}
                    <AddFieldButton onAdd={() => { }} />
                </div>
            )}
        </>
    );
});

export default ColumnNode;