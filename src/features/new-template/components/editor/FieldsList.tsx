import { Plus } from "lucide-react";
import FieldItem from "./FieldItem";
import type { FieldsListProps } from "../../type/ComponentType";
import type { FC } from "react";

const FieldsList: FC<FieldsListProps> = ({ fields, onDeleteField }) => {
    return (
        <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-700 block tracking-wide">
                FIELDS
            </label>

            <div className="space-y-2">
                {fields.map((field) => (
                    <FieldItem key={field.id} field={field} onDelete={onDeleteField} />
                ))}
            </div>

            {/* <div className="flex gap-2 pt-1">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <Plus size={16} />
                    Add Field
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Add from library
                </button>
            </div> */}
        </div>
    );
};

export default FieldsList