import { createSlice } from "@reduxjs/toolkit";
import { ChevronDown, FileText, Type } from "lucide-react";
import type { BodyTemplates } from "../type/BodySectionType";
import { INPUT_TYPE } from "../../../constant/inputType.enum";

export const INPUT_TYPES = [
  { id: INPUT_TYPE.INPUTTYPE_1, name: "Input", color: "bg-blue-50 border-blue-200", icon: Type },
  { id: INPUT_TYPE.INPUTTYPE_2, name: "Dropdown", color: "bg-purple-50 border-purple-200", icon: ChevronDown },
  { id: INPUT_TYPE.INPUTTYPE_3, name: "Textbox", color: "bg-amber-50 border-amber-200", icon: FileText },
];

const getSavedList = <T,>(key: string): T[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return JSON.parse(localStorage.getItem(key) || "[]") || [];
  } catch {
    return [];
  }
};

const createDefaultRows = () => ({
  id: "untitled_body_rows",
  name: "untitled_body_rows",
  bodySections: {},
});

const createDefaultBody = (): BodyTemplates => ({
  id: "untitled",
  name: "untitled",
  bodyRows: [createDefaultRows()],
});

const normalizeInput = (input: any, fallbackKey: string, index: number) => ({
  ...input,
  id: input?.id || `${fallbackKey}-${index}`,
  type: input?.type || INPUT_TYPE.INPUTTYPE_1,
  quantityField: Boolean(input?.quantityField),
  quantityDataId: input?.quantityDataId ?? "",
  inputEntityTypeId: input?.inputEntityTypeId || input?.type || INPUT_TYPE.INPUTTYPE_1,
  inputEntityDataId: input?.inputEntityDataId ?? "",
});

const normalizeSection = (section: any, fallbackKey: string) => {
  if (Array.isArray(section)) {
    return {
      width: 100,
      inputs: section.map((input, index) => normalizeInput(input, fallbackKey, index)),
    };
  }

  if (section && typeof section === "object") {
    return {
      width: Number(section.width) || 100,
      inputs: Array.isArray(section.inputs)
        ? section.inputs.map((input: any, index: number) => normalizeInput(input, fallbackKey, index))
        : [],
    };
  }

  return {
    width: 100,
    inputs: [],
  };
};

const normalizeBodySections = (bodySections: Record<string, any> = {}) =>
  Object.fromEntries(
    Object.entries(bodySections).map(([sectionKey, sectionValue]) => [sectionKey, normalizeSection(sectionValue, sectionKey)]),
  );

const normalizeBodyRows = (rows: any[] = []) =>
  rows.map((row, rowIndex) => ({
    ...row,
    id: row?.id || `body_row_${rowIndex}`,
    name: row?.name || `Row ${rowIndex + 1}`,
    bodySections: normalizeBodySections(row?.bodySections || {}),
  }));

const normalizeBodyTemplate = (template: any) => ({
  ...template,
  bodyRows: normalizeBodyRows(template?.bodyRows || [createDefaultRows()]),
});

