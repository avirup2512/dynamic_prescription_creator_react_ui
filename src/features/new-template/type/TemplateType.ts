import type { INPUT_TYPE } from "../../../constant/inputType.enum";
import { FORMAT } from "../../../constant/globalType";
import type { FieldGeneralConfig, FieldLogicConfig, FieldStyleConfig } from "./FieldType";
export type InputType = typeof INPUT_TYPE[keyof typeof INPUT_TYPE]
export type FormatType = typeof FORMAT[keyof typeof FORMAT]
export type Format = {
  id: string,
  name: string
  type: FormatType
}
export type ColumnInputItem = {
  id: string
  type: InputType,
  input_type_name?: string,
  label?: string
  show_label?: boolean
  is_bold?: boolean
  extra_note?: boolean
  font_size?: string
  show_quantity?: boolean
  quantity_id?: string,
  quantity_name?: string,
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
}
export type InputGroup = {
  template_input_group_id: string,
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