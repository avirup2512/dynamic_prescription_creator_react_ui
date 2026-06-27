import { cn } from "@/lib/utils";
import type { ColumnData } from "../../type/TemplateStructure";
import AddFieldLink from "./AddFieldLink";
import EmptyColumnState from "./EmptyColumnState";
import FilledFieldCard from "./FilledFieldCard";
import PillLabel from "./PillLabel";

const ColumnBlock: React.FC<{
    columnIndex: number,
    rowIndex: number,
    sectionIndex: number,
    column: ColumnData;
    userHover: boolean;
    onAddField: () => void;
    onRemoveField: () => void;
}> = ({ columnIndex, rowIndex, sectionIndex, column, userHover, onAddField, onRemoveField }) => (
    <div className={
        cn("flex flex-1 flex-col transition-all duration-200 ease-in-out bg-slate-50/60 p-3",
            userHover ? "border border-dashed border-blue-500" : 'border-transparent'
        )
    }
    >
        {/* <PillLabel>{userHover && (column.label ? column.label : "Column")}</PillLabel> */}
        <div className="mt-2 flex flex-1 flex-col">
            {column.inputGroup ? (
                column.inputGroup.map((inputGroup: any, inputIndex: number) => {
                    return (
                        <>
                            {
                                inputGroup?.inputs && inputGroup?.inputs.map((input: any, index: number) => {
                                    return (
                                        <>
                                            <FilledFieldCard userHover={userHover} field={input} onRemove={onRemoveField} />
                                        </>
                                    )
                                })
                            }
                        </>
                    )
                })

            ) : (
                <EmptyColumnState onAddField={onAddField} />
            )}
            <AddFieldLink onClick={onAddField} />
        </div>
    </div>
);
export default ColumnBlock;