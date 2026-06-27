// SectionEditor.tsx

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Field, Row } from "@/features/new-template/type/ComponentType";
import { Pencil, Section, X } from "lucide-react";
import { useEffect, useState } from "react";
import TabNavigation from "../TabNavigation";
import SectionHeader from "./SectionHeader";
import FieldsList from "../FieldsList";
import RowsColumnsSection from "./RowsColumnsSection";
import ActionButtons from "./ActionButtons";
import { useBuilder } from "@/features/new-template/context/BuilderContext";
import SectionService from "@/features/section/service/SectionService";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentSection } from "@/features/section/store/SectionSlice";
import RowNode from "./RowNode";

export default function SectionEditor({ closeEditor }: any) {
    const SectionState = useSelector((state: any) => state.section);
    const sectionService = SectionService;
    const dispatch = useDispatch();
    const { selectedId } = useBuilder();
    const isEditMode = Boolean(selectedId);
    useEffect(() => {
        if (selectedId && isEditMode) {
            getSectionDetailsById(selectedId)
        } else {
            dispatch(SetCurrentSection(SectionState?.defaultSection));
        }
    }, [selectedId, isEditMode]);
    const getSectionDetailsById = async (id: any) => {
        try {
            const fetchedSectionDetails = await sectionService.getSectionById(id);
            if (fetchedSectionDetails && fetchedSectionDetails.success) {
                dispatch(SetCurrentSection(fetchedSectionDetails?.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
    const [activeTab, setActiveTab] = useState<string>('Content');
    const [sectionName, setSectionName] = useState<string>('Patient Information');
    const [description, setDescription] = useState<string>('No Description');
    const [fields, setFields] = useState<Field[]>([
        { id: 1, name: 'Full Name', type: 'Text', required: true },
        { id: 2, name: 'Date of Birth', type: 'Date', required: true },
        { id: 3, name: 'Sex', type: 'Dropdown', required: true },
        { id: 4, name: 'MRN', type: 'Text', required: false },
        { id: 5, name: 'Phone', type: 'Tel', required: true },
        { id: 6, name: 'Email', type: 'Email', required: false },
    ]);
    const [rows, setRows] = useState<Row[]>([
        { id: 1, name: 'Full Name' },
        { id: 2, name: 'Date of Birth' },
        { id: 3, name: 'Sex' },
        { id: 4, name: 'MRN' },
        { id: 5, name: 'Phone' },
        { id: 6, name: 'Email' },
    ]);

    const handleDeleteField = (fieldId: number): void => {
        setFields(fields.filter((f) => f.id !== fieldId));
    };

    const handleDeleteRow = (rowId: number): void => {
        setRows(rows.filter((r) => r.id !== rowId));
    };

    const handleAddColumn = (rowId: number): void => {
        alert(`Add column to row: ${rows.find((r) => r.id === rowId)?.name}`);
    };

    const handleCancel = (): void => {
        alert('Changes canceled');
    };

    const handleSave = (): void => {
        alert('Changes saved');
        console.log({ sectionName, description, fields, rows });
    };

    return (
        <div className="w-96 bg-white flex flex-col h-screen border-l border-gray-200 shadow-xl">
            {/* ===== HEADER ===== */}
            <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                        {/* Avatar */}
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-lg">
                                <Section />
                            </span>
                        </div>
                        {/* Title & Subtitle */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-semibold text-gray-900">
                                    {SectionState?.currentSection?.name}
                                </h3>
                                {/* <Pencil size={14} className="text-gray-400 flex-shrink-0" /> */}
                            </div>
                            <p className="text-xs text-gray-500">Section • {SectionState?.currentSection?.rows?.length} rows • 6 fields</p>
                        </div>
                    </div>
                    {/* Close Button */}
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0">
                        <X size={20} className="text-gray-600" onClick={() => { closeEditor && closeEditor() }} />
                    </button>
                </div>
            </div>

            {/* ===== TABS ===== */}
            <div className="flex-shrink-0">
                <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* ===== SCROLLABLE CONTENT ===== */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {activeTab === 'Content' && (
                    <>
                        <SectionHeader
                            sectionName={SectionState?.currentSection?.name}
                            setSectionName={setSectionName}
                            description={SectionState?.currentSection?.description}
                            setDescription={setDescription}
                        />
                        {
                            SectionState?.currentSection && SectionState.currentSection?.rows && SectionState.currentSection.rows?.map((row: any, rowIndex: number) => {
                                return (
                                    <>
                                        <RowNode
                                            key={row.id} row={row}
                                        />
                                    </>
                                )
                            })
                        }
                        {/* <RowsColumnsSection
                            rows={rows}
                            onDeleteRow={handleDeleteRow}
                            onAddColumn={handleAddColumn}
                        /> */}
                    </>
                )}

                {activeTab === 'Layout' && (
                    <div className="text-center py-12 text-gray-400">
                        <p className="text-sm">Layout settings</p>
                    </div>
                )}

                {activeTab === 'Style' && (
                    <div className="text-center py-12 text-gray-400">
                        <p className="text-sm">Style settings</p>
                    </div>
                )}

                {activeTab === 'Validation' && (
                    <div className="text-center py-12 text-gray-400">
                        <p className="text-sm">Validation settings</p>
                    </div>
                )}

                {activeTab === 'Logic' && (
                    <div className="text-center py-12 text-gray-400">
                        <p className="text-sm">Logic settings</p>
                    </div>
                )}
            </div>

            {/* ===== FOOTER ===== */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex-shrink-0">
                <p className="text-xs text-gray-500 mb-3">
                    Last edited by Dr. Patel • 2m ago
                </p>
                <ActionButtons onCancel={handleCancel} onSave={handleSave} />
            </div>
        </div>
    );
}