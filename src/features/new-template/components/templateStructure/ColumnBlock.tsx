import { useState } from "react";
import type { ColumnData } from "../../type/TemplateStructure";
import ChevronToggle from "./ChevronToggle";
import PlainIcon from "./PlainIcon";
import InputGroupBlock from "./InputgroupBlock";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
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
                className="group flex items-center justify-between gap-2 rounded-md py-1 pr-1 hover:bg-slate-50"
                style={{ paddingLeft: 6 + indent * 18 }}
            >
                <div className="flex min-w-0 items-center gap-1.5">
                    <ChevronToggle open={open} onClick={() => setOpen((o) => !o)} />
                    {col?.icon && <PlainIcon icon={col.icon} />}
                    <span className="truncate text-[11.5px] font-medium text-slate-700">{col?.label || "Column " + (index + 1) + ""}</span>
                </div>
                <div className="flex items-center justify-end opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                        size="icon-xs"
                        type="button"
                        variant="ghost"
                        className="flex items-center justify-center border-none text-slate-400 hover:bg-white hover:text-red-600"
                    >
                        <Trash2 className="size-3.5" />
                    </Button>
                </div>
            </div>
            {open && (
                <div>
                    {(col?.inputGroup as unknown[])?.map((inputGroup, index) => (
                        <InputGroupBlock
                            key={
                                (inputGroup as { template_input_group_id?: string; id?: string }).template_input_group_id ??
                                (inputGroup as { id?: string }).id ??
                                index
                            }
                            inputGroup={inputGroup as { inputs: unknown[] }}
                            indent={indent}
                        />
                    ))}
                    <AddButton type="field" />
                </div>
            )}
        </div>
    );
};
export default ColumnBlock;
