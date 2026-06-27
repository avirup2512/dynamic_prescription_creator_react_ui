import { TypeIcon } from "lucide-react";
import DragHandle from "./DragHandle";
import PlainIcon from "./PlainIcon";

const SimpleFieldRow: React.FC<{ label: string; indent?: number }> = ({
    label,
    indent = 0,
}) => (
    <div
        className="flex items-center gap-1.5 rounded-md py-1 pr-1 hover:bg-slate-50"
        style={{ paddingLeft: 6 + indent * 18 }}
    >
        <DragHandle />
        <PlainIcon icon={TypeIcon} />
        <span className="truncate text-[11.5px] text-slate-700">{label}</span>
    </div>
);

export default SimpleFieldRow;
