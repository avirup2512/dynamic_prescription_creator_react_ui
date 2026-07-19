import { ChevronDown, ChevronRight, List, Plus, X } from "lucide-react";
import { useState } from "react";
import Tag from "./Tag";

const MetadataFooter: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [tags, setTags] = useState<string[]>(["Post-MI", "Outpatient", "Standard"]);
    const [newTag, setNewTag] = useState("");
    const [showInput, setShowInput] = useState(false);

    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag("");
            setShowInput(false);
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleAddTag();
        }
    };

    return (
        <div className="px-0 pt-2.5">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-1.5 py-1 px-1 text-slate-800 hover:bg-slate-50 rounded-sm transition-colors"
            >
                {open ? (
                    <ChevronDown className="h-3.5 w-3.5 text-slate-400" strokeWidth={2} />
                ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400" strokeWidth={2} />
                )}
                <List className="h-3.5 w-3.5 text-slate-500" strokeWidth={2} />
                <span className="text-[11px] font-semibold tracking-tight text-slate-900">
                    Template metadata
                </span>
            </button>

            {open && (
                <div className="mt-1.5 space-y-2.5">
                    {/* <div>
                        <p className="mb-1.5 text-[11px] text-slate-400">Specialty</p>
                        <Tag label="Cardiology" variant="specialty" />
                    </div> */}
                    <div>
                        <p className="mb-1 text-[10px] font-medium text-slate-500 uppercase tracking-wider">Tags</p>
                        {tags.length === 0 ? (
                            <div className="flex items-center justify-between px-3 py-4 border border-dashed border-slate-200 rounded-md bg-slate-50">
                                <div className="flex-1">
                                    <p className="text-[12px] text-slate-500">No tags added yet</p>
                                    <p className="text-[11px] text-slate-400 mt-0.5">Click the plus button to add tags for this template</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowInput(true)}
                                    className="flex items-center justify-center h-7 w-7 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex-shrink-0 ml-2"
                                    title="Add tag"
                                >
                                    <Plus className="h-4 w-4" strokeWidth={2} />
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="flex flex-wrap gap-1.5">
                                    {tags.map((tag) => (
                                        <div key={tag} className="relative group">
                                            <Tag label={tag} />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(tag)}
                                                className="absolute -top-1.5 -right-1.5 bg-red-500 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Remove tag"
                                            >
                                                <X className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {!showInput && (
                                    <button
                                        type="button"
                                        onClick={() => setShowInput(true)}
                                        className="flex items-center gap-1 px-2 py-1.5 text-slate-600 hover:text-blue-500 transition-colors text-[12px] font-medium hover:bg-slate-50 rounded-md"
                                    >
                                        <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                                        Add tag
                                    </button>
                                )}
                            </div>
                        )}
                        {showInput && (
                            <div className="flex gap-1.5 mt-2">
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter tag name..."
                                    autoFocus
                                    className="flex-1 px-2 py-1.5 text-[12px] border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTag}
                                    className="flex items-center gap-1 px-2 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-[12px] font-medium"
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowInput(false);
                                        setNewTag("");
                                    }}
                                    className="flex items-center gap-1 px-2 py-1.5 text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors text-[12px] font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
export default MetadataFooter;
