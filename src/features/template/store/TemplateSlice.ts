import { createSlice } from "@reduxjs/toolkit";
import { ChevronDown, FileText, Type } from "lucide-react";
import type { TemplateDataType } from "../type/TemplateType";
import { INPUT_TYPE } from "../../../constant/inputType.enum";

export const INPUT_TYPES = [
  { id: INPUT_TYPE.INPUTTYPE_1, name: "Input", color: "bg-blue-50 border-blue-200", icon: Type },
  { id: INPUT_TYPE.INPUTTYPE_2, name: "Dropdown", color: "bg-purple-50 border-purple-200", icon: ChevronDown },
  { id: INPUT_TYPE.INPUTTYPE_3, name: "Textbox", color: "bg-amber-50 border-amber-200", icon: FileText },
];

const CurrentTemplate: TemplateDataType = {
    id:"",
    name: "",
    show_header: true,
    show_body: true,
    show_footer: true,
    header:{
        id:"",
        name:"",
        rows:[
            {
                id:"",
                name:"",
                columns:[]
            }
        ],
    },
    body:{
        id:"",
        name:"",
        rows:[
            {
                id:"",
                name:"",
                columns:[]
            }
        ]
    }
}

const TemplateSlice = createSlice({
  name: "template",
  initialState: {
    INPUT_TYPES,
    allTemplates: [],
    allSavedBody: [],
    CurrentTemplate,
    currentSavedBody: {},
  },
    reducers: {
        SetAllTemplateList: (state, action) => {
            state.allTemplates = action.payload;
        },
        SelectHeaderTemplate:(state,action)=> {
            state.CurrentTemplate.header = action.payload;
        },
        SetCurrentTemplate: (state, action) => {
            const { header, body, footer, created_by, created_at, name } = action.payload;
            console.log(action.payload)
            state.CurrentTemplate = {...state.CurrentTemplate, header, body, footer, created_by, created_at, name};
        },
        AddCoulmnToSection: (state: any, action: any) => {
            const { columnData, rowIndex, sectionType } = action.payload;
            console.log(action.payload)
            const rows = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            console.log(rows.rows[rowIndex])
            const targetRow = rows.rows[rowIndex];
        if(targetRow) {
            targetRow.columns.push(columnData);
        }
        },
        SelectBodyTemplate:(state,action)=>{
            state.CurrentTemplate.body = action.payload
        },
        AppendHeaderTemplate:(state, action) => {
            const section = action.payload;
            if (!section) return;
            if (!state.CurrentTemplate.header?.id) {
                state.CurrentTemplate.header = section;
                const headerRef: any = state.CurrentTemplate.header;
                headerRef._sections = headerRef._sections || [];
                headerRef._sections.push({ id: section.id, name: section.name, visible: true });
            } else {
                // if the incoming section has rows, append them
                if (Array.isArray(section.rows)) {
                    state.CurrentTemplate.header.rows = [
                        ...(state.CurrentTemplate.header.rows || []),
                        ...section.rows,
                    ];
                }
                // always track appended section metadata so UI shows multiple additions
                const headerRef: any = state.CurrentTemplate.header;
                headerRef._sections = headerRef._sections || [];
                headerRef._sections.push({ id: section.id, name: section.name });
            }
        },
        AppendBodyTemplate:(state, action) => {
            const section = action.payload;
            if (!section) return;
            if (!state.CurrentTemplate.body?.id) {
                state.CurrentTemplate.body = section;
                const bodyRef: any = state.CurrentTemplate.body;
                bodyRef._sections = bodyRef._sections || [];
                bodyRef._sections.push({ id: section.id, name: section.name, visible: true });
            } else {
                if (Array.isArray(section.rows)) {
                    state.CurrentTemplate.body.rows = [
                        ...(state.CurrentTemplate.body.rows || []),
                        ...section.rows,
                    ];
                }
                const bodyRef: any = state.CurrentTemplate.body;
                bodyRef._sections = bodyRef._sections || [];
                bodyRef._sections.push({ id: section.id, name: section.name });
            }
        },
        AppendFooterTemplate:(state, action) => {
            const section = action.payload;
            if (!section) return;
            if (!state.CurrentTemplate.footer?.id) {
                state.CurrentTemplate.footer = section;
                const footerRef: any = state.CurrentTemplate.footer;
                footerRef._sections = [{ id: section.id, name: section.name }];
            } else if (Array.isArray(section.rows)) {
                state.CurrentTemplate.footer.rows = [
                    ...(state.CurrentTemplate.footer.rows || []),
                    ...section.rows,
                ];
                const footerRef: any = state.CurrentTemplate.footer;
                footerRef._sections = footerRef._sections || [];
                footerRef._sections.push({ id: section.id, name: section.name });
            }
        },
        SetTemplateVisibility:(state, action) => {
            state.CurrentTemplate = {
                ...state.CurrentTemplate,
                ...action.payload,
            };
        },
        ToggleAppendedSectionVisibility:(state, action) => {
            const { sectionType, sectionId } = action.payload;
            const ref: any = sectionType === 'header' ? state.CurrentTemplate.header : sectionType === 'body' ? state.CurrentTemplate.body : state.CurrentTemplate.footer;
            if (!ref || !ref._sections) return;
            const idx = ref._sections.findIndex((s: any) => s.id === sectionId);
            if (idx === -1) return;
            ref._sections[idx].visible = !ref._sections[idx].visible;
        },
        RemoveAppendedSection:(state, action) => {
            const { sectionType, sectionId } = action.payload;
            const ref: any = sectionType === 'header' ? state.CurrentTemplate.header : sectionType === 'body' ? state.CurrentTemplate.body : state.CurrentTemplate.footer;
            if (!ref || !ref._sections) return;
            ref._sections = ref._sections.filter((s: any) => s.id !== sectionId);
        },
        AddInputTypeToTemplate:(state,action)=>{
            const {rowIndex, columnIndex,sectionType,input} = action.payload
            const rows = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const targetRow = rows.rows[rowIndex];
            if(targetRow){
                const currentColumn = targetRow.columns[columnIndex];
                if(currentColumn && currentColumn?.inputs && Array.isArray(currentColumn.inputs)){
                    currentColumn.inputs.push(input);
                }
            }
        },
        RemoveInputTypeFromTemplate:(state,action)=>{
            const {rowIndex, columnIndex,sectionType,inputIndex} = action.payload
            const rows = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const targetRow = rows.rows[rowIndex];
            if(targetRow){
                const currentColumn = targetRow.columns[columnIndex];
                if(currentColumn && currentColumn?.inputs && Array.isArray(currentColumn.inputs)){
                    currentColumn.inputs.splice(inputIndex,1);
                }
            }
        },
        AddInputValueToTemplate:(state,action)=>{
            const { rowIndex, columnIndex, inputIndex, input, sectionType } = action.payload;
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const targetRows = currentTemplate.rows[rowIndex];
            if (targetRows) {
                console.log(action.payload)
                const targetColumn = targetRows.columns[columnIndex];
                if(targetColumn && targetColumn.inputs){
                    targetColumn.inputs[inputIndex].input_entity_value = input.value;
                    targetColumn.inputs[inputIndex].template_input_value = input.value;
                    targetColumn.inputs[inputIndex].label = input.label;
                }
            }
        },
        AddDropdownValueToTemplate:(state,action)=>{
            const { rowIndex, columnIndex, inputIndex, input, sectionType } = action.payload
            const rows = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const targetRow = rows.rows[rowIndex];
             if(targetRow){
                const targetColumn = targetRow.columns[columnIndex];
                if(targetColumn.inputs){
                    targetColumn.inputs[inputIndex].value = input.value;
                    targetColumn.inputs[inputIndex].label = input.label;
                 }
            }
        },
        AddDropdownOptionValueToTemplate:(state,action)=>{
            const {rowIndex, columnIndex, inputIndex, dropdownOptions,sectionType} = action.payload
            const rows = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const targetHeaderRow = rows.rows[rowIndex];
            console.log(rowIndex, columnIndex, inputIndex, dropdownOptions,sectionType)
            if(targetHeaderRow){
                const targetHeaderSection = targetHeaderRow.columns[columnIndex];
                if(targetHeaderSection.inputs){
                    console.log(dropdownOptions)
                    targetHeaderSection.inputs[inputIndex].dropdown_option_id = dropdownOptions;
                }
            }
        },
        AddQuantityValueToTemplate:(state,action)=>{
            const { rowIndex, columnIndex, inputIndex, quantity,sectionType } = action.payload;
            console.log(action.payload)
            const rows = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const targetRow = rows.rows[rowIndex];
            console.log(targetRow.columns)
            console.log(targetRow.columns[columnIndex])
            if(targetRow){
                const targetColumn = targetRow.columns[columnIndex];
                if(targetColumn.inputs){
                    console.log(action.payload)
                    targetColumn.inputs[inputIndex].quantity_option_id = quantity;
                }
            }
        },
        AddQuantityTextValueToTemplate: (state, action) => {
            console.log(action.payload)
            const {rowIndex, columnIndex, inputIndex, quantityText,sectionType} = action.payload
            const rows = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const targetRow = rows.rows[rowIndex];
            if(targetRow){
                const targetColumn = targetRow.columns[columnIndex];
                if(targetColumn.inputs){
                    targetColumn.inputs[inputIndex].quantityTextValue = quantityText;
                }
            }
        },
        AddQuantityFieldToTemplate:(state,action)=>{
            const { rowIndex, columnIndex, inputIndex, quantity,sectionType } = action.payload;
            console.log(action.payload)
            const rows = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const targetRow = rows.rows[Number(rowIndex)];
            if(targetRow){
                const targetColumn = targetRow.columns[columnIndex];
                if(targetColumn && targetColumn.inputs){
                    targetColumn.inputs[inputIndex].show_quantity = quantity;
                }
            }
        },
        onDeleteInputFromTemplate:(state,action)=>{
            console.log(action.payload)
            const {rowIndex, columnIndex, inputIndex ,sectionType} = action.payload
            const targetHeaderRow = sectionType === 'header' ? state.CurrentTemplate.header.rows[rowIndex] : state.CurrentTemplate.body.rows[rowIndex];
            if(targetHeaderRow){
                const targetHeaderSection = targetHeaderRow.columns[columnIndex];
                if(targetHeaderSection.inputs){
                    targetHeaderSection.inputs.splice(inputIndex,1);
                }
            }
        },
        AddInputValueToBodyTemplate:(state,action)=>{
            const {bodyRowIndex, bodySectionIndex, inputIndex, input} = action.payload
            const targetBodyRow = state.CurrentTemplate.body.bodyRows[bodyRowIndex];
            if(targetBodyRow){
                const targetBodySection = targetBodyRow.bodySections[bodySectionIndex];
                if(targetBodySection){
                    targetBodySection.inputs[inputIndex].value = input.value;
                    targetBodySection.inputs[inputIndex].label = input.label;
                }
            }
        },
        AddDropdownValueToBodyTemplate:(state,action)=>{
            const {bodyRowIndex, bodySectionIndex, inputIndex, input} = action.payload
            const targetBodyRow = state.CurrentTemplate.body.bodyRows[bodyRowIndex];
            if(targetBodyRow){
                const targetBodySection = targetBodyRow.bodySections[bodySectionIndex];
                if(targetBodySection){
                    targetBodySection.inputs[inputIndex].value = input.value;
                    targetBodySection.inputs[inputIndex].label = input.label;
                }
            }
        },
        AddQuantityValueToBodyTemplate:(state,action)=>{
            const {bodyRowIndex, bodySectionIndex, inputIndex, quantity} = action.payload
            const targetBodyRow = state.CurrentTemplate.body.bodyRows[bodyRowIndex];
            if(targetBodyRow){
                const targetBodySection = targetBodyRow.bodySections[bodySectionIndex];
                if(targetBodySection){
                    targetBodySection.inputs[inputIndex].quantityValue = quantity;
                }
            }
        },
        AddQuantityTextValueToBodyTemplate:(state,action)=>{
            const {bodyRowIndex, bodySectionIndex, inputIndex, quantityText} = action.payload
            const targetBodyRow = state.CurrentTemplate.body.bodyRows[bodyRowIndex];
            if(targetBodyRow){
                const targetBodySection = targetBodyRow.bodySections[bodySectionIndex];
                if(targetBodySection){
                    targetBodySection.inputs[inputIndex].quantityTextValue = quantityText;
                }
            }
        },
        AddQuantityFieldToBodyTemplate:(state,action)=>{
            const {bodyRowIndex, bodySectionIndex, inputIndex, quantity} = action.payload
            const targetBodyRow = state.CurrentTemplate.body.bodyRows[bodyRowIndex];
            if(targetBodyRow){
                const targetBodySection = targetBodyRow.bodySections[bodySectionIndex];
                if(targetBodySection){
                    targetBodySection.inputs[inputIndex].show_quantity = quantity;
                }
            }
        },
        AddDropdownOptionValueToBodyTemplate:(state,action)=>{
            const {bodyRowIndex, bodySectionIndex, inputIndex, dropdownOptions} = action.payload
            const targetBodyRow = state.CurrentTemplate.body.bodyRows[bodyRowIndex];
            console.log(bodyRowIndex, bodySectionIndex, inputIndex, dropdownOptions)
            if(targetBodyRow){
                const targetBodySection = targetBodyRow.bodySections[bodySectionIndex];
                if(targetBodySection){
                    console.log(dropdownOptions)
                    targetBodySection.inputs[inputIndex].dropdownValue = dropdownOptions;
                }
            }
        },
        onDeleteInputFromBodyTemplate:(state,action)=>{
            console.log(action.payload)
            const {bodyRowIndex, bodySectionIndex, inputIndex} = action.payload
            const targetBodyRow = state.CurrentTemplate.body.bodyRows[bodyRowIndex];
            if(targetBodyRow){
                const targetBodySection = targetBodyRow.bodySections[bodySectionIndex];
                if(targetBodySection){
                    targetBodySection.inputs.splice(inputIndex,1);
                }
            }
        },
        saveTemplate:(state,action)=>{
            state.allTemplates.push(action?.payload);
            const allTemplate = JSON.parse(localStorage.getItem("savedGeneralTemplateList")) || [];
            allTemplate.push(action?.payload);
            localStorage.setItem("savedGeneralTemplateList",JSON.stringify(allTemplate));
        },
        UpdateWidthOfColumn: (state: any, action: any) => {
            const { width, rowIndex, sectionType } = action.payload;
            const currentSection = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            if (currentSection?.rows && currentSection?.rows?.[rowIndex] && currentSection?.rows?.[rowIndex].columns &&currentSection?.rows?.[rowIndex].columns.length > 0) {
                currentSection?.rows?.[rowIndex].columns.forEach((e: any) => {
                e.width = width;
            })
        }
        },
        EditShowLabelInTemplate:(state,action)=>{
            const { rowIndex, columnIndex, inputIndex, show_label, sectionType } = action.payload
            console.log(action.payload)
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const targetRow = currentTemplate.rows[rowIndex];
            if(targetRow){
                const targetColumn = targetRow.columns[columnIndex];
                if (targetColumn && targetColumn.inputs) {
                    console.log("JI")
                    targetColumn.inputs[inputIndex].show_label = show_label;
                }
            }
        },
        EditIsBoldInTemplate:(state,action)=>{
            const {rowIndex, columnIndex, inputIndex, is_bold,sectionType} = action.payload
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const targetRow = currentTemplate.rows[rowIndex];
            if(targetRow){
                const targetColumn = targetRow.columns[columnIndex];
                if(targetColumn && targetColumn.inputs){
                    targetColumn.inputs[inputIndex].is_bold = is_bold;
                }
            }
        },
        EditExtraNoteInTemplate:(state,action)=>{
            const { rowIndex, columnIndex, inputIndex, extra_note, sectionType } = action.payload
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const targetRow = currentTemplate.rows[rowIndex];
            if(targetRow){
                const targetColumn = targetRow.columns[columnIndex];
                if(targetColumn && targetColumn.inputs){
                    targetColumn.inputs[inputIndex].extra_note = extra_note;
                }
            }
        },
        EditFontSizeInTemplate: (state, action) => {
            const { rowIndex, columnIndex, inputIndex, font_size, sectionType } = action.payload
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const targetRow = currentTemplate.rows[rowIndex];
            if (targetRow) {
                const targetColumn = targetRow.columns[columnIndex];
                if (targetColumn && targetColumn.inputs) {
                    targetColumn.inputs[inputIndex].font_size = font_size;
                }
            }
        },
        EditExtraNoteValueInTemplate: (state, action) => {
            const { rowIndex, columnIndex, inputIndex, extra_note_value, sectionType } = action.payload
            const currentTemplate = sectionType === 'header' ? state.CurrentTemplate.header : state.CurrentTemplate.body;
            const targetRow = currentTemplate.rows[rowIndex];
            if (targetRow) {
                const targetColumn = targetRow.columns[columnIndex];
                if (targetColumn && targetColumn.inputs) {
                    targetColumn.inputs[inputIndex].extra_note_value = extra_note_value;
                }
            }
        },
    }
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
    AddQuantityValueToBodyTemplate,
    AddQuantityTextValueToBodyTemplate,
    AddQuantityFieldToBodyTemplate,
    AddInputValueToBodyTemplate,
    AddDropdownValueToBodyTemplate,
    AddDropdownOptionValueToBodyTemplate,
    onDeleteInputFromBodyTemplate,
    onDeleteInputFromTemplate,
    saveTemplate,
    AddCoulmnToSection,
    UpdateWidthOfColumn,
    EditShowLabelInTemplate,
    EditIsBoldInTemplate,
    EditFontSizeInTemplate,
    SetCurrentTemplate,
    EditExtraNoteValueInTemplate,
    EditExtraNoteInTemplate,
    AppendBodyTemplate,
    AppendHeaderTemplate,
    AppendFooterTemplate,
    ToggleAppendedSectionVisibility,
    RemoveAppendedSection,
    SetTemplateVisibility
} = TemplateSlice.actions;

export default TemplateSlice.reducer;
