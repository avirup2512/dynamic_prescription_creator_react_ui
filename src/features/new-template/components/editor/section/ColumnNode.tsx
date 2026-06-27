import { memo, useMemo, useState } from "react";

import type { ColumnInputItem } from "@/features/section/type/SectionType";
import NodeHeader from "./NodeHeader";
import FieldItem from "./FieldItem";
import AddFieldButton from "./AddFieldButton";


interface ColumnNodeProps {
    column: {
        id?: string;
        column_id?: string;
        name?: string;
        column_name?: string;
        inputGroup?: Array<{ inputs?: ColumnInputItem[] }>;
    };
}

const ColumnNode = memo(function ColumnNode({
    column
}: ColumnNodeProps) {
    const [open, setOpen] = useState(false);

    const fields = useMemo<ColumnInputItem[]>(() => {
        return column.inputGroup ? column.inputGroup.flatMap((group) => group.inputs ?? []) : [];
    }, [column]);

    return (
        <>
            <NodeHeader
                accent="col" open={open}
                onToggle={() => { setOpen(!open) }}
                name={column.name ?? column.column_name ?? "Column"}
                onRename={() => { }}
                onDelete={() => { }}
                meta={`${fields.length} field`}
            />
            {open && (
                <div className="space-y-1 border-t border-slate-100 bg-white p-1.5">
                    {column?.inputGroup && column.inputGroup.map((inputGroup, inputGroupIndex) => (
                        inputGroup?.inputs && inputGroup.inputs.map((input) => (
                            <FieldItem
                                key={input.input_id ?? input.id ?? inputGroupIndex} field={input}
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
