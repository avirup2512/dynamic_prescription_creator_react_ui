import { ChevronDown, ChevronRight, List } from "lucide-react";
import { useState } from "react";
import Tag from "./Tag";

const MetadataFooter: React.FC = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="px-1 pt-3">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-1.5 py-1.5 text-slate-800"
            >
                {open ? (
                    <ChevronDown className="h-3.5 w-3.5 text-slate-400" strokeWidth={2} />
                ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400" strokeWidth={2} />
                )}
                <List className="h-3.5 w-3.5 text-slate-500" strokeWidth={2} />
                <span className="text-[12px] font-semibold text-slate-900">
                    Template metadata
                </span>
            </button>

            <div className="mt-2 space-y-3">
                <div>
                    <p className="mb-1.5 text-[11px] text-slate-400">Specialty</p>
                    <Tag label="Cardiology" variant="specialty" />
                </div>
                <div>
                    <p className="mb-1.5 text-[11px] text-slate-400">Tags</p>
                    <div className="flex flex-wrap gap-1.5">
                        <Tag label="Post-MI" />
                        <Tag label="Outpatient" />
                        <Tag label="Standard" />
                        <Tag label="+2" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MetadataFooter;
