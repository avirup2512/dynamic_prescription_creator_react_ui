import type { INPUT_TYPE } from "../../../constant/inputType.enum";
import { FORMAT } from "../../../constant/globalType";
import type { FieldGeneralConfig, FieldLogicConfig, FieldStyleConfig } from "./FieldType";
import { TEMPLATE_OPERATION } from "@/constant/template-operation.enum";

export type InputType = typeof INPUT_TYPE[keyof typeof INPUT_TYPE]
export type FormatType = typeof FORMAT[keyof typeof FORMAT]
export type Format = {
  id: string,
  name: string
  type: FormatType
}
export type ColumnInputItem = {
  id: string
  template_input_id: string,
  type: InputType,
  input_type_name?: string,
  label?: string
  input_name?: string
  show_label?: boolean
  is_bold?: boolean
  extra_note?: boolean
  font_size?: string
  show_quantity?: boolean
  template_input_quantity_id?: string,
  template_quantity_name?: string,
  quantity_option_values?: Array<any>
  quantity_option_id?: string
  template_input_quantity_option_id?: string,
  quantityTextValue?: string
  template_quantity_value?: string,
  input_entity_value?: string,
  input_entity_name?: string,
  template_input_value?: string,
  extra_note_value?: string,
  template_input_extranotes?: string,
  value?: string,
  dropdown_option_values?: Array<any>
  dropdown_option_id?: string
  dropdown_option_value?: string
  inputEntityTypeId?: string
  input_entity_id?: string,
  formatArray?: Array<Format>
  is_visible?: boolean,
  general?: FieldGeneralConfig;
  style?: FieldStyleConfig;
  logic?: FieldLogicConfig;
  status?: string,
  template_quantity_type_single?: number,
  template_quantity_valueFrom?: string,
  template_quantity_valueTo?: string,
  previous_related_input_id?: string
  condition_with_previous_input_name?: string
}
export type InputGroup = {
  template_input_group_id: string,
  condition_with_previous_input_group_name?: string,
  input_group_order: number;
  name?: string,
  relation?: "or";
  inputs?: Array<ColumnInputItem>
}
export type Column = {
  template_column_id: string,
  column_order: number;
  name?: string,
  width?: string,
  inputGroup?: Array<InputGroup>
}
export type Rows = {
  template_row_id: string,
  name: string,
  row_order: number,
  columns: Column[]
}
export type Section = {
  id?: string,
  section_id: string,
  template_section_id: string,
  name: string,
  section_order?: number,
  style?: any;
  rows: Array<Rows>
  createdAt?: string,
  isVisible: boolean
}
export type Template = {
  id: string,
  name: string,
  created_by?: string,
  created_at?: string,
  show_header?: boolean,
  show_body?: boolean,
  show_footer?: boolean,
  header: Section[]
  body: Section[]
  footer?: Section[]
}


export type TemplateArea = "header" | "body" | "footer";


export interface Field {
  id: string;

  type: FieldType;

  label: string;
  placeholder?: string;
  description?: string;

  general?: FieldGeneralConfig;
  style?: FieldStyleConfig;
  logic?: FieldLogicConfig;
}

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "phone"
  | "email"
  | "select"
  | "checkbox"
  | "radio"
  | "medicine"
  | "diagnosis"
  | "advice";

export type UpdateTemplateType = {
  UpdatedSections: Array<any>,
  UpdatedRows: Array<any>,
  UpdatedColumns: Array<any>,
  UpdatedInputGroups: Array<any>,
  UpdatedInputs: Array<any>,
}

export const TEMPLATEENTITYTYPE = {
  SECTION: "section",
  ROW: "row",
  COLUMN: "column",
  GROUP: "group",
  INPUT: "input",
} as const;
export type ConditionType =
  (typeof TEMPLATEENTITYTYPE)[keyof typeof TEMPLATEENTITYTYPE];

const ENTITY_CONFIG = {

  [TEMPLATEENTITYTYPE.SECTION]: {

    list: "UpdatedSections",

    nestedKey: "section",

    idKey: "template_section_id",

    addType: TEMPLATE_OPERATION.SECTION_ADD,

    updateType: TEMPLATE_OPERATION.SECTION_UPDATE,

    removeType: TEMPLATE_OPERATION.SECTION_REMOVE,

  },

  [TEMPLATEENTITYTYPE.ROW]: {

    list: "UpdatedRows",

    nestedKey: "row",

    idKey: "template_row_id",

    addType: TEMPLATE_OPERATION.ROW_ADD,

    updateType: TEMPLATE_OPERATION.ROW_UPDATE,

    removeType: TEMPLATE_OPERATION.ROW_REMOVE,

  },

  [TEMPLATEENTITYTYPE.COLUMN]: {

    list: "UpdatedColumns",

    nestedKey: "column",

    idKey: "template_column_id",

    addType: TEMPLATE_OPERATION.COLUMN_ADD,

    updateType: TEMPLATE_OPERATION.COLUMN_UPDATE,

    removeType: TEMPLATE_OPERATION.COLUMN_REMOVE,

  },

  [TEMPLATEENTITYTYPE.GROUP]: {

    list: "UpdatedInputGroups",

    nestedKey: "inputGroup",

    idKey: "template_input_group_id",

    addType: TEMPLATE_OPERATION.GROUP_ADD,

    updateType: TEMPLATE_OPERATION.GROUP_UPDATE,

    removeType: TEMPLATE_OPERATION.GROUP_REMOVE,

  },

  [TEMPLATEENTITYTYPE.INPUT]: {

    list: "UpdatedInputs",

    nestedKey: "input",

    idKey: "template_input_id",

    addType: TEMPLATE_OPERATION.INPUT_ADD,

    updateType: TEMPLATE_OPERATION.INPUT_UPDATE,

    removeType: TEMPLATE_OPERATION.INPUT_REMOVE,

  }

};