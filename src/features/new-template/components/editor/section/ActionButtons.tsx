import type { ActionButtonsProps } from "@/features/new-template/type/ComponentType";
import type { FC } from "react";

const ActionButtons: FC<ActionButtonsProps> = ({ onCancel, onSave }) => {
    return (
        <div className="flex gap-3 pt-3 border-t border-gray-200">
            <button
                onClick={onCancel}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
                Cancel
            </button>
            <button
                onClick={onSave}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
                Save Changes
                <span className="text-xs">⌘ S</span>
            </button>
        </div>
    );
};
export default ActionButtons