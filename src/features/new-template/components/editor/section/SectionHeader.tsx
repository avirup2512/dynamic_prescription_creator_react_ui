import type { SectionHeaderProps } from "@/features/new-template/type/ComponentType";
import { Shield } from "lucide-react";
import type { FC } from "react";

const SectionHeader: FC<SectionHeaderProps> = ({
    sectionName,
    setSectionName,
    description,
    setDescription,
}: any) => {
    return (
        <div className="space-y-4">
            <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2 tracking-wide">
                    Section Name
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={sectionName}
                        onChange={(e) => setSectionName(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="absolute right-3 top-2.5 text-gray-400">
                        <Shield size={18} />
                    </div>
                </div>
            </div>

            <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2 tracking-wide">
                    Description
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
            </div>
        </div>
    );
};
export default SectionHeader;