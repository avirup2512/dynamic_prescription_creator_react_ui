import { X } from "lucide-react";

const ModalHeader: React.FC<{
    title: string;
    subtitle: string;
    onClose: () => void;
}> = ({ title, subtitle, onClose }) => (
    <div className="flex items-start justify-between border-b border-slate-100 px-5 py-3">
        <div>
            <h2 className="text-[17px] font-bold text-slate-900">{title}</h2>
            <p className="mt-0.5 text-[12px] text-slate-400">{subtitle}</p>
        </div>
        <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
            <X className="h-4 w-4" strokeWidth={2} />
        </button>
    </div>
);
export default ModalHeader;