const BodySlice = createSlice({
  name: "body",
  initialState: {
    INPUT_TYPES,
    allTemplates: [],
    allSavedBody: [],
    defaultBody: createDefaultBody(),
    defaultRows: createDefaultRows(),
    currentBody: createDefaultBody(),
    currentSavedBody: {},
  },
  reducers: {
    SetCurrentBody: (state: any, action: any) => {
      state.currentBody = normalizeBodyTemplate(action.payload || state.defaultBody);
    },
    SetCurrentSavedBody: (state: any, action: any) => {
      state.currentSavedBody = normalizeBodyTemplate(action.payload || {});
    },
    AddRows: (state: any) => {
      state.currentBody.bodyRows.push(createDefaultRows());
    },
    RemoveRows: (state: any, action: any) => {
      state.currentBody.bodyRows = state.currentBody.bodyRows.filter(
        (_: any, index: number) => index !== action.payload.rowIndex,
      );
    },
    AddBodySection: (state: any, action: any) => {
      const row = state.currentBody?.bodyRows?.[action.payload.bodyRowsIndex];

      if (!row) {
        return;
      }

      const nextSectionKey = String(Object.keys(row.bodySections || {}).length + 1);
      row.bodySections[nextSectionKey] = {
        width: Number(action.payload.width),
        inputs: [],
      };
    },
    RemoveBodySection: (state: any, action: any) => {
      const row = state.currentBody?.bodyRows?.[action.payload.bodyRowsIndex];

      if (row?.bodySections?.[action.payload.bodySectionIndex]) {
        delete row.bodySections[action.payload.bodySectionIndex];
      }
    },
    AddInputToBodySections: (state: any, action: any) => {
      const row = state.currentBody?.bodyRows?.[action.payload.bodyRowsIndex];
      const section = row?.bodySections?.[action.payload.bodySectionIndex];

      if (section) {
        section.inputs.push({
          id: `${action.payload.bodySectionIndex}-${Date.now()}`,
          type: action.payload.inputType.id,
          quantityField: false,
          quantityDataId: "",
          inputEntityTypeId: action.payload.inputType.id,
          inputEntityDataId: "",
        });
      }
    },
    RemoveInputFromBodySections: (state: any, action: any) => {
      const row = state.currentBody?.bodyRows?.[action.payload.bodyRowsIndex];
      const section = row?.bodySections?.[action.payload.bodySectionIndex];

      if (section) {
        section.inputs = section.inputs.filter(
          (_: any, index: number) => index !== action.payload.bodySectionInputIndex,
        );
      }
    },
    AddInputToBodySectionsForSavedData: (state: any, action: any) => {
      const row = state.currentSavedBody?.bodyRows?.[action.payload.bodyRowsIndex];
      const section = row?.bodySections?.[action.payload.bodySectionIndex];

      if (section) {
        section.inputs.push({
          id: `${action.payload.bodySectionIndex}-${Date.now()}`,
          type: action.payload.inputType.id,
          quantityField: false,
          quantityDataId: "",
          inputEntityTypeId: action.payload.inputType.id,
          inputEntityDataId: "",
        });
      }
    },
    RemoveInputFromBodySectionsForSavedData: (state: any, action: any) => {
      const row = state.currentSavedBody?.bodyRows?.[action.payload.bodyRowsIndex];
      const section = row?.bodySections?.[action.payload.bodySectionIndex];

      if (section) {
        section.inputs = section.inputs.filter((_: any, index: number) => index !== action.payload.inputIndex);
      }
    },
    HandleInputChange: (state: any, action: any) => {
      const row = state.currentSavedBody?.bodyRows?.[action.payload.bodyRowIndex];
      const section = row?.bodySections?.[action.payload.bodySectionIndex];

      if (section?.inputs?.[action.payload.inputIndex]) {
        section.inputs[action.payload.inputIndex].inputEntityDataId = action.payload.inputValue;
      }
    },
    HandleInputQuantityChange: (state: any, action: any) => {
      const row = state.currentSavedBody?.bodyRows?.[action.payload.bodyRowIndex];
      const section = row?.bodySections?.[action.payload.bodySectionIndex];

      if (section?.inputs?.[action.payload.inputIndex]) {
        section.inputs[action.payload.inputIndex].quantityDataId = action.payload.inputValue;
      }
    },
    EditQuantityField: (state: any, action: any) => {
      const row = state.currentBody?.bodyRows?.[action.payload.bodyRowIndex];
      const section = row?.bodySections?.[action.payload.bodySectionIndex];

      if (section?.inputs?.[action.payload.inputSectionIndex]) {
        section.inputs[action.payload.inputSectionIndex].quantityField = action.payload.quantityField;
      }
    },
    EditSavedQuantityField: (state: any, action: any) => {
      const row = state.currentSavedBody?.bodyRows?.[action.payload.bodyRowIndex];
      const section = row?.bodySections?.[action.payload.bodySectionIndex];

      if (section?.inputs?.[action.payload.inputSectionIndex]) {
        section.inputs[action.payload.inputSectionIndex].quantityField = action.payload.quantityField;
      }
    },
    AddTemplate: (state: any, action: any) => {
      state.allTemplates.push(action.payload);
      const allTemplates = getSavedList<any>("savedBodyTemplateList");
      allTemplates.push(action.payload);
      localStorage.setItem("savedBodyTemplateList", JSON.stringify(allTemplates));
    },
    EditBodyTemplate: (state: any, action: any) => {
      state.allTemplates = state.allTemplates.map((template: any) =>
        template.id === action.payload.bodyTemplateId ? action.payload.editedBodyTemplate : template,
      );

      const allTemplates = getSavedList<any>("savedBodyTemplateList");
      const updatedTemplates = allTemplates.map((template: any) =>
        template.id === action.payload.bodyTemplateId ? action.payload.editedBodyTemplate : template,
      );
      localStorage.setItem("savedBodyTemplateList", JSON.stringify(updatedTemplates));
    },
    AddSavedBody: (state: any, action: any) => {
      state.allSavedBody.push(action.payload);
      const allSavedBody = getSavedList<any>("savedBodyList");
      allSavedBody.push(action.payload);
      localStorage.setItem("savedBodyList", JSON.stringify(allSavedBody));
    },
    EditSavedBody: (state: any, action: any) => {
      state.allSavedBody = state.allSavedBody.map((body: any) =>
        body.id === action.payload.savedBodyId ? action.payload.editedSavedBody : body,
      );

      const allSavedBody = getSavedList<any>("savedBodyList");
      const updatedSavedBody = allSavedBody.map((body: any) =>
        body.id === action.payload.savedBodyId ? action.payload.editedSavedBody : body,
      );
      localStorage.setItem("savedBodyList", JSON.stringify(updatedSavedBody));
    },
  },
});

export const {
  SetCurrentBody,
  SetCurrentSavedBody,
  AddRows,
  RemoveRows,
  AddBodySection,
  RemoveBodySection,
  AddInputToBodySections,
  RemoveInputFromBodySections,
  AddInputToBodySectionsForSavedData,
  RemoveInputFromBodySectionsForSavedData,
  HandleInputChange,
  HandleInputQuantityChange,
  EditQuantityField,
  EditSavedQuantityField,
  AddTemplate,
  EditBodyTemplate,
  AddSavedBody,
  EditSavedBody,
} = BodySlice.actions;

export default BodySlice.reducer;
