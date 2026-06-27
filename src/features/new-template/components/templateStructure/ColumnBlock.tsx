import { useState } from "react";
import type { ColumnData, InputGroupData } from "../../type/TemplateStructure";
import ChevronToggle from "./ChevronToggle";
import PlainIcon from "./PlainIcon";
import LeafFieldRow from "./LeafFieldRow";
import InputGroupBlock from "./InputgroupBlock";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import AddButton from "./AddButton";

const ColumnBlock: React.FC<{ col: ColumnData; indent: number, index: number }> = ({
    col,
    indent,
    index
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div
                className="flex items-center justify-between gap-2 py-1.5"
                style={{ paddingLeft: 8 + indent * 24 }}
            >
                <div className="flex items-center justify-between gap-2">
                    <ChevronToggle open={open} onClick={() => setOpen((o) => !o)} />
                    {col?.icon && <PlainIcon icon={col.icon} />}
                    <span className="text-sm text-slate-700">{col?.label || "Column " + (index + 1) + ""}</span>
                </div>
                <div className="flex items-center justify-ends">
                    <Button
                        size="icon"
                        type="button"
                        variant="ghost"
                        className="flex items-center justify-center border-none border-slate-200 text-slate-500 hover:bg-white"
                    >
                        <Trash2 className="size-3.5 text-red-600" />
                    </Button>
                </div>
            </div>
            {open && (
                <div>
                    {col?.inputGroup?.map((inputGroup: any, index: any) => (
                        <InputGroupBlock key={index + Date.now()} inputGroup={inputGroup} indent={indent} />
                    ))}
                    <AddButton type="field" />
                </div>
            )}
        </div>
    );
};
export default ColumnBlock;
