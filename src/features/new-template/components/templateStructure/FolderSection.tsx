import { useEffect, useState } from "react";
import type { FolderGroup } from "../../type/TemplateStructure";
import { Folder, FolderOpen } from "lucide-react";
import ChevronToggle from "./ChevronToggle";
import SimpleFieldRow from "./SimpleFieldRow";
import SectionRow from "./SectionRow";
import AddButton from "./AddButton";
import { useBuilder } from "../../context/BuilderContext";

const FolderSection: React.FC<{ folder: FolderGroup, sectionType: string }> = ({ folder, sectionType }) => {
    const {
        openEditor,
    } = useBuilder();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        console.log(folder)
    }, [folder]);
    const AddNewSectionEditor = () => {
        openEditor(
            "section",
            ""
        )
    }
    return (
        <div className="rounded-md">
            <div className="group flex items-center justify-between gap-2 rounded-md px-1 py-1 hover:bg-slate-50">
                <div className="flex min-w-0 items-center gap-1">
                    <ChevronToggle open={open} onClick={() => setOpen((o) => !o)} />
                    <Folder className="h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={2} />
                    <span className="truncate text-[11.5px] font-semibold text-slate-800">
                        {folder?.label}
                    </span>
                </div>
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium leading-none text-slate-500">
                    {folder?.children?.length ?? 0}
                </span>
            </div>
            <>
                {
                    open && <>
                        {folder && folder?.children && folder.children.length ? (
                            <div className="ml-3 border-l border-slate-200/70 pl-1.5">
                                {folder?.children?.map((child, index: number) =>
                                    child.kind === "simpleField" ? (
                                        <SimpleFieldRow key={child.id} label={child.label} />
                                    ) : (
                                        <SectionRow key={child.id ?? child.section_id ?? index} index={index} sectionType={sectionType} section={child} />
                                    )
                                )}
                            </div>
                        ) :
                            <div className="mx-3 my-1 flex flex-col items-center justify-center rounded-md border border-dashed border-slate-200 bg-slate-50/60 py-3 text-center">
                                <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-md bg-white text-slate-300">
                                    <FolderOpen className="h-3.5 w-3.5" />
                                </div>
                                <p className="mb-0.5 text-[11px] font-medium text-slate-700">No section created</p>
                                <p className="text-[11px] text-slate-400">Create a section above to get started.</p>
                            </div>
                        }
                        <AddButton type="section" onAction={AddNewSectionEditor} />
                    </>
                }
            </>
        </div>
    );
};
export default FolderSection;
