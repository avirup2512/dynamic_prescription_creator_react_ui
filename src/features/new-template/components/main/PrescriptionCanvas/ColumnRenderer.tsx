import { cn } from "@/lib/utils";
import type { CanvasColumn, CanvasMode, CanvasSelection } from "./prescriptionCanvasTypes";
import HoverToolbar from "./HoverToolbar";
import InputRenderer from "./InputRenderer";
import InsertPlaceholder from "./InsertPlaceholder";
import { useNavigate, useParams } from "react-router-dom";
import { CircleSlash, Copy, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { v4 as uuid } from "uuid"
import { useDispatch } from "react-redux";
import { AddInputTypeToTemplate, RemoveColumnToTemplateRow, AddInputGroupToTemplateColumn, RemoveInputGroupFromTemplate, AddOrInputGroupToTemplateColumn } from "@/features/new-template/store/TemplateSlice";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { setLastVisitedRoute } from "@/global_store/RouterSlice";

interface ColumnRendererProps {
    column: CanvasColumn;
    mode: CanvasMode;
    selection: CanvasSelection;
    columnIndex: number;
    onSelect: (selection: CanvasSelection) => void;
    sectionType: "header" | "body" | "footer";
    sectionId: string;
    rowId: string;
    columnLength?: number;
    onDeleteColumn?: (sectionId: string, rowId: string, columnId: string) => void;
    onHideColumn?: (sectionId: string, rowId: string, columnId: string) => void;
    onQuickStyleInput?: (sectionId: string, rowId: string, columnId: string, inputId: string) => void;
    onOpenFieldEditor?: (inputId: string) => void;
}

export default function ColumnRenderer({ column, mode, selection, columnLength, columnIndex, sectionType, onSelect, sectionId, rowId, onDeleteColumn, onHideColumn, onQuickStyleInput, onOpenFieldEditor }: ColumnRendererProps) {
    const dispatch = useDispatch();
    const location = useLocation();
    const columnLabel = `Column ${columnIndex + 1}`;
    const navigate = useNavigate();
    const { id } = useParams();
    if (column.isVisible === false) return null;
    console.log(column)
    const onAddField = (groupId: string) => {
        console.log("onAddField", sectionId, rowId, column.template_column_id);
        dispatch(setLastVisitedRoute(location.pathname))
        navigate(`/dashboard/new-template/edit/${id}/sectionType/input/${sectionId}/${rowId}/${column?.template_column_id}/${groupId}/${sectionType}/inputs/INPUT_TYPE_1`)
    }
    const onAddBlankTextField = (groupId: string) => {
        const input = {
            "template_input_id": uuid(),
            "name": "",
            "input_type_name": "INPUT_TYPE_7",
            "template_input_value": "",
            "status": "draft"
        }
        const payload = { sectionId, rowId, columnId: column?.template_column_id, input, inputGroupId: groupId, sameGroup: true, sectionType: sectionType ? sectionType : '' }
        dispatch(AddInputTypeToTemplate(payload));
    }
    const removeColumnFromRow = () => {
        const payload = { sectionId, rowId, columnId: column?.template_column_id, sectionType }
        dispatch(RemoveColumnToTemplateRow(payload))
    }
    const addInPutGroup = () => {
        const inputGroup = {
            "template_input_group_id": uuid(),
            "relation": "",
            "inputs": []
        }
        const payload = { sectionId, rowId, columnId: column?.template_column_id, inputGroup, sectionType }
        dispatch(AddInputGroupToTemplateColumn(payload))
    }
    const removeInputGroup = (groupId: string) => {
        const payload = { sectionId, rowId, columnId: column?.template_column_id, inputGroupId: groupId, sectionType }
        dispatch(RemoveInputGroupFromTemplate(payload))
    }
    const AddOrInputGroup = (group: any) => {
        dispatch(AddOrInputGroupToTemplateColumn({ sectionId, rowId, columnId: column?.template_column_id, inputGroup: group, sectionType }))
    }
    return (
        <div
            className={cn(
                "group/column relative min-w-0",
                mode === "edit" && "rounded-md border border-dashed border-slate-200/80 p-2 transition hover:border-sky-200 hover:bg-sky-50/10",
                mode === "edit" && selection.columnId === column.template_column_id && "border-sky-300 bg-sky-50/30"
            )}
            onClick={(event) => {
                event.stopPropagation();
                onSelect({ columnId: column.id });
            }}

        >
            {mode === "edit" ? (
                <div className="mb-2 flex items-center justify-between gap-1">
                    <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">{columnLabel}</p>
                    </div>
                    {/* <HoverToolbar
                        mode={mode}
                        label={columnLabel}
                        visible={mode === "edit"}
                        showSettings={false}
                        showDeleteIcon={false}
                        onDelete={onDeleteColumn ? () => onDeleteColumn(sectionId, rowId, column.id) : undefined}
                        quickActions={[
                            { label: "Copy column", icon: <Copy className="h-3.5 w-3.5" />, onClick: () => { } },
                            { label: "Hide column", disabled: true, icon: column?.isVisible === false ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />, onClick: () => { } },
                            { label: "Delete section", disabled: columnLength && columnLength > 1 ? false : true, icon: <Trash2 className="h-3.5 w-3.5" />, onClick: () => { removeColumnFromRow() } },
                        ]}
                        className="group-hover/column:flex"
                    /> */}
                    {/* {(columnLength && columnLength < 3) && <button
                        key={'action.label'}
                        type="button"
                        aria-label={'action.label'}
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                        className="flex h-7 w-7 items-center justify-center text-slate-500 hover:text-slate-700"
                    >
                        <Copy className="h-3.5 w-3.5" />
                    </button>} */}
                    {(columnLength && columnLength > 1) &&
                        <button
                            key={'action.label'}
                            type="button"
                            aria-label={'action.label'}
                            onClick={(event) => {
                                event.stopPropagation();
                                removeColumnFromRow()
                            }}
                            className="flex h-7 w-7 items-center justify-center text-slate-500 hover:text-slate-700"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </button>}
                </div>
            ) : null}
            <div className="space-y-2">
                {column?.inputGroup?.map((group: any, groupIndex: number) => (
                    <div key={group.id} className={
                        cn(
                            "space-y-2",
                            mode === "edit" && "space-y-2 rounded-md border border-dashed border-slate-200/80 p-2 transition hover:border-sky-200 hover:bg-sky-50/10"
                        )
                    }>
                        {
                            mode === "edit" &&
                            <>
                                {group.or_input_group_id !== null && groupIndex > 0 && mode === "edit" && (
                                    <div className="flex items-center gap-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300">
                                        <span className="h-px flex-1 bg-slate-100" />
                                        or
                                        <span className="h-px flex-1 bg-slate-100" />
                                    </div>
                                )}
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Group {groupIndex + 1}</p>
                                    <div className="flex justify-ends items-center gap-1">
                                        {
                                            group.or_input_group_id == null &&
                                            <>
                                                <button
                                                    key={'action.label'}
                                                    type="button"
                                                    aria-label={'action.label'}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        AddOrInputGroup(group)
                                                    }}
                                                    className="flex h-7 w-7 items-center justify-center text-slate-500 hover:text-slate-700"
                                                >
                                                    <CircleSlash className="h-3.5 w-3.5" />
                                                </button>
                                                <button
                                                    key={'action.label'}
                                                    type="button"
                                                    aria-label={'action.label'}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        addInPutGroup()
                                                    }}
                                                    className="flex h-7 w-7 items-center justify-center text-slate-500 hover:text-slate-700"
                                                >
                                                    <Plus className="h-3.5 w-3.5" />
                                                </button>
                                            </>
                                        }

                                        <button
                                            key={'action.label'}
                                            type="button"
                                            aria-label={'action.label'}
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                removeInputGroup(group.template_input_group_id)
                                            }}
                                            className="flex h-7 w-7 items-center justify-center text-slate-500 hover:text-slate-700"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        }


                        {group.inputs.map((input: any) => (
                            <InputRenderer
                                key={input.template_input_id}
                                input={input}
                                mode={mode}
                                sectionType={sectionType}
                                selection={selection}
                                onSelect={onSelect}
                                sectionId={sectionId}
                                rowId={rowId}
                                inputGroupId={group.template_input_group_id}
                                columnId={column.template_column_id}
                                onQuickStyleInput={onQuickStyleInput}
                                onOpenFieldEditor={onOpenFieldEditor}
                            />
                        ))}
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            <InsertPlaceholder mode={mode} label="Add Blank field" onClick={() => { onAddBlankTextField(group?.template_input_group_id) }} />
                            <InsertPlaceholder mode={mode} label="Add field from library" onClick={() => { onAddField(group?.template_input_group_id) }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
