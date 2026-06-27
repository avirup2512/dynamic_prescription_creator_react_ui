import type { FC } from "react";
import type { Field, FieldItemProps } from "../../type/ComponentType";
import { Calendar, ChevronDown, Eye, GripVertical, Mail, Phone, Settings, Trash2, Type } from "lucide-react";

const FieldItem: FC<FieldItemProps> = ({ field, onDelete }) => {
    const getFieldIcon = (type: Field["type"]) => {
        const iconProps = { size: 14, className: "text-slate-500" };
        switch (type) {
            case "Text":
                return <Type {...iconProps} />;
            case "Date":
                return <Calendar {...iconProps} />;
            case "Dropdown":
                return <ChevronDown {...iconProps} />;
            case "Tel":
                return <Phone {...iconProps} />;
            case "Email":
                return <Mail {...iconProps} />;
            default:
                return <Type {...iconProps} />;
        }
    };

    return (
        <div className="group flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1.5 transition-colors hover:bg-slate-50">
            <GripVertical size={14} className="shrink-0 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-100">
                {getFieldIcon(field.type)}
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                    <span className="truncate text-[12px] font-medium text-slate-900">{field.name}</span>
                    {field.required && <span className="text-[12px] text-red-500">*</span>}
                </div>
            </div>

            <div className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium leading-none text-slate-500">
                {field.type}
            </div>

            <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                <button className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
                    <Settings size={14} />
                </button>
                <button className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
                    <Eye size={14} />
                </button>
                <button
                    onClick={() => onDelete(field.id)}
                    className="rounded p-1 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
};

export default FieldItem;
