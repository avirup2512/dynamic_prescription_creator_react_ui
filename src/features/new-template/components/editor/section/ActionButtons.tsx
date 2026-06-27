import type { ActionButtonsProps } from "@/features/new-template/type/ComponentType";
import type { FC } from "react";

const ActionButtons: FC<ActionButtonsProps> = ({ onCancel, onSave }) => {
    return (
        <div className="flex gap-2">
            <button
                onClick={onCancel}
                className="h-8 flex-1 rounded-md border border-slate-200 bg-white px-3 text-[12px] font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
                Cancel
            </button>
            <button
                onClick={onSave}
                className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md bg-blue-600 px-3 text-[12px] font-medium text-white transition-colors hover:bg-blue-700"
            >
                Save
                <span className="rounded bg-white/15 px-1 text-[10px]">Ctrl S</span>
            </button>
        </div>
    );
};

export default ActionButtons;
