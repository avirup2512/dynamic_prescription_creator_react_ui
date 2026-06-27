import { useState } from "react";
import type { SectionItem } from "../../type/TemplateStructure";
import DragHandle from "./DragHandle";
import ChevronToggle from "./ChevronToggle";
import RowBlock from "./RowBlock";
import { Layers } from "lucide-react";
import SectionMenu from "./SectionMenu";
import { useDispatch } from "react-redux";
import { SelectTemplateSection } from "../../store/TemplateSlice";
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
                className={`group flex cursor-pointer items-center gap-1.5 rounded-r-md py-1 pr-1.5 transition-colors ${section.selected
                    ? "border-l-2 border-blue-500 bg-blue-50/70 pl-1"
                    : "border-l-2 border-transparent pl-1 hover:bg-slate-50"
                    }`}
            >
                <div style={{ paddingLeft: indent * 18 }} className="flex min-w-0 flex-1 items-center gap-1.5">
                    <DragHandle />
                    {hasChildren ? (
                        <ChevronToggle open={open} onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); setOpen((o) => !o) }} />
                    ) : (
                        <span className="w-5 shrink-0" />
                    )}
                    <Layers className="h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={2} />
                    {/* {
                        section.icon && <IconBox
                            icon={section.icon}
                            className={`${section.iconBg} ${section.iconColor}`}
                        />
                    } */}
                    <span
                        className={`truncate text-[12px] ${section.selected
                            ? "font-semibold text-slate-900"
                            : "font-medium text-slate-800"
                            }`}
                    >
                        {section?.label || "Section " + (index + 1) + ""}
                    </span>

                </div>
                <div className="flex shrink-0 items-center gap-1">
                    <SectionMenu onShowHide={() => { }} OnEditSection={openSectionEditor} />
                </div>
            </div>
            {open && hasChildren && (
                <div>
                    {section.children!.map((row, index) => (
                        <RowBlock key={row.id} index={index} row={row} indent={indent + 1} />
                    ))}
                    <AddButton type="row" />
                </div>
            )}
        </div>
    );
};

export default SectionRow;
