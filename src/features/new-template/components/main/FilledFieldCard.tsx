import { Settings, Trash2 } from "lucide-react";
import type { LeafFieldData } from "../../type/TemplateStructure";
import type { ColumnInputItem } from "../../type/TemplateType";
import { cn } from "@/lib/utils";

const FilledFieldCard: React.FC<{
    field: ColumnInputItem;
    userHover: boolean;
    onRemove: () => void;
}> = ({ field, userHover, onRemove }) => (
    <div className=
        {
            cn("rounded-lg bg-white p-3.5 mt-4 border border-transparent transition-colors duration-200",
                userHover && "border-dashed border-blue-500"
            )
        }>
        <div className="mb-2 flex items-center justify-between">
            <span className="text-[13.5px] font-medium text-slate-800">{field.input_entity_name}</span>
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    aria-label={`Settings for ${field.input_entity_name}`}
                    className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                    <Settings className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
                <button
                    type="button"
                    aria-label={`Remove ${field.input_entity_name}`}
                    onClick={onRemove}
                    className="flex h-6 w-6 items-center justify-center rounded-md text-rose-500 hover:bg-rose-50"
                >
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
            </div>
        </div>
        <span className="text-[13.5px] font-medium text-slate-800">{field?.input_entity_value}</span>
        {/* <input
            value={field?.input_entity_value}
            type="text"
            disabled
            placeholder={field?.placeholder}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-400 placeholder:text-slate-400"
        /> */}
    </div>
);
export default FilledFieldCard;