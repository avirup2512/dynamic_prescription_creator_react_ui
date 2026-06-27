import { useState } from "react";
import type { SectionItem } from "../../type/TemplateStructure";
import DragHandle from "./DragHandle";
import ChevronToggle from "./ChevronToggle";
import IconBox from "./IconBox";
import StatusDot from "./StatusDot";
import RowBlock from "./RowBlock";
import FieldsBadge from "./FieldsBadge";
import { Ellipsis, Eye, EyeOff, Layers, Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionMenu from "./SectionMenu";
import { useDispatch } from "react-redux";
import { SelectTemplateSection } from "../../store/TemplateSlice";
import AddSectionButton from "./AddSectionButton";
import AddRowButton from "./AddButton";
import AddButton from "./AddButton";
import { useBuilder } from "../../context/BuilderContext";

const SectionRow: React.FC<{ section: SectionItem; indent?: number, index: number, sectionType: string }> = ({
    section,
    indent = 0,
    index,
    sectionType
}) => {
    const {
        openEditor,
        closeEditor,
        editorType,
    } = useBuilder();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const hasChildren = !!section.children?.length;
    const selectSection = () => {
        const payload = { sectionType, sectionIndex: index }
        console.log(payload)
        dispatch(SelectTemplateSection(payload));
    }
    const openSectionEditor = () => {
        openEditor("section", section.section_id as string)
    }
    return (
        <div>
            <div onClick={() => { selectSection() }}
                className={`group cursor-pointer flex items-center gap-2 py-2 pr-3 ${section.selected
                    ? "border-l-[3px] border-blue-600 bg-blue-50/70 pl-[5px]"
                    : "border-l-[3px] border-transparent pl-[5px] hover:bg-slate-50"
                    }`}
            >
                <div style={{ paddingLeft: indent * 24 }} className="flex items-center gap-2 flex-1 min-w-0">
                    <DragHandle />
                    {hasChildren ? (
                        <ChevronToggle open={open} onClick={(e: any) => { e.stopPropagation(), setOpen((o) => !o) }} />
                    ) : (
                        <span className="w-5 shrink-0" />
                    )}
                    <Layers className="h-4 w-4 text-slate-400 shrink-0" strokeWidth={2} />
                    {/* {
                        section.icon && <IconBox
                            icon={section.icon}
                            className={`${section.iconBg} ${section.iconColor}`}
                        />
                    } */}
                    <span
                        className={`text-sm truncate ${section.selected
                            ? "font-semibold text-slate-900"
                            : "font-medium text-slate-800"
                            }`}
                    >
                        {section?.label || "Section " + (index + 1) + ""}
                    </span>

                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <SectionMenu onShowHide={() => { }} OnEditSection={openSectionEditor} />
                </div>
            </div>
            {open && hasChildren && (
                <div>
                    {section.children!.map((row: any, index: number) => (
                        <RowBlock key={row.id} index={index} row={row} indent={indent + 1} />
                    ))}
                    <AddButton type="row" />
                </div>
            )}
        </div>
    );
};

export default SectionRow;