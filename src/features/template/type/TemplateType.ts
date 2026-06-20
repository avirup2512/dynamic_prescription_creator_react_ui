import type { INPUT_TYPE } from "../../../constant/inputType.enum";
import { FORMAT } from "../../../constant/globalType";
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
export type templateInputGroup = {
  id: string,
  name?: string,
  input_group_order?: number,
  inputs?: Array<ColumnInputItem>
}
export type Column = {
  id: string,
  name?: string,
  width?: string,
  inputGroup?: Array<templateInputGroup>
}
export type Rows = {
  id: string,
  name: string,
  columns: Column[]
}
export type Section = {
  id: string,
  name: string,
  SectionOrder?: number,
  rows: Array<Rows>
  createdAt?: string,
  isVisible: boolean
}
export type TemplateDataType = {
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
