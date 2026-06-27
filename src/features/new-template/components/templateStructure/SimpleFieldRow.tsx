import { TypeIcon } from "lucide-react";
import DragHandle from "./DragHandle";
import PlainIcon from "./PlainIcon";

const SimpleFieldRow: React.FC<{ label: string; indent?: number }> = ({
    label,
    indent = 0,
}) => (
    <div
        className="flex items-center gap-2.5 py-2"
        style={{ paddingLeft: 8 + indent * 24 }}
    >
        <DragHandle />
        <PlainIcon icon={TypeIcon} />
        <span className="text-sm text-slate-700">{label}</span>
    </div>
);

export default SimpleFieldRow;