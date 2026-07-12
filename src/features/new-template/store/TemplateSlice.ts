import { createSlice, current } from "@reduxjs/toolkit";
import { ChevronDown, FileText, Type } from "lucide-react";
import type { TemplateDataType } from "../type/TemplateType";
import { INPUT_TYPE } from "../../../constant/inputType.enum";
import { id } from "date-fns/locale";
import { v4 as uuid } from "uuid"
export const INPUT_TYPES = [
    { id: INPUT_TYPE.INPUTTYPE_1, name: "Input", color: "bg-blue-50 border-blue-200", icon: Type },
    { id: INPUT_TYPE.INPUTTYPE_2, name: "Dropdown", color: "bg-purple-50 border-purple-200", icon: ChevronDown },
    { id: INPUT_TYPE.INPUTTYPE_3, name: "Textbox", color: "bg-amber-50 border-amber-200", icon: FileText },
];

export const CurrentTemplate: TemplateDataType = {
    id: "",
    name: "",
    show_header: true,
    show_body: true,
    show_footer: true,
    header: [],
    body: [],
    footer: [],
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


function normalizeInputOrder(inputs: any[] = []) {
    if (!Array.isArray(inputs)) return inputs;

    return inputs.map((item: any, idx: number) => ({
        ...item,
        input_order: idx + 1,
    }));
}

function normalizeInputGroupOrder(inputGroups: any[] = []) {
    if (!Array.isArray(inputGroups)) return inputGroups;

    return inputGroups.map((item: any, idx: number) => ({
        ...item,
        input_group_order: idx + 1,
    }));
}

const TemplateSlice = createSlice({
    name: "template",
    initialState: {
        INPUT_TYPES,
        allTemplates: [],
        allSavedBody: [],
        CurrentTemplate,
        currentSavedBody: {},
        callTemplateAPI: true,
    },
    reducers: {
        SetAllTemplateList: (state, action) => {
            state.allTemplates = action.payload;
        },
        SelectHeaderTemplate: (state, action) => {
            state.CurrentTemplate.header = action.payload;
            recalculateSectionOrder(state.CurrentTemplate);
        },
        SetCurrentTemplate: (state, action) => {
            const { header, body, footer, created_by, created_at, name } = action.payload;
            console.log(action.payload)
            state.CurrentTemplate = { ...state.CurrentTemplate, header, body, footer, created_by, created_at, name };
            recalculateSectionOrder(state.CurrentTemplate);
        },
        AddColumnToSection: (state: any, action: any) => {
            const { columnData, sectionIndex, rowIndex, sectionType } = action.payload;
            console.log(action.payload)
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const currentSection = currentTemplate[sectionIndex];
            const targetRow = currentSection.rows[rowIndex];
            if (targetRow) {
                targetRow.columns.push(columnData);
            }
        },
        AddRowToTemplateSection: (state, action) => {
            const { sectionId, sectionType } = action.payload;
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            console.log(action.payload);
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
                recalculateSectionOrder(state.CurrentTemplate);
            }
        },
        AddColumnToTemplateRow: (state, action) => {
            const { sectionId, rowId, sectionType } = action.payload;
            console.log(action.payload)
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const currentSection = currentTemplate.find((section: any) => section.template_section_id === sectionId);
            if (currentSection) {
                const currentRow = currentSection?.rows.find((row: any) => row.template_row_id === rowId || row.id === rowId);
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
                    alert("Oye tu ki kartah..")
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
            }
            // recalculateSectionOrder(state.CurrentTemplate);
        },
        SelectBodyTemplate: (state, action) => {
            state.CurrentTemplate.body = action.payload
            recalculateSectionOrder(state.CurrentTemplate);
        },
        AppendSectionInTemplate: (state, action) => {
            const { section, sectionType } = action.payload;
            console.log(action.payload)
            if (!section || !sectionType) return;
            const currentSection: any = getTemplateSectionArray(state.CurrentTemplate, sectionType);
            if (currentSection) {
                section.isVisible = true;
                currentSection.push({ ...section });
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
            recalculateSectionOrder(state.CurrentTemplate);
        },
        SetTemplateVisibility: (state, action) => {
            console.log(action.payload)
            state.CurrentTemplate = {
                ...state.CurrentTemplate,
                ...action.payload,
            };
        },
        AddInputTypeToTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, sameGroup, input } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            console.log(action.payload)
            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            let lastId = inputGroupId;
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    if (!sameGroup) {
                        const inputGroup = { template_input_group_id: uuid(), input_group_order: currentColumn.inputGroup.length + 1, inputs: [input] };
                        currentColumn.inputGroup.push(inputGroup);
                        lastId = inputGroup.template_input_group_id;
                    } else {
                        const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                        if (inputGroup) {
                            if (Array.isArray(input)) {
                                inputGroup.inputs = [...inputGroup.inputs, ...input];
                            } else
                                inputGroup.inputs?.push(input);
                        }
                    }
                    if (
                        lastId !== undefined &&
                        lastId !== null &&
                        currentColumn?.inputGroup
                    ) {
                        const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === lastId);

                        if (inputGroup?.inputs?.length) {
                            inputGroup.inputs = normalizeInputOrder(inputGroup.inputs);
                        }
                    }
                }
            }
        },
        RemoveInputTypeFromTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            console.log(action.payload)
            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const inputIndex = inputGroup?.inputs.findIndex((input: any) => input?.template_input_id == inputId);
                        if (inputIndex !== -1) {
                            inputGroup?.inputs.splice(inputIndex, 1);
                            reCalculateInputOrder(state?.CurrentTemplate);
                        }
                    }
                }
            }
        },
        AddInputValueToTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, inputValue } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            console.log(action.payload)
            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                        if (input)
                            input.template_input_value = inputValue;
                    }
                }
            }
        },
        EditInputLabelToTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, inputLabel } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            console.log(action.payload)
            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                        if (input)
                            input.input_name = inputLabel;
                    }
                }
            }
        },
        AddDropdownValueToTemplate: (state, action) => {
            const { sectionIndex, rowIndex, columnIndex, inputIndex, input, sectionType } = action.payload
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const currentSection = currentTemplate[sectionIndex];
            const targetRow = currentSection.rows[rowIndex];
            if (targetRow) {
                const targetColumn = targetRow.columns[columnIndex];
                if (targetColumn.inputGroup) {
                    targetColumn.inputGroup[inputIndex].value = input.value;
                    targetColumn.inputGroup[inputIndex].label = input.label;
                }
            }
        },
        AddDropdownOptionValueToTemplate: (state, action) => {
            console.log(action.payload);
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
            console.log(action.payload)
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
        AddQuantityValueToTemplate: (state, action) => {
            console.log(action.payload)
            const { sectionIndex, rowIndex, columnIndex, inputIndex, inputGroupIndex, quantity, sectionType } = action.payload;
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const currentSection = currentTemplate[sectionIndex];
            const targetRow = currentSection.rows[rowIndex];
            if (targetRow) {
                const targetColumn = targetRow.columns[columnIndex];
                if (targetColumn.inputGroup && targetColumn.inputGroup[inputGroupIndex] && targetColumn.inputGroup[inputGroupIndex].inputs) {
                    targetColumn.inputGroup[inputGroupIndex].inputs[inputIndex].quantity_option_id = quantity;
                    targetColumn.inputGroup[inputGroupIndex].inputs[inputIndex].template_input_quantity_option_id = quantity;
                }
            }
        },
        UpdateQuantityOptionsInTemplate: (state, action) => {
            const { sectionIndex, rowIndex, columnIndex, inputIndex, inputGroupIndex, quantityId, quantityName, quantityOptionValues, quantityOptionId, sectionType } = action.payload;
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const currentSection = currentTemplate[sectionIndex];
            const targetRow = currentSection.rows[rowIndex];
            if (targetRow) {
                const targetColumn = targetRow.columns[columnIndex];
                if (targetColumn.inputGroup && targetColumn.inputGroup[inputGroupIndex] && targetColumn.inputGroup[inputGroupIndex].inputs) {
                    targetColumn.inputGroup[inputGroupIndex].inputs[inputIndex].quantity_id = quantityId;
                    targetColumn.inputGroup[inputGroupIndex].inputs[inputIndex].quantity_name = quantityName;
                    targetColumn.inputGroup[inputGroupIndex].inputs[inputIndex].quantity_option_values = quantityOptionValues;
                    targetColumn.inputGroup[inputGroupIndex].inputs[inputIndex].quantity_option_id = quantityOptionId;
                }
            }
        },
        UpdateQuantityOptionsOnlyInTemplate: (state, action) => {
            const { sectionIndex, rowIndex, columnIndex, inputIndex, inputGroupIndex, quantityOptionValues, sectionType } = action.payload;
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const currentSection = currentTemplate[sectionIndex];
            const targetRow = currentSection.rows[rowIndex];
            if (targetRow) {
                const targetColumn = targetRow.columns[columnIndex];
                if (targetColumn.inputGroup && targetColumn.inputGroup[inputGroupIndex] && targetColumn.inputGroup[inputGroupIndex].inputs) {
                    targetColumn.inputGroup[inputGroupIndex].inputs[inputIndex].quantity_option_values = quantityOptionValues;
                }
            }
        },
        AddQuantityTextValueToTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, quantityValue } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            console.log(action.payload)
            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                        if (input)
                            input.template_quantity_value = quantityValue;
                    }
                }
            }
        },
        SetInputStatusInTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, status } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            console.log(action.payload)
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
            console.log(action.payload)
            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                        if (input)
                            input.show_quantity = showQuantity;
                    }
                }
            }
        },
        AddVisibilityFieldToTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, isVisible } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            console.log(action.payload)
            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                        if (input)
                            input.is_visible = isVisible;
                    }
                }
            }
        },
        onDeleteInputFromTemplate: (state, action) => {
            console.log(action.payload)
            const { sectionIndex, rowIndex, columnIndex, inputIndex, inputGroupIndex, sectionType } = action.payload
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const currentSection = currentTemplate[sectionIndex];
            const targetRow = currentSection.rows[Number(rowIndex)];
            if (targetRow) {
                const targetHeaderSection = targetRow.columns[columnIndex];
                if (targetHeaderSection.inputGroup && targetHeaderSection.inputGroup[inputGroupIndex] && targetHeaderSection.inputGroup[inputGroupIndex].inputs) {
                    targetHeaderSection.inputGroup[inputGroupIndex].inputs.splice(inputIndex, 1);
                }
            }
        },
        UpdateWidthOfColumn: (state: any, action: any) => {
            const { width, sectionIndex, rowIndex, sectionType } = action.payload;
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const currentSection = currentTemplate[sectionIndex];
            if (currentSection?.rows && currentSection?.rows?.[rowIndex] && currentSection?.rows?.[rowIndex].columns && currentSection?.rows?.[rowIndex].columns.length > 0) {
                currentSection?.rows?.[rowIndex].columns.forEach((e: any) => {
                    e.width = width;
                })
            }
        },
        EditShowLabelInTemplate: (state, action) => {
            const { sectionIndex, rowIndex, columnIndex, inputIndex, inputGroupIndex, show_label, sectionType } = action.payload
            console.log(action.payload)
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const currentSection = currentTemplate[sectionIndex];
            const targetRow = currentSection.rows[rowIndex];
            if (targetRow) {
                const targetColumn = targetRow.columns[columnIndex];
                if (targetColumn && targetColumn.inputGroup && targetColumn.inputGroup[inputGroupIndex] && targetColumn.inputGroup[inputGroupIndex].inputs) {
                    console.log("JI")
                    targetColumn.inputGroup[inputGroupIndex].inputs[inputIndex].show_label = show_label;
                }
            }
        },
        EditIsBoldInTemplate: (state, action) => {
            const { sectionIndex, rowIndex, columnIndex, inputIndex, inputGroupIndex, is_bold, sectionType } = action.payload
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const currentSection = currentTemplate[sectionIndex];
            const targetRow = currentSection.rows[rowIndex];
            if (targetRow) {
                const targetColumn = targetRow.columns[columnIndex];
                if (targetColumn && targetColumn.inputGroup && targetColumn.inputGroup[inputGroupIndex] && targetColumn.inputGroup[inputGroupIndex].inputs) {
                    targetColumn.inputGroup[inputGroupIndex].inputs[inputIndex].is_bold = is_bold;
                }
            }
        },
        EditExtraNoteInTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, extraNote } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            console.log(action.payload)
            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                        if (input)
                            input.extra_note = extraNote;
                    }
                }
            }
        },
        EditFontSizeInTemplate: (state, action) => {
            const { sectionIndex, rowIndex, columnIndex, inputIndex, inputGroupIndex, font_size, sectionType } = action.payload
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const currentSection = currentTemplate[sectionIndex];
            const targetRow = currentSection.rows[rowIndex];
            if (targetRow) {
                const targetColumn = targetRow.columns[columnIndex];
                if (targetColumn && targetColumn.inputGroup && targetColumn.inputGroup[inputGroupIndex] && targetColumn.inputGroup[inputGroupIndex].inputs) {
                    targetColumn.inputGroup[inputGroupIndex].inputs[inputIndex].font_size = font_size;
                }
            }
        },
        EditExtraNoteValueInTemplate: (state, action) => {
            const { sectionId, rowId, columnId, inputGroupId, sectionType, inputId, extraNoteValue } = action.payload
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            console.log(action.payload)
            const section = currentSection.find((sec: any) => sec.template_section_id === sectionId || sec.id === sectionId);
            const targetRow = section.rows.find((r: any) => r.template_row_id === rowId);
            if (targetRow) {
                const currentColumn = targetRow.columns.find((c: any) => c.template_column_id === columnId);
                if (currentColumn && currentColumn?.inputGroup && Array.isArray(currentColumn.inputGroup)) {
                    const inputGroup = currentColumn.inputGroup.find((g: any) => g.template_input_group_id === inputGroupId);
                    if (inputGroup && inputGroup?.inputs) {
                        const input = inputGroup?.inputs.find((input: any) => input?.template_input_id == inputId);
                        if (input)
                            input.template_input_extranotes = extraNoteValue;
                    }
                }
            }
        },
        AddSameTypeOfInputInTemplateSection: (state: any, action: any) => {
            {
                const { sectionIndex, rowIndex, columnIndex, input, index, inputGroupIndex, sectionType, sameGroup } = action.payload
                const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
                const currentSection = currentTemplate[sectionIndex];
                const targetRow = currentSection.rows[rowIndex];
                if (targetRow) {
                    const targetColumn = targetRow.columns[columnIndex];
                    console.log(action.payload)
                    if (sameGroup) {
                        if (targetColumn && targetColumn.inputGroup && targetColumn.inputGroup[inputGroupIndex] && Array.isArray(targetColumn.inputGroup[inputGroupIndex].inputs)) {
                            delete input.input_id;
                            if (!targetColumn.inputGroup[inputGroupIndex].template_input_group_id) {
                                targetColumn.inputGroup[inputGroupIndex].template_input_group_id = uuid(); // Assign a unique ID if it doesn't exist
                            }
                            targetColumn.inputGroup[inputGroupIndex].inputs.push(input);
                            targetColumn.inputGroup[inputGroupIndex].inputs = normalizeInputOrder(targetColumn.inputGroup[inputGroupIndex].inputs);
                        }
                    } else {
                        console.log(Array.isArray(targetColumn.inputGroup))
                        if (targetColumn && targetColumn.inputGroup && Array.isArray(targetColumn.inputGroup)) {
                            const newInputGroup = {
                                inputs: [],
                                template_input_group_id: uuid(),
                                input_group_order: targetColumn.inputGroup.length + 1,
                            }
                            targetColumn.inputGroup.push(newInputGroup);
                            const inputGroupIndex2 = targetColumn.inputGroup.length - 1;
                            targetColumn.inputGroup[inputGroupIndex2].inputs.push(input);
                            targetColumn.inputGroup[inputGroupIndex2].inputs = normalizeInputOrder(targetColumn.inputGroup[inputGroupIndex2].inputs);
                        }
                    }
                }
            }
        },
        AddSameTypeOfInputInTemplateSectionInOrCondition: (state: any, action: any) => {
            const { sectionIndex, rowIndex, columnIndex, input, index, inputGroupIndex, sectionType } = action.payload
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const currentSection = currentTemplate[sectionIndex];
            const targetRow = currentSection.rows[rowIndex];
            if (targetRow) {
                const targetColumn = targetRow.columns[columnIndex];
                if (targetColumn && targetColumn.inputGroup && targetColumn.inputGroup[inputGroupIndex] && Array.isArray(targetColumn.inputGroup[inputGroupIndex].inputs)) {
                    delete input.input_id;
                    input.input_id = uuid();
                    targetColumn.inputGroup[inputGroupIndex].inputs.splice(index, 0, input);
                    targetColumn.inputGroup[inputGroupIndex].inputs = normalizeInputOrder(targetColumn.inputGroup[inputGroupIndex].inputs);
                }
            }
        },

        AddSameTypeOfInputGroupInTemplateSectionInOrCondition: (state: any, action: any) => {
            const { sectionIndex, rowIndex, columnIndex, inputGroup, inputGroupIndex, sectionType } = action.payload
            console.log(action.payload)
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const currentSection = currentTemplate[sectionIndex];
            const targetRow = currentSection.rows[rowIndex];
            if (targetRow) {
                const targetColumn = targetRow.columns[columnIndex];
                if (targetColumn && targetColumn.inputGroup && targetColumn.inputGroup && Array.isArray(targetColumn.inputGroup)) {
                    delete inputGroup.template_input_group_id;
                    targetColumn.inputGroup.splice(inputGroupIndex + 1, 0, inputGroup);
                    targetColumn.inputGroup = normalizeInputGroupOrder(targetColumn.inputGroup);
                }
            }
        },
        ReorderInputsGroupInTemplate: (state, action) => {
            const { sectionIndex, rowIndex, columnIndex, fromIndex, toIndex, sectionType } = action.payload;
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const currentSection = currentTemplate[sectionIndex];
            const targetRow = currentSection.rows[rowIndex];
            if (targetRow) {
                const targetColumn = targetRow.columns[columnIndex];
                if (targetColumn && targetColumn.inputGroup && Array.isArray(targetColumn.inputGroup)) {
                    if (fromIndex === toIndex) return;
                    if (fromIndex < 0 || fromIndex >= targetColumn.inputGroup.length) return;
                    if (toIndex < 0 || toIndex >= targetColumn.inputGroup.length) return;
                    const [movedInput] = targetColumn.inputGroup.splice(fromIndex, 1);
                    targetColumn.inputGroup.splice(toIndex, 0, movedInput);
                    targetColumn.inputGroup = normalizeInputGroupOrder(targetColumn.inputGroup);
                }
            }
        },
        AddNewDropdownEntityToTemplate: (state, action) => {
            const { sectionIndex, rowIndex, columnIndex, inputIndex, dropdownName, inputGroupIndex, input_entity_id, sectionType } = action.payload
            console.log(action.payload)
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const currentSection = currentTemplate[sectionIndex];
            const targetRow = currentSection.rows[rowIndex];
            if (targetRow) {
                const targetColumn = targetRow.columns[columnIndex];
                if (targetColumn) {
                    const targetInputGroup = targetColumn.inputGroup ? targetColumn.inputGroup[inputGroupIndex] : null;
                    const targetInput = targetInputGroup && targetInputGroup.inputs ? targetInputGroup.inputs[inputIndex] : null;
                    if (targetInput) {
                        targetInput.input_entity_id = input_entity_id;
                        targetInput.input_entity_name = dropdownName;
                    }
                }
            }
        },
        SelectTemplateSection: (state, action) => {
            const { sectionIndex, sectionType } = action.payload
            console.log(action.payload)
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
            currentSection.rows.push(copiedRow);
            recalculateRowOrder(state.CurrentTemplate);
        },
        ToggleVisibilityInTemplate: (state, action) => {
            const { sectionId, sectionType } = action.payload;
            if (!sectionId || !sectionType) return;
            const currentSectionArray: any = getTemplateSectionArray(state.CurrentTemplate, sectionType);
            if (!currentSectionArray) return;
            const currentSection = currentSectionArray.find((section: any) => (section?.template_section_id == sectionId));
            if (currentSection) {
                currentSection.is_visible = currentSection.is_visible == 1 ? 0 : 1;
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
            reCalculateInputGroupOrder(state.CurrentTemplate);
        },
        AddOrInputGroupToTemplateColumn: (state, action) => {
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
            const inputGroupCopy = JSON.parse(JSON.stringify(inputGroup));
            inputGroupCopy.or_input_group_id = inputGroup?.or_input_group_id
                ? inputGroup.or_input_group_id
                : inputGroup.template_input_group_id;
            inputGroupCopy.template_input_group_id = uuid();
            console.log(inputGroupCopy)
            currentColumn.inputGroup.push(inputGroupCopy);
            reCalculateInputGroupOrder(state.CurrentTemplate);
        }
    },
});

