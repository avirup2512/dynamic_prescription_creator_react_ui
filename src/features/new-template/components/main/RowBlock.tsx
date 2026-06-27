import { useState } from "react";
import type { ColumnData } from "../../type/TemplateStructure";
import ColumnBlock from "./ColumnBlock";
import ColumnCountSelector from "./ColumnCountSelector";
import PillLabel from "./PillLabel";
import type { ColumnCount } from "../../type/ComponentType";
import { cn } from "@/lib/utils";

const RowBlock: React.FC<{
    rowIndex: number,
    sectionIndex: number,
    rowLabel: string;
    columns: ColumnData[];
    userHover: boolean;
    onAddField: (columnId: string) => void;
    onRemoveField: (columnId: string) => void;
}> = ({ rowIndex, sectionIndex, rowLabel, columns, userHover, onAddField, onRemoveField }) => {
    const [columnCount, setColumnCount] = useState<ColumnCount>(1);

    const handleColumnCountChange = (n: ColumnCount) => {
        setColumnCount(n);
        // setColumns((prev) => makeColumns(n, prev));
    };
    return (
        <div className={
            cn("relative rounded-xl bg-white/60 p-4 border border-transparent transition-colors duration-200",
                userHover && "border border-dashed border-blue-500"
            )
        } >
            <div className="absolute -top-3 left-4">
                <PillLabel>{rowLabel}</PillLabel>
            </div>
            <div className="mt-2 flex flex-col gap-4 sm:flex-row">
                {columns.map((col, columnIndex: number) => (
                    <ColumnBlock
                        key={columnIndex + Date.now()}
                        userHover={userHover}
                        columnIndex={columnIndex}
                        rowIndex={rowIndex}
                        sectionIndex={sectionIndex}
                        column={col}
                        onAddField={() => onAddField(col.id)}
                        onRemoveField={() => onRemoveField(col.id)}
                    />
                ))}
            </div>
            <ColumnCountSelector value={columnCount} onChange={handleColumnCountChange} />
        </div>
    )
};
export default RowBlock;