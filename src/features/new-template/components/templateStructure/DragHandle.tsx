import { GripVertical } from "lucide-react";

const DragHandle: React.FC = () => (
    <GripVertical className="h-3.5 w-3.5 shrink-0 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={2} />
);

export default DragHandle;
