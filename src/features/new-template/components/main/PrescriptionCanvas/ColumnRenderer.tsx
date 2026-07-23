import { cn } from "@/lib/utils";
import type { CanvasColumn, CanvasMode, CanvasSelection } from "./prescriptionCanvasTypes";
import HoverToolbar from "./HoverToolbar";
import InputRenderer from "./InputRenderer";
import InsertPlaceholder from "./InsertPlaceholder";
import { useNavigate, useParams } from "react-router-dom";
import { CircleSlash, Copy, Eye, EyeOff, FolderOpen, Plus, PlusCircleIcon, Settings, TextCursorInput, Trash2 } from "lucide-react";
import { v4 as uuid } from "uuid"
import { useDispatch } from "react-redux";
import { AddInputTypeToTemplate, RemoveColumnToTemplateRow, AddInputGroupToTemplateColumn, RemoveInputGroupFromTemplate, AddConditionInputGroupToTemplateColumn } from "@/features/new-template/store/TemplateSlice";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { setLastVisitedRoute } from "@/global_store/RouterSlice";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CONDITION_TYPE } from "@/constant/condition.enum";
import SearchableOptionSelect from "@/components/shared/SearchableOptionSelect";

export default function ColumnRenderer({ column, mode, selection, columnLength, columnIndex, sectionType, onSelect, sectionId, rowId, onDeleteColumn, onHideColumn, onQuickStyleInput, onOpenFieldEditor }: any) {
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
            input_group_name: 'Input Group',
            input_group_order: column?.inputGroup?.length ? column?.inputGroup?.length + 1 : 1,
            "inputs": [],
            previous_related_input_group_id: "",
            condition_with_previous_input_group_name: "",
            input_group_visibility: 1

        };
        console.log(inputGroup);
        const payload = { sectionId, rowId, columnId: column?.template_column_id, inputGroup, sectionType }
        dispatch(AddInputGroupToTemplateColumn(payload))
    }
    const removeInputGroup = (groupId: string) => {
        const payload = { sectionId, rowId, columnId: column?.template_column_id, inputGroupId: groupId, sectionType }
        dispatch(RemoveInputGroupFromTemplate(payload))
    }
    const AddConditionInputGroup = (group: any, conditionName: any) => {
        dispatch(AddConditionInputGroupToTemplateColumn({ sectionId, rowId, columnId: column?.template_column_id, inputGroup: group, sectionType, conditionName }))
    }
    const navigateToAddInput = (inputGroupId: string) => {
        dispatch(setLastVisitedRoute(location.pathname))
        navigate(`./addInput/${sectionId}/${rowId}/${column?.template_column_id}/${inputGroupId}/${sectionType}`);
    }
    const navigateToInputGroupEditor = (inputGroupId: string) => {
        dispatch(setLastVisitedRoute(location.pathname))
        navigate(`./inputGroupEdit/${sectionId}/${rowId}/${column?.template_column_id}/${inputGroupId}/${sectionType}`);
    }
    const setSelectedRelationshipValue = (inputGroupId: string, conditionName: string, inputGroupIndex: number) => {
        const basePayload = {
            sectionId,
            rowId,
            columnId: column?.template_column_id,
            inputGroupId,
            sectionType,
        };
        if (column.inputGroup && Array.isArray(column.inputGroup)) {
            const previousInputGroup = column.inputGroup[inputGroupIndex - 1];
            if (previousInputGroup)
                dispatch(AddConditionInputGroupToTemplateColumn({ ...basePayload, previousInputGroupId: previousInputGroup?.template_input_group_id, conditionName }))
        }

    }
    return (
        <div
            className={cn(
                "group/column relative min-w-0",
                mode === "edit" && "rounded-md border border-dashed border-slate-200/80 p-1.5 transition hover:border-sky-200 hover:bg-sky-50/10",
                mode === "edit" && selection.columnId === column.template_column_id && "border-sky-300 bg-sky-50/30"
            )}
            onClick={(event) => {
                event.stopPropagation();
                onSelect({ columnId: column.id });
            }}

        >
            {mode === "edit" ? (
                <div className="mb-1.5 flex items-center justify-between gap-1">
                    <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">{columnLabel}</p>
                    </div>
                    <button
                        key={'action.label'}
                        type="button"
                        aria-label={'action.label'}
                        onClick={(event) => {
                            event.stopPropagation();
                            addInPutGroup()
                        }}
                        className="flex h-6 w-6 items-center justify-center text-slate-500 hover:text-slate-700"
                    >
                        <Plus className="h-3.5 w-3.5" />
                    </button>
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
                    <div key={group.id}>
                        {
                            group.previous_related_input_group_id && groupIndex > 0 && mode === "edit" && (
                                <div className="relative my-4 flex items-center justify-center">

                                    <div className="absolute left-0 right-0 h-px bg-slate-200" />
                                    <SearchableOptionSelect
                                        isConnector={true}
                                        entityType="RELATIONSHIP"
                                        value={group.condition_with_previous_input_group_name}
                                        placeholder="Select relationship"
                                        searchPlaceholder="Search relationship..."
                                        emptyMessage="No relationships found."
                                        onChange={(option: any) => setSelectedRelationshipValue(group?.template_input_group_id, option?.value, groupIndex)} />
                                </div>
                            )
                        }
                        <div className={
                            cn(
                                "space-y-1.5",
                                mode === "edit" && "space-y-1.5 rounded-md border border-dashed border-slate-200/80 p-1.5 transition hover:border-sky-200 hover:bg-sky-50/10"
                            )
                        }>
                            {
                                mode === "edit" &&
                                <>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">{group?.input_group_name || 'Group' + groupIndex + 1} </p>
                                        <div className="flex justify-ends items-center gap-1">

                                            <button
                                                key={'action.label'}
                                                type="button"
                                                aria-label={'action.label'}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    navigateToInputGroupEditor(group?.template_input_group_id)
                                                }}
                                                className="flex h-6 w-6 items-center justify-center text-slate-500 hover:text-slate-700"
                                            >
                                                <Settings className="h-3.5 w-3.5" />
                                            </button>

                                            <button
                                                key={'action.label'}
                                                type="button"
                                                aria-label={'action.label'}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    removeInputGroup(group.template_input_group_id)
                                                }}
                                                className="flex h-6 w-6 items-center justify-center text-slate-500 hover:text-slate-700"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            }

                            {group.inputs.map((input: any, index: number) => (
                                <InputRenderer
                                    key={input.template_input_id}
                                    inputIndex={index}
                                    previousInputId={group.inputs[index - 1]?.template_input_id}
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
                            {
                                <>
                                    {
                                        group.inputs.length === 0 && mode === "edit" &&
                                        <div className="flex flex-col items-center justify-center py-4 text-center h-full rounded-md border border-dashed border-slate-200 bg-white shadow-[0_1px_1px_rgba(15,23,42,0.02)]">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted mb-2">
                                                <TextCursorInput className="h-4 w-4 text-muted-foreground/50" />
                                            </div>
                                            <p className="text-xs font-medium text-foreground mb-0.5">No Input selected</p>
                                            <p className="text-[11px] text-muted-foreground">Create Input to get started.</p>
                                        </div>
                                    }
                                </>
                            }
                            {/* <div className="mt-3 grid grid-cols-2 gap-2">
                                <InsertPlaceholder mode={mode} label="Add Blank field" onClick={() => { onAddBlankTextField(group?.template_input_group_id) }} />
                                <InsertPlaceholder mode={mode} label="Add field from library" onClick={() => { onAddField(group?.template_input_group_id) }} />
                            </div> */}
                            <div className="mt-2 flex flex-col gap-1.5 items-center justify-center">
                                <InsertPlaceholder mode={mode} label="Add input" onClick={() => { navigateToAddInput(group?.template_input_group_id) }} />
                                <InsertPlaceholder mode={mode} label="Add Related group" onClick={() => { navigateToAddInput(group?.template_input_group_id) }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}
