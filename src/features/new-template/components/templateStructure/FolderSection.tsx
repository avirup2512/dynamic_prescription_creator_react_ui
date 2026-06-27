import { useEffect, useState } from "react";
import type { FolderGroup } from "../../type/TemplateStructure";
import { Folder, FolderOpen, Layers, Plus } from "lucide-react";
import ChevronToggle from "./ChevronToggle";
import SimpleFieldRow from "./SimpleFieldRow";
import SectionRow from "./SectionRow";
import { Button } from "@/components/ui/button";
import AddButton from "./AddButton";
import { useDispatch } from "react-redux";
import { useBuilder } from "../../context/BuilderContext";

const FolderSection: React.FC<{ folder: FolderGroup, sectionType: string }> = ({ folder, sectionType }) => {
    const dispatch = useDispatch();
    const {
        openEditor,
        closeEditor,
        editorType,
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
        <div className="mb-1">
            <div className="flex items-center justify-between gap-2.5 py-2">
                <div className="flex items-center justify-between gap-2">
                    <ChevronToggle open={open} onClick={() => setOpen((o) => !o)} />
                    <Folder className="h-4 w-4 text-slate-400" strokeWidth={2} />
                    <span className="text-[15px] font-semibold text-slate-900">
                        {folder?.label}
                    </span>
                </div>
                {/* <span className="ml-auto rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                    {folder?.count}
                </span> */}
                <div className="flex items-center justify-ends">
                    {/* <Button
                        size="icon"
                        type="button"
                        variant="ghost"
                        className="gap-2 mt-0"
                    >
                        <Plus className="size-4" />
                    </Button> */}
                </div>
            </div>
            <>
                {
                    open && <>
                        {folder && folder?.children && folder.children.length ? (
                            <div className="ml-1 border-l border-slate-100 pl-2">
                                {folder?.children?.map((child: any, index: number) =>
                                    child.kind === "simpleField" ? (
                                        <SimpleFieldRow key={child.id} label={child.label} />
                                    ) : (
                                        <SectionRow key={index + Date.now()} index={index} sectionType={sectionType} section={child} />
                                    )
                                )}
                            </div>
                        ) :
                            <div className="flex flex-col items-center justify-center py-2 text-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted mb-2">
                                    <FolderOpen className="h-4 w-4 text-muted-foreground/50" />
                                </div>
                                <p className="text-xs font-medium text-foreground mb-0.5">No section created</p>
                                <p className="text-[11px] text-muted-foreground">Create a section above to get started.</p>
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