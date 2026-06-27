import type { FC } from "react";
import type { Field, FieldItemProps } from "../../type/ComponentType";
import { Calendar, ChevronDown, Eye, GripVertical, Mail, Phone, Settings, Trash2, Type } from "lucide-react";

const FieldItem: FC<FieldItemProps> = ({ field, onDelete }) => {
    const getFieldIcon = (type: Field['type']) => {
        const iconProps = { size: 16, className: 'text-gray-600' };
        switch (type) {
            case 'Text':
                return <Type {...iconProps} />;
            case 'Date':
                return <Calendar {...iconProps} />;
            case 'Dropdown':
                return <ChevronDown {...iconProps} />;
            case 'Tel':
                return <Phone {...iconProps} />;
            case 'Email':
                return <Mail {...iconProps} />;
            default:
                return <Type {...iconProps} />;
        }
    };

    return (
        <div className="flex items-center gap-3 py-2.5 px-3 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
            {/* Drag Handle */}
            <GripVertical size={16} className="text-gray-400 flex-shrink-0" />

            {/* Field Icon */}
            <div className="flex-shrink-0">{getFieldIcon(field.type)}</div>

            {/* Field Name & Required indicator */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-900">{field.name}</span>
                    {field.required && <span className="text-red-500 text-sm">•</span>}
                </div>
            </div>

            {/* Field Type */}
            <div className="text-xs text-gray-600 font-medium bg-gray-50 px-2 py-1 rounded flex-shrink-0">
                {field.type}
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-1 flex-shrink-0">
                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-500 hover:text-gray-700">
                    <Settings size={16} />
                </button>
                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-500 hover:text-gray-700">
                    <Eye size={16} />
                </button>
                <button
                    onClick={() => onDelete(field.id)}
                    className="p-1.5 hover:bg-red-100 rounded transition-colors text-gray-500 hover:text-red-600"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};
export default FieldItem;