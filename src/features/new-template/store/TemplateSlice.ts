import { createSlice, current } from "@reduxjs/toolkit";
import { ChevronDown, FileText, Type } from "lucide-react";
import type { Template } from "../type/TemplateType";
import type { UpdateTemplateType } from "../type/TemplateType";
import { INPUT_TYPE } from "../../../constant/inputType.enum";
import { id } from "date-fns/locale";
import { v4 as uuid } from "uuid"
import { TEMPLATE_OPERATION } from "@/constant/template-operation.enum";
import { SectionTracker } from "../template-data-tracker/SectionTracker";
import { RowTracker } from "../template-data-tracker/RowTracker";
import { ColumnTracker } from "../template-data-tracker/ColumnTracker";
import { InputTracker } from "../template-data-tracker/InputTracker";
import { InputGroupTracker } from "../template-data-tracker/InputGroupTracker";
export const INPUT_TYPES = [
    { id: INPUT_TYPE.INPUTTYPE_1, name: "Input", color: "bg-blue-50 border-blue-200", icon: Type },
    { id: INPUT_TYPE.INPUTTYPE_2, name: "Dropdown", color: "bg-purple-50 border-purple-200", icon: ChevronDown },
    { id: INPUT_TYPE.INPUTTYPE_3, name: "Textbox", color: "bg-amber-50 border-amber-200", icon: FileText },
];

export const CurrentTemplate: Template = {
    id: "",
    name: "",
    show_header: true,
    show_body: true,
    show_footer: true,
    header: [],
    body: [],
    footer: [],
}
export const UpdatedTemplate: UpdateTemplateType = {
    UpdatedSections: [],
    UpdatedRows: [],
    UpdatedColumns: [],
    UpdatedInputGroups: [],
    UpdatedInputs: [],
}

const sectionTypes = ["header", "body", "footer"] as const;

function getTemplateSectionArray(currentTemplate: any, sectionType: "header" | "body" | "footer") {
    return currentTemplate?.[sectionType];
}

function recalculateSectionOrder(currentTemplate: any) {
    let section_order = 1;

    sectionTypes.forEach((sectionType) => {
        const sections = getTemplateSectionArray(currentTemplate, sectionType);
        if (!Array.isArray(sections)) return;

        currentTemplate[sectionType] = sections.map((section: any) => {
            if (!section) return section;

            const orderedSection = {
                ...section,
                section_order: section_order,
            };
            section_order += 1;
            return orderedSection;
        });
    });
}
function recalculateRowOrder(currentTemplate: any) {
    sectionTypes.forEach((sectionType) => {
        const sections = getTemplateSectionArray(currentTemplate, sectionType);
        if (!Array.isArray(sections)) return;

        sections.forEach((section: any) => {
            if (!Array.isArray(section?.rows)) return;

            section.rows = section.rows.map((row: any, index: number) => ({
                ...row,
                row_order: index + 1,
            }));
        });
    });
}
function recalculateColumnOrder(currentTemplate: any) {
    sectionTypes.forEach((sectionType) => {
        const sections = getTemplateSectionArray(currentTemplate, sectionType);
        if (!Array.isArray(sections)) return;
        sections.forEach((section: any) => {
            if (!Array.isArray(section?.rows)) return;
            section.rows.forEach((row: any) => {
                if (!Array.isArray(row?.columns)) return;
                row.columns = row.columns.map((column: any, index: number) => ({
                    ...column,
                    column_order: index + 1,
                }));
            }
            );
        });
    }
    );
}
function reCalculateInputGroupOrder(currentTemplate: any) {
    sectionTypes.forEach((sectionType) => {
        const sections = getTemplateSectionArray(currentTemplate, sectionType);
        if (!Array.isArray(sections)) return;
        sections.forEach((section: any) => {
            if (!Array.isArray(section?.rows)) return;
            section.rows.forEach((row: any) => {
                if (!Array.isArray(row?.columns)) return;
                row.columns.forEach((column: any) => {
                    if (!Array.isArray(column?.inputGroup)) return;
                    column.inputGroup = column.inputGroup.map((group: any, index: number) => ({
                        ...group,
                        input_group_order: index + 1,
                    }));
                });
            });
        });
    });
}
function reCalculateInputOrder(currentTemplate: any) {
    sectionTypes.forEach((sectionType) => {
        const sections = getTemplateSectionArray(currentTemplate, sectionType);
        if (!Array.isArray(sections)) return;
        sections.forEach((section: any) => {
            if (!Array.isArray(section?.rows)) return;
            section.rows.forEach((row: any) => {
                if (!Array.isArray(row?.columns)) return;
                row.columns.forEach((column: any) => {
                    if (!Array.isArray(column?.inputGroup)) return;
                    column.inputGroup.forEach((group: any) => {
                        group.inputs = group.inputs.map((input: any, index: number) => ({
                            ...input,
                            input_order: index + 1,
                        }));
                    })
                });
            });
        });
    });
}

