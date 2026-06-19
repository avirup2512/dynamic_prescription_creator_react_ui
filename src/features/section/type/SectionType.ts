import type { INPUT_TYPE } from "../../../constant/inputType.enum";
import { FORMAT } from "../../../constant/globalType";
export type InputType = typeof INPUT_TYPE[keyof typeof INPUT_TYPE]
export type FormatType = typeof FORMAT[keyof typeof FORMAT]
export type  Format = {
    id:string,
    name:string
    type:FormatType
}
export type ColumnInputItem = {
  id: string
  type: InputType,
  label?: string
  show_label?: boolean
  show_quantity?: boolean
  quantity_id?:string
  inputEntityTypeId?: string,
  input_order?: number,
  input_entity_id?: string,
  formatArray?: Array<Format>
  is_bold?: boolean,
  extra_note?: boolean,
  font_size?: number,
}
export type InputGroup = {
  input_group_order: number,
  section_group_id?: string,
  inputs: Array<ColumnInputItem>
}
export type Column = {
  id: string,
  name?: string,
  width?: string,
  column_order?: number,
  inputGroup?:Array<InputGroup>
}
export type Rows = {
  id:string,
  name: string,
  row_order?: number,
  columns:Column[]
}
export type SectionTemplate = {
  id:string,
  name:string,
  rows:Array<Rows>
  createdAt?:string,
}
export type SectionData = {
  templates:Array<SectionTemplate>
}

