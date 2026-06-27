import type { SectionHeaderProps } from "@/features/new-template/type/ComponentType";
import { Shield } from "lucide-react";
import type { FC } from "react";

const SectionHeader: FC<SectionHeaderProps> = ({
    sectionName,
    setSectionName,
    description,
    setDescription,
}) => {
    return (
        <div className="space-y-3  bg-white p-3">
            <div>
                <label className="mb-1.5 block text-[11px] font-semibold tracking-wide text-slate-600">
                    Section Name
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={sectionName}
                        onChange={(e) => setSectionName(e.target.value)}
                        className="h-8 w-full rounded-md border border-slate-200 bg-white px-2.5 pr-8 text-[12px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <Shield size={14} />
                    </div>
                </div>
            </div>

            <div>
                <label className="mb-1.5 block text-[11px] font-semibold tracking-wide text-slate-600">
                    Description
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full resize-none rounded-md border border-slate-200 bg-white px-2.5 py-2 text-[12px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
            </div>
        </div>
    );
};
export default SectionHeader;
