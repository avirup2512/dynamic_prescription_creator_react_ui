import type { ActionButtonsProps } from "@/features/new-template/type/ComponentType";
import type { FC } from "react";

const ActionButtons: FC<ActionButtonsProps> = ({ onCancel, onSave }) => {
    return (
        <div className="flex gap-1.5">
            <button
                type="button"
                onClick={onCancel}
                className="h-7 flex-1 rounded-md border border-slate-200 bg-white px-2.5 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
                Cancel
            </button>
            <button
                type="button"
                onClick={onSave}
                className="flex h-7 flex-1 items-center justify-center gap-1 rounded-md bg-blue-600 px-2.5 text-[11px] font-medium text-white transition-colors hover:bg-blue-700"
            >
                Save
                {/* <span className="rounded bg-white/15 px-1 py-0.5 text-[9px]">Ctrl S</span> */}
            </button>
        </div>
    );
};

export default ActionButtons;
