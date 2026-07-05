import { useEffect, useState } from "react";
import type { FolderGroup } from "../../type/TemplateStructure";
import { Folder, FolderOpen } from "lucide-react";
import ChevronToggle from "./ChevronToggle";
import SimpleFieldRow from "./SimpleFieldRow";
import SectionRow from "./SectionRow";
import AddButton from "./AddButton";
import { useBuilder } from "../../context/BuilderContext";
import { useNavigate, useParams } from "react-router-dom";
import TemplateService from "../../service/TemplateService";
import { useDispatch, useSelector } from "react-redux";
import type { SectionTemplate } from "@/features/section/type/SectionType";
import { AddSectionTemplate } from "@/features/section/store/SectionSlice";
import { AppendSectionInTemplate } from "../../store/TemplateSlice";
import type { Section } from "../../type/TemplateType";
import { v4 as uuid } from "uuid"
import SectionService from "@/features/section/service/SectionService";

const FolderSection: React.FC<{ folder: any, sectionType: string }> = ({ folder, sectionType }) => {
    const templateService = TemplateService;
    const sectionService = SectionService;
    const TemplateState = useSelector((state: any) => state.template);
    const navigate = useNavigate();
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(folder)
    }, [folder]);
    const AddNewSectionEditor = async () => {
        try {
            const is_header = sectionType === "header" ? 1 : 0;
            const is_body = sectionType === "body" ? 1 : 0;
            const is_footer = sectionType === "footer" ? 1 : 0;
            const section: any = {
                id: uuid(),
                name: 'Untitled-Section' + TemplateState?.CurrentTemplate?.[sectionType].length + 1,
                section_order: TemplateState?.CurrentTemplate?.[sectionType].length + 1,
                isVisible: true,
                rows: [
                    {
                        id: uuid(),
                        name: "Row" + 1,
                        row_order: 0,
                        columns: [{
                            id: uuid(),
                            name: "Column" + 1,
                            width: '12',
                            column_order: 1,
                            inputGroup: [
                                {
                                    id: uuid(),
                                    input_group_order: 1,
                                    inputs: []
                                }
                            ]
                        }]
                    }
                ]
            }
            const createdSection = await sectionService.createSection({ data: section });
            if (createdSection?.success) {
                const templateSection: Section = {
                    template_section_id: uuid(),
                    name: 'Untitled-Section' + TemplateState?.CurrentTemplate?.[sectionType].length + 1,
                    section_order: TemplateState?.CurrentTemplate?.[sectionType].length + 1,
                    isVisible: true,
                    section_id: createdSection?.data?.id,
                    rows: [
                        {
                            template_row_id: uuid(),
                            name: "Row" + 1,
                            row_order: 1,
                            columns: [{
                                template_column_id: uuid(),
                                name: "Column" + 1,
                                width: '12',
                                column_order: 1,
                                inputGroup: [
                                    {
                                        template_input_group_id: uuid(),
                                        input_group_order: 1,
                                        inputs: []
                                    }
                                ]
                            }]
                        }
                    ]
                }
                const payload = JSON.parse(JSON.stringify(TemplateState?.CurrentTemplate));
                payload?.[sectionType].push(templateSection);
                const createdTemplateSection = await templateService.updateTemplate(id as string, { data: payload });
                if (createdTemplateSection?.success) {
                    dispatch(AppendSectionInTemplate({ section: templateSection, sectionType }));
                }
            }
            // if (createdSection && createdSection.success) {
            //     const section: Section = {
            //         id: createdSection?.data?.templateSection?.id,
            //         name: createdSection?.data?.section?.name,
            //         order: createdSection?.data?.section?.section_order,
            //         rows: [
            //             {
            //                 id: createdSection?.data?.templateRow?.id,
            //                 name: createdSection?.data?.row?.name,
            //                 order: createdSection?.data?.row?.row_order,
            //                 columns: [{
            //                     id: createdSection?.data?.templateColumn?.id,
            //                     name: createdSection?.data?.column?.name,
            //                     order: createdSection?.data?.column?.column_order,
            //                     width: createdSection?.data?.column?.width,
            //                     inputGroup: [{
            //                         id: createdSection?.data?.templateInputGroup?.id,
            //                         order: createdSection?.data?.inputGroup?.input_group_order,
            //                         inputs: []
            //                     }]
            //                 }]
            //             }
            //         ],
            //         isVisible: createdSection?.data?.templateSection?.is_visible,
            //     }
            //     console.log(TemplateState?.CurrentTemplate)
            //     dispatch(AppendSectionInTemplate({ section, sectionType }));
            //     navigate(`/dashboard/new-template/edit/${id}/section/${createdSection?.data?.templateSection?.id}/${sectionType}`);
            // }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="rounded-md">
            <div className="group flex items-center justify-between gap-2 rounded-md px-1 py-1 hover:bg-slate-50">
                <div className="flex min-w-0 items-center gap-1">
                    <ChevronToggle open={open} onClick={() => setOpen((o) => !o)} />
                    <Folder className="h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={2} />
                    <span className="truncate text-[11.5px] font-semibold text-slate-800">
                        {sectionType.toUpperCase()}
                    </span>
                </div>
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium leading-none text-slate-500">
                    {folder?.length ?? 0}
                </span>
            </div>
            <>
                {
                    open && <>
                        {folder && folder.length ? (
                            <div className="ml-3 border-l border-slate-200/70 pl-1.5">
                                {folder?.map((child, index: number) =>
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