type RemoveTrackerOptions = {
    listKey: keyof UpdateTemplateType;
    nestedKey: string;
    idKey: string;
    id: string;
    removeType: any;
};

export const updateWhileRemoving = (
    template: UpdateTemplateType,
    {
        listKey,
        nestedKey,
        idKey,
        id,
        removeType,
    }: RemoveTrackerOptions
) => {
    const list = (template[listKey] ??= []) as any[];

    const index = list.findIndex(
        item => item?.[nestedKey]?.[idKey] === id
    );

    if (index !== -1) {
        list.splice(index, 1);
        return;
    }

    list.push({
        type: removeType,
        [idKey]: id,
    });
};



const TemplateSlice = createSlice({
    name: "template",
    initialState: {
        INPUT_TYPES,
        allTemplates: [],
        allSavedBody: [],
        CurrentTemplate,
        currentSavedBody: {},
        callTemplateAPI: true,
        UpdatedTemplate
    },
    reducers: {
        SetAllTemplateList: (state, action) => {
            state.allTemplates = action.payload;
        },
        ResetUpdatedTemplate: (state) => {
            state.UpdatedTemplate = UpdatedTemplate;
        },
        SelectHeaderTemplate: (state, action) => {
            state.CurrentTemplate.header = action.payload;
            recalculateSectionOrder(state.CurrentTemplate);
        },
        SetCurrentTemplate: (state, action) => {
            const { header, body, footer, created_by, created_at, name } = action.payload;

            state.CurrentTemplate = { ...state.CurrentTemplate, header, body, footer, created_by, created_at, name };
            recalculateSectionOrder(state.CurrentTemplate);
        },
        AddRowToTemplateSection: (state, action) => {
            const { sectionId, sectionType } = action.payload;
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            ;
            const currentSection = currentTemplate.find((section: any) => section.template_section_id === sectionId);
            if (currentSection) {
                const newRow = {
                    template_row_id: uuid(),
                    name: "Row" + (currentSection.rows.length + 1),
                    row_order: currentSection.rows.length + 1,
                    columns: [
                        {
                            template_column_id: uuid(),
                            name: "Column1",
                            inputGroup: [{
                                template_input_group_id: uuid(),
                                input_group_order: 1,
                                inputs: []
                            }]
                        }
                    ],
                };
                currentSection.rows.push(newRow);
                recalculateRowOrder(state.CurrentTemplate);
                RowTracker.add(state.UpdatedTemplate, currentSection.template_section_id, newRow);
            }
        },
        RemoveRowFromTemplateSection: (state, action) => {
            const { sectionId, rowId, sectionType } = action.payload;
            const currentSectionArray: any = getTemplateSectionArray(
                state.CurrentTemplate,
                sectionType
            );
            if (!currentSectionArray || !Array.isArray(currentSectionArray)) return;
            const currentSection = currentSectionArray.find(
                (section: any) => section.template_section_id === sectionId
            );
            if (!currentSection || !Array.isArray(currentSection.rows)) return;
            const rowIndex = currentSection.rows.findIndex(
                (row: any) =>
                    row.template_row_id === rowId ||
                    row.id === rowId
            );
            if (rowIndex === -1) return;
            currentSection.rows.splice(rowIndex, 1);
            recalculateRowOrder(state.CurrentTemplate);
            RowTracker.remove(state.UpdatedTemplate, currentSection.template_section_id, rowId);
        },
        AddColumnToTemplateRow: (state, action) => {
            const { sectionId, rowId, sectionType } = action.payload;

            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const currentSection = currentTemplate.find((section: any) => section.template_section_id === sectionId);
            if (currentSection) {
                const currentRow = currentSection?.rows.find((row: any) => row.template_row_id === rowId || row.id === rowId);
                if (!currentRow) return;
                const newColumn = {
                    template_column_id: uuid(),
                    name: "Column" + (currentRow?.columns.length + 1),
                    column_order: currentRow.columns.length + 1,
                    data: null,
                    inputGroup: [{
                        template_input_group_id: uuid(),
                        input_group_order: 1,
                        inputs: []
                    }],
                };
                if (currentRow?.columns.length < 3)
                    currentRow.columns.push(newColumn);
                else
                    alert("Oye tu ki kartah..");
                ColumnTracker.add(state.UpdatedTemplate, currentSection.template_section_id, currentRow.template_row_id, newColumn)
                recalculateColumnOrder(state.CurrentTemplate);
            }
        },
        RemoveColumnToTemplateRow: (state, action) => {
            const { sectionId, rowId, columnId, sectionType } = action.payload;
            const currentTemplate =
                sectionType === "header"
                    ? state.CurrentTemplate.header
                    : state.CurrentTemplate.body;
            const currentSection = currentTemplate.find(
                (section: any) => section.template_section_id === sectionId
            );
            if (!currentSection) return;
            const currentRow = currentSection.rows.find(
                (row: any) =>
                    row.template_row_id === rowId ||
                    row.id === rowId
            );
            if (!currentRow) return;
            const columnIndex = currentRow.columns.findIndex(
                (col: any) =>
                    col.template_column_id === columnId ||
                    col.id === columnId
            );
            if (columnIndex !== -1) {
                currentRow.columns.splice(columnIndex, 1);
                ColumnTracker.remove(state.UpdatedTemplate, currentSection.template_section_id, currentRow.template_row_id, columnId)
                recalculateColumnOrder(state.CurrentTemplate);
            }
        },
        SelectBodyTemplate: (state, action) => {
            state.CurrentTemplate.body = action.payload
            recalculateSectionOrder(state.CurrentTemplate);
        },
        AppendSectionInTemplate: (state, action) => {
            const { section, sectionType } = action.payload;

            if (!section || !sectionType) return;
            const currentSection: any = getTemplateSectionArray(state.CurrentTemplate, sectionType);
            if (currentSection) {
                section.isVisible = true;
                currentSection.push({ ...section });
                SectionTracker.add(state.UpdatedTemplate, section, sectionType)
                recalculateSectionOrder(state.CurrentTemplate);
            }
        },
        UpdateSectionInTemplate: (state, action) => {
            const { section, sectionType, sectionIndex } = action.payload;
            if (!section || !sectionType || sectionIndex === undefined || sectionIndex === null) return;
            const currentSection: any = getTemplateSectionArray(state.CurrentTemplate, sectionType);
            if (currentSection && Array.isArray(currentSection) && currentSection[sectionIndex]) {
                currentSection[sectionIndex] = { ...section };
                recalculateSectionOrder(state.CurrentTemplate);
            }
        },
        RemoveSectionFromTemplate: (state, action) => {
            const { sectionType, sectionId } = action.payload;
            const currentSection: any = getTemplateSectionArray(state.CurrentTemplate, sectionType);
            if (!currentSection || !Array.isArray(currentSection)) return;
            const sectionIndex = currentSection.findIndex((sec: any) => sec.template_section_id == sectionId);
            currentSection.splice(sectionIndex, 1);
            SectionTracker.remove(state.UpdatedTemplate, sectionId);
            recalculateSectionOrder(state.CurrentTemplate);
        },
        MoveSectionInTemplate: (state, action) => {
            const { sectionType, fromIndex, toIndex } = action.payload;
            const currentSection: any = getTemplateSectionArray(state.CurrentTemplate, sectionType);
            if (!currentSection || !Array.isArray(currentSection)) return;
            if (typeof fromIndex !== 'number' || typeof toIndex !== 'number') return;
            if (fromIndex === toIndex) return;
            if (fromIndex < 0 || fromIndex >= currentSection.length) return;
            if (toIndex < 0 || toIndex >= currentSection.length) return;
            const [movedSection] = currentSection.splice(fromIndex, 1);
            currentSection.splice(toIndex, 0, movedSection);
            SectionTracker.update(state.UpdatedTemplate, movedSection, sectionType);
            recalculateSectionOrder(state.CurrentTemplate);
        },
        SetTemplateVisibility: (state, action) => {

            state.CurrentTemplate = {
                ...state.CurrentTemplate,
                ...action.payload,
            };
        },
        AddInputTypeToTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, input } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            if (!section) return;
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            let lastId = inputGroupId;
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup) {
                        inputGroup.inputs?.push(input);
                        InputTracker.add(state.UpdatedTemplate, section.template_section_id, targetRow.template_row_id, currentColumn.template_column_id, inputGroup.template_input_group_id, input);
                        reCalculateInputOrder(state.CurrentTemplate)
                    }
                }
            }
        },
        RemoveInputTypeFromTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;

            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            if (!section) return;
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const inputIndex = inputGroup?.inputs.findIndex((input: any) => input?.template_input_id == inputId);
                        if (inputIndex !== -1) {
                            inputGroup?.inputs.splice(inputIndex, 1);
                            updateWhileRemoving(state?.UpdatedTemplate, {
                                listKey: "UpdatedInputs",
                                nestedKey: "input",
                                idKey: "template_input_id",
                                id: inputId,
                                removeType: TEMPLATE_OPERATION.INPUT_REMOVE,
                            });
                            InputTracker.remove(state.UpdatedTemplate, section.template_section_id, targetRow.template_row_id, currentColumn.template_column_id, inputGroup.template_input_group_id, inputId);
                            reCalculateInputOrder(state?.CurrentTemplate);
                        }
                    }
                }
            }
        },
        AddInputValueToTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, inputValue } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            if (!section) return;
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                        if (input) {
                            input.template_input_value = inputValue;
                            InputTracker.update(state.UpdatedTemplate, section.template_section_id, targetRow.template_row_id, currentColumn.template_column_id, inputGroup.template_input_group_id, input);
                        }
                    }
                }
            }
        },
        EditInputLabelToTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, inputLabel } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;

            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            if (!section) return;
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                        if (input) {
                            input.input_name = inputLabel;
                            InputTracker.update(state.UpdatedTemplate, section.template_section_id, targetRow.template_row_id, currentColumn.template_column_id, inputGroup.template_input_group_id, input);
                        }

                    }
                }
            }
        },
        AddDropdownOptionValueToTemplate: (state, action) => {
            ;
            const { sectionId, rowId, columnId, inputId, inputGroupId, dropdownOptions, sectionType } = action.payload
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const currentSection = currentTemplate.find((section: any) => section.template_section_id === sectionId || section.id === sectionId);
            const targetRow = currentSection?.rows.find((row: any) => row.template_row_id === rowId || row.id === rowId);
            if (targetRow) {
                const targetColumn = targetRow?.columns.find((column: any) => column.id === columnId);
                const targetInputGroup = targetColumn?.inputGroup.find((group: any) => group.id === inputGroupId);
                if (targetInputGroup) {
                    const targetInput = targetInputGroup?.inputs.find((input: any) => input.id === inputId);
                    if (targetInput) {
                        targetInput.dropdown_option_id = dropdownOptions;
                    }
                }
            }
        },
        AddEditDropdownTextValueToTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputId, inputGroupId, dropdownOption, sectionType } = action.payload
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;

            const currentSection = currentTemplate.find((section: any) => section.template_section_id === sectionId || section.id === sectionId);
            const targetRow = currentSection?.rows.find((row: any) => row.template_row_id === rowId || row.id === rowId);
            if (targetRow) {
                const targetColumn = targetRow?.columns.find((column: any) => column.template_column_id === columnId || column.id === columnId);
                const targetInputGroup = targetColumn?.inputGroup.find((group: any) => group.template_input_group_id === inputGroupId || group.id === inputGroupId);
                if (targetInputGroup) {
                    const targetInput = targetInputGroup?.inputs.find((input: any) => input.template_input_id === inputId || input.id === inputId);
                    if (targetInput) {
                        targetInput.dropdown_option_id = dropdownOption?.id;
                        targetInput.dropdown_option_value = dropdownOption?.value;
                    }
                }
            }
        },
        UpdateDropdownOptionsInTemplate: (state, action) => {
            const { sectionIndex, rowIndex, columnIndex, inputIndex, inputGroupIndex, dropdownName, dropdownOptionValues, dropdownOptionId, dropdownOptionText, sectionType } = action.payload
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const currentSection = currentTemplate[sectionIndex];
            const targetRow = currentSection.rows[rowIndex];
            if (targetRow) {
                const targetColumn = targetRow.columns[columnIndex];
                if (targetColumn.inputGroup && targetColumn.inputGroup[inputGroupIndex] && targetColumn.inputGroup[inputGroupIndex].inputs && targetColumn.inputGroup[inputGroupIndex].inputs[inputIndex]) {
                    targetColumn.inputGroup[inputGroupIndex].inputs[inputIndex].input_entity_name = dropdownName;
                    targetColumn.inputGroup[inputGroupIndex].inputs[inputIndex].dropdown_option_values = dropdownOptionValues;
                    targetColumn.inputGroup[inputGroupIndex].inputs[inputIndex].dropdown_option_id = dropdownOptionId;
                    targetColumn.inputGroup[inputGroupIndex].inputs[inputIndex].dropdown_option_value = dropdownOptionText;
                }
            }
        },
        AddQuantityTextValueToTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, quantityValueFrom, quantityValueTo } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;

            if (!quantityValueFrom) return;
            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            if (!section) return;
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                        if (input) {
                            input.template_quantity_valueFrom = quantityValueFrom;
                            input.template_quantity_valueTo = quantityValueTo;
                            InputTracker.update(state.UpdatedTemplate, section.template_section_id, targetRow.template_row_id, currentColumn.template_column_id, inputGroup.template_input_group_id, input);
                        }
                    }
                }
            }
        },
        AddQuantityOptionIdToTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, quantityOptionId } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;

            if (!quantityOptionId) return;
            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            if (!section) return;
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                        if (input) {
                            input.template_input_quantity_option_id = quantityOptionId;
                            InputTracker.update(state.UpdatedTemplate, section.template_section_id, targetRow.template_row_id, currentColumn.template_column_id, inputGroup.template_input_group_id, input);
                        }
                    }
                }
            }
        },
        AddQuantityTypeToTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, quantityType } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;

            if (quantityType == undefined || quantityType === null || quantityType === "") return;
            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            if (!section) return;
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                        if (input) {
                            input.template_quantity_type_single = quantityType;
                            InputTracker.update(state.UpdatedTemplate, section.template_section_id, targetRow.template_row_id, currentColumn.template_column_id, inputGroup.template_input_group_id, input);
                        }
                    }
                }
            }
        },
        AddQuantityToTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, quantityId } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;

            if (quantityId == undefined || quantityId === null || quantityId === "") return;
            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            if (!section) return;
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                        if (input) {
                            input.template_input_quantity_id = quantityId;
                            InputTracker.update(state.UpdatedTemplate, section.template_section_id, targetRow.template_row_id, currentColumn.template_column_id, inputGroup.template_input_group_id, input);
                        }
                    }
                }
            }
        },
        SetInputStatusInTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, status } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;

            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                        if (input) {
                            input.status = status;
                        }
                    }
                }
            }
        },
        AddQuantityFieldToTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, showQuantity } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;

            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            if (!section) return;
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                        if (input) {
                            input.show_quantity = showQuantity;
                            InputTracker.update(state.UpdatedTemplate, section.template_section_id, targetRow.template_row_id, currentColumn.template_column_id, inputGroup.template_input_group_id, input);
                        }

                    }
                }
            }
        },
        AddVisibilityFieldToTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, isVisible } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;

            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            if (!section) return;
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                        if (input) {
                            input.is_visible = isVisible;
                            InputTracker.update(state.UpdatedTemplate, section.template_section_id, targetRow.template_row_id, currentColumn.template_column_id, inputGroup.template_input_group_id, input);
                        }
                    }
                }
            }
        },
        EditExtraNoteInTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, extraNote } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;

            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            if (!section) return;
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                        if (input) {
                            input.extra_note = extraNote;
                            InputTracker.update(state.UpdatedTemplate, section.template_section_id, targetRow.template_row_id, currentColumn.template_column_id, inputGroup.template_input_group_id, input);
                        }
                    }
                }
            }
        },
        EditExtraNoteValueInTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, extraNoteValue } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;

            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            if (!section) return;
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                        if (input) {
                            input.template_input_extranotes = extraNoteValue;
                            InputTracker.update(state.UpdatedTemplate, section.template_section_id, targetRow.template_row_id, currentColumn.template_column_id, inputGroup.template_input_group_id, input);
                        }
                    }
                }
            }
        },
        AddConditionToTemplateInput: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, conditionName, inputId, previousInputId } = action.payload;
            const currentSectionArray: any = getTemplateSectionArray(
                state.CurrentTemplate,
                sectionType
            );
            if (!currentSectionArray || !Array.isArray(currentSectionArray)) return;
            const currentSection = currentSectionArray.find(
                (section: any) => section.template_section_id === sectionId
            );
            if (!currentSection || !Array.isArray(currentSection.rows)) return;
            const currentRow = currentSection.rows.find(
                (row: any) =>
                    row.template_row_id === rowId ||
                    row.id === rowId
            );
            if (!currentRow || !Array.isArray(currentRow.columns)) return;
            const currentColumn = currentRow.columns.find(
                (column: any) => column.template_column_id === columnId
            );
            if (!currentColumn || !Array.isArray(currentColumn.inputGroup)) return;
            const inputGroup = currentColumn.inputGroup.find(
                (group: any) => group.template_input_group_id === inputGroupId
            );
            if (!inputGroup) return;
            if (inputGroup && inputGroup?.inputs) {
                const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                if (input) {
                    input.previous_related_input_id = previousInputId;
                    input.condition_with_previous_input_name = conditionName;
                    InputTracker.update(state.UpdatedTemplate, currentSection.template_section_id, currentRow.template_row_id, currentColumn.template_column_id, inputGroup.template_input_group_id, input);
                }
            }
        },
        SelectTemplateSection: (state, action) => {
            const { sectionIndex, sectionType } = action.payload

            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            if (currentTemplate?.children) {
                currentTemplate?.children.forEach((section: any) => {
                    section.selected = false
                })
            }
            const currentSection = currentTemplate?.children ? currentTemplate?.children[sectionIndex] : [];
            if (currentSection)
                currentSection.selected = true;
        },
        toggleCallTemplateAPI: (state, action) => {
            state.callTemplateAPI = action.payload;
        },
        CopyTemplateSection: (state, action) => {
            const { sectionId, sectionType } = action.payload;
            if (!sectionId || !sectionType) return;
            const currentSectionArray: any = getTemplateSectionArray(state.CurrentTemplate, sectionType);
            if (!currentSectionArray) return;
            const originalSection = currentSectionArray.find((section: any) => (section?.template_section_id == sectionId));
            const currentSection = JSON.parse(JSON.stringify(originalSection))
            currentSection.template_section_id = uuid();
            if (currentSection?.rows && currentSection?.rows.length) {
                for (let x = 0; x < currentSection?.rows.length; x++) {
                    currentSection.rows[x].template_row_id = uuid();
                    if (currentSection.rows[x]?.columns && currentSection.rows[x].columns.length) {
                        for (let i = 0; i < currentSection.rows[x].columns.length; i++) {
                            currentSection.rows[x].columns[i].template_column_id = uuid();
                            if (currentSection.rows[x].columns[i]?.inputGroup && currentSection.rows[x].columns[i]?.inputGroup.length) {
                                for (let j = 0; j < currentSection.rows[x].columns[i]?.inputGroup.length; j++) {
                                    currentSection.rows[x].columns[i].inputGroup[j].template_input_group_id = uuid();
                                    if (currentSection.rows[x].columns[i].inputGroup[j].inputs && currentSection.rows[x].columns?.[i].inputGroup[j].inputs.length) {
                                        for (let k = 0; k < currentSection.rows[x].columns[i]?.inputGroup[j].inputs.length; k++) {
                                            currentSection.rows[x].columns[i].inputGroup[j].inputs[k].template_input_id = uuid();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            currentSectionArray.push({ ...currentSection });
            SectionTracker.add(state.UpdatedTemplate, currentSection, sectionType);
            recalculateSectionOrder(state.CurrentTemplate);
        },
        CopyTemplateSectionRow: (state, action) => {
            const { sectionId, rowId, sectionType } = action.payload;
            if (!sectionId || !rowId || !sectionType) return;
            const currentSectionArray: any = getTemplateSectionArray(
                state.CurrentTemplate,
                sectionType
            );
            if (!currentSectionArray) return;
            const currentSection = currentSectionArray.find(
                (section: any) => section.template_section_id === sectionId
            );
            if (!currentSection) return;
            const originalRow = currentSection.rows.find(
                (row: any) => row.template_row_id === rowId || row.id === rowId
            );
            if (!originalRow) return;
            const copiedRow = JSON.parse(JSON.stringify(originalRow));
            copiedRow.template_row_id = uuid();
            if (copiedRow.columns?.length) {
                for (let i = 0; i < copiedRow.columns.length; i++) {
                    copiedRow.columns[i].template_column_id = uuid();

                    if (copiedRow.columns[i].inputGroup?.length) {
                        for (let j = 0; j < copiedRow.columns[i].inputGroup.length; j++) {
                            copiedRow.columns[i].inputGroup[j].template_input_group_id = uuid();

                            if (copiedRow.columns[i].inputGroup[j].inputs?.length) {
                                for (let k = 0; k < copiedRow.columns[i].inputGroup[j].inputs.length; k++) {
                                    copiedRow.columns[i].inputGroup[j].inputs[k].template_input_id = uuid();
                                }
                            }
                        }
                    }
                }
            }
            copiedRow.row_order = originalRow.row_order + 1;
            currentSection.rows.push(copiedRow);
            recalculateRowOrder(state.CurrentTemplate);
            RowTracker.add(state.UpdatedTemplate, currentSection.template_section_id, copiedRow)
        },
        ToggleVisibilityInTemplate: (state, action) => {
            const { sectionId, sectionType } = action.payload;
            if (!sectionId || !sectionType) return;
            const currentSectionArray: any = getTemplateSectionArray(state.CurrentTemplate, sectionType);
            if (!currentSectionArray) return;
            const currentSection = currentSectionArray.find((section: any) => (section?.template_section_id == sectionId));
            if (currentSection) {
                currentSection.is_visible = currentSection.is_visible == 1 ? 0 : 1;
                SectionTracker.update(state.UpdatedTemplate, currentSection, sectionType)
            }
        },
        ToggleRowVisibilityInTemplate: (state, action) => {
            const { sectionId, rowId, sectionType } = action.payload;
            if (!sectionId || !rowId || !sectionType) return;
            const currentSectionArray: any = getTemplateSectionArray(
                state.CurrentTemplate,
                sectionType
            );
            if (!currentSectionArray) return;
            const currentSection = currentSectionArray.find(
                (section: any) => section.template_section_id === sectionId
            );
            if (!currentSection) return;
            const currentRow = currentSection.rows.find(
                (row: any) =>
                    row.template_row_id === rowId ||
                    row.id === rowId
            );
            if (!currentRow) return;
            currentRow.is_visible = currentRow.is_visible ? 0 : 1;
            RowTracker.update(state.UpdatedTemplate, currentSection.template_section_id, currentRow)
        },
        AddInputGroupToTemplateColumn: (state, action) => {
            const { sectionId, rowId, columnId, inputGroup, sectionType } = action.payload;
            const currentSectionArray: any = getTemplateSectionArray(
                state.CurrentTemplate,
                sectionType
            );
            if (!currentSectionArray || !Array.isArray(currentSectionArray)) return;
            const currentSection = currentSectionArray.find(
                (section: any) => section.template_section_id === sectionId
            );
            if (!currentSection || !Array.isArray(currentSection.rows)) return;
            const currentRow = currentSection.rows.find(
                (row: any) =>
                    row.template_row_id === rowId ||
                    row.id === rowId
            );
            if (!currentRow || !Array.isArray(currentRow.columns)) return;
            const currentColumn = currentRow.columns.find(
                (column: any) => column.template_column_id === columnId
            );
            if (!currentColumn || !Array.isArray(currentColumn.inputGroup)) return;
            currentColumn.inputGroup.push(inputGroup);
            reCalculateInputGroupOrder(state.CurrentTemplate);
            InputGroupTracker.add(state.UpdatedTemplate, currentSection.template_section_id, currentRow.template_row_id, currentColumn.template_column_id, inputGroup);
        },
        RemoveInputGroupFromTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType } = action.payload;
            const currentSectionArray: any = getTemplateSectionArray(
                state.CurrentTemplate,
                sectionType
            );
            if (!currentSectionArray || !Array.isArray(currentSectionArray)) return;
            const currentSection = currentSectionArray.find(
                (section: any) => section.template_section_id === sectionId
            );
            if (!currentSection || !Array.isArray(currentSection.rows)) return;
            const currentRow = currentSection.rows.find(
                (row: any) =>
                    row.template_row_id === rowId ||
                    row.id === rowId
            );
            if (!currentRow || !Array.isArray(currentRow.columns)) return;
            const currentColumn = currentRow.columns.find(
                (column: any) => column.template_column_id === columnId
            );
            if (!currentColumn || !Array.isArray(currentColumn.inputGroup)) return;
            const inputGroupIndex = currentColumn.inputGroup.findIndex(
                (group: any) => group.template_input_group_id === inputGroupId
            );
            if (inputGroupIndex === -1) return;
            currentColumn.inputGroup.splice(inputGroupIndex, 1);
            InputGroupTracker.remove(state.UpdatedTemplate, currentSection.template_section_id, currentRow.template_row_id, currentColumn.template_column_id, inputGroupId);
            reCalculateInputGroupOrder(state.CurrentTemplate);
        },
        AddConditionInputGroupToTemplateColumn: (state, action) => {
            const { sectionId, rowId, columnId, sectionType, conditionName, inputGroupId, previousInputGroupId } = action.payload;
            const currentSectionArray: any = getTemplateSectionArray(
                state.CurrentTemplate,
                sectionType
            );
            if (!currentSectionArray || !Array.isArray(currentSectionArray)) return;
            const currentSection = currentSectionArray.find(
                (section: any) => section.template_section_id === sectionId
            );
            if (!currentSection || !Array.isArray(currentSection.rows)) return;
            const currentRow = currentSection.rows.find(
                (row: any) =>
                    row.template_row_id === rowId ||
                    row.id === rowId
            );
            if (!currentRow || !Array.isArray(currentRow.columns)) return;
            const currentColumn = currentRow.columns.find(
                (column: any) => column.template_column_id === columnId
            );
            if (!currentColumn || !Array.isArray(currentColumn.inputGroup)) return;
            const inputGroup = currentColumn.inputGroup.find(
                (group: any) => group.template_input_group_id === inputGroupId
            );
            if (!inputGroup) return;
            inputGroup.previous_related_input_group_id = previousInputGroupId;
            inputGroup.condition_with_previous_input_group_name = conditionName;
            InputGroupTracker.update(state.UpdatedTemplate, currentSection.template_section_id, currentRow.template_row_id, currentColumn.template_column_id, inputGroup);
            reCalculateInputGroupOrder(state.CurrentTemplate);
        },
        UpdateVisibilityInputGroupToTemplate: (state, action) => {
            const { sectionId, rowId, columnId, sectionType, isVisible, inputGroupId } = action.payload;
            const currentSectionArray: any = getTemplateSectionArray(
                state.CurrentTemplate,
                sectionType
            );
            if (!currentSectionArray || !Array.isArray(currentSectionArray)) return;
            const currentSection = currentSectionArray.find(
                (section: any) => section.template_section_id === sectionId
            );
            if (!currentSection || !Array.isArray(currentSection.rows)) return;
            const currentRow = currentSection.rows.find(
                (row: any) =>
                    row.template_row_id === rowId ||
                    row.id === rowId
            );
            if (!currentRow || !Array.isArray(currentRow.columns)) return;
            const currentColumn = currentRow.columns.find(
                (column: any) => column.template_column_id === columnId
            );
            if (!currentColumn || !Array.isArray(currentColumn.inputGroup)) return;
            const inputGroup = currentColumn.inputGroup.find(
                (group: any) => group.template_input_group_id === inputGroupId
            );
            if (!inputGroup) return;
            inputGroup.is_visible = isVisible;
            InputGroupTracker.update(state.UpdatedTemplate, currentSection.template_section_id, currentRow.template_row_id, currentColumn.template_column_id, inputGroup);
        },
        InputGroupNameUpdateInTemplate: (state, action) => {
            const { sectionId, rowId, columnId, sectionType, inputGroupName, inputGroupId } = action.payload;
            const currentSectionArray: any = getTemplateSectionArray(
                state.CurrentTemplate,
                sectionType
            );
            if (!currentSectionArray || !Array.isArray(currentSectionArray)) return;
            const currentSection = currentSectionArray.find(
                (section: any) => section.template_section_id === sectionId
            );
            if (!currentSection || !Array.isArray(currentSection.rows)) return;
            const currentRow = currentSection.rows.find(
                (row: any) =>
                    row.template_row_id === rowId ||
                    row.id === rowId
            );
            if (!currentRow || !Array.isArray(currentRow.columns)) return;
            const currentColumn = currentRow.columns.find(
                (column: any) => column.template_column_id === columnId
            );
            if (!currentColumn || !Array.isArray(currentColumn.inputGroup)) return;
            const inputGroup = currentColumn.inputGroup.find(
                (group: any) => group.template_input_group_id === inputGroupId
            );
            if (!inputGroup) return;
            inputGroup.input_group_name = inputGroupName;
            InputGroupTracker.update(state.UpdatedTemplate, currentSection.template_section_id, currentRow.template_row_id, currentColumn.template_column_id, inputGroup);
        },
        RemoveAlreadyUpdatedDataFromUpdatedTemplate: (state: any) => {
            for (let x in state.UpdatedTemplate) {
                state.UpdatedTemplate[x] = state.UpdatedTemplate[x].filter((module: any) => !module.is_updated)
            }
        },
        AddUpdatedFlagInUpdatedTemplate: (state: any) => {
            for (let x in state.UpdatedTemplate) {
                for (let i = 0; i < state.UpdatedTemplate[x].length; i++) {
                    state.UpdatedTemplate[x][i].is_updated = 1;
                }
            }
        },
    }
});

export const {
    SetAllTemplateList,
    SelectHeaderTemplate,
    SelectBodyTemplate,
    ResetUpdatedTemplate,
    AddInputTypeToTemplate,
    RemoveInputTypeFromTemplate,
    AddInputValueToTemplate, //1
    AddQuantityOptionIdToTemplate, // Quantity Option Id
    AddQuantityTextValueToTemplate, // Quantity Text
    AddQuantityFieldToTemplate, // Show Quantity
    AddQuantityTypeToTemplate, // Quantity Type
    AddQuantityToTemplate,  // Quantity ID 
    EditInputLabelToTemplate, // Edit Input Label
    EditExtraNoteValueInTemplate, // Extra note Value
    EditExtraNoteInTemplate, // Extra note in Input
    AddConditionToTemplateInput, // Input Condition
    AddDropdownOptionValueToTemplate,
    SetCurrentTemplate,
    AppendSectionInTemplate,
    UpdateSectionInTemplate,
    RemoveSectionFromTemplate,
    SetTemplateVisibility,
    AddEditDropdownTextValueToTemplate,
    UpdateDropdownOptionsInTemplate,
    MoveSectionInTemplate,
    ToggleVisibilityInTemplate,
    RemoveInputGroupFromTemplate,
    SelectTemplateSection,
    AddRowToTemplateSection,
    AddColumnToTemplateRow,
    toggleCallTemplateAPI,
    RemoveColumnToTemplateRow,
    CopyTemplateSection,
    CopyTemplateSectionRow, //ROW COPY
    ToggleRowVisibilityInTemplate,
    RemoveRowFromTemplateSection,
    AddInputGroupToTemplateColumn,
    InputGroupNameUpdateInTemplate, // Input Group Name Update
    UpdateVisibilityInputGroupToTemplate, // Input group Update Visibility
    AddConditionInputGroupToTemplateColumn,
    AddVisibilityFieldToTemplate,
    SetInputStatusInTemplate,
    RemoveAlreadyUpdatedDataFromUpdatedTemplate,
    AddUpdatedFlagInUpdatedTemplate
} = TemplateSlice.actions;

export default TemplateSlice.reducer;