export const {
    SetAllTemplateList,
    SelectHeaderTemplate,
    SelectBodyTemplate,
    AddInputTypeToTemplate,
    RemoveInputTypeFromTemplate,
    AddInputValueToTemplate,
    AddQuantityValueToTemplate,
    AddQuantityTextValueToTemplate,
    AddDropdownValueToTemplate,
    AddDropdownOptionValueToTemplate,
    AddQuantityFieldToTemplate,
    onDeleteInputFromTemplate,
    AddColumnToSection,
    UpdateWidthOfColumn,
    EditShowLabelInTemplate,
    EditIsBoldInTemplate,
    EditFontSizeInTemplate,
    SetCurrentTemplate,
    EditExtraNoteValueInTemplate,
    EditExtraNoteInTemplate,
    AppendSectionInTemplate,
    UpdateSectionInTemplate,
    RemoveSectionFromTemplate,
    SetTemplateVisibility,
    AddSameTypeOfInputInTemplateSection,
    AddEditDropdownTextValueToTemplate,
    UpdateDropdownOptionsInTemplate,
    UpdateQuantityOptionsInTemplate,
    UpdateQuantityOptionsOnlyInTemplate,
    MoveSectionInTemplate,
    ToggleVisibilityInTemplate,
    AddSameTypeOfInputInTemplateSectionInOrCondition,
    AddSameTypeOfInputGroupInTemplateSectionInOrCondition,
    ReorderInputsGroupInTemplate,
    AddNewDropdownEntityToTemplate,
    RemoveInputGroupFromTemplate,
    SelectTemplateSection,
    AddRowToTemplateSection,
    AddColumnToTemplateRow,
    toggleCallTemplateAPI,
    RemoveColumnToTemplateRow,
    CopyTemplateSection,
    CopyTemplateSectionRow,
    ToggleRowVisibilityInTemplate,
    RemoveRowFromTemplateSection,
    EditInputLabelToTemplate,
    AddInputGroupToTemplateColumn,
    AddOrInputGroupToTemplateColumn,
    AddVisibilityFieldToTemplate,
    SetInputStatusInTemplate
} = TemplateSlice.actions;

export default TemplateSlice.reducer;
