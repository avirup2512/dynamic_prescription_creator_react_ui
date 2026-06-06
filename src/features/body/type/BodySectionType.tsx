import type { InputType } from "../../../constant/inputType.enum";

export type BodyInputItem = {
  id: string
  type: InputType
  quantityField: boolean
  quantityDataId: string
  quantityTextValue?: string
  inputEntityTypeId?: InputType
  inputEntityDataId?: string
}

export type BodySectionData = {
  width: number
  inputs: BodyInputItem[]
}

export type BodySectionObject = {
  1?:BodySectionData,
  2?:BodySectionData,
  3?:BodySectionData,
}

export type BodyRows = {
  id: string
  name: string
  bodySections: BodySectionObject
}

export type BodyTemplates = {
  id: string
  name: string
  bodyRows: BodyRows[]
}

export type SavedBodyInputEntity = {
  id?: string
  type?: InputType
  quantityField?: boolean
  quantityDataId?: string
  quantityTextValue?: string
  inputEntityDataId?: string
  inputEntityTypeId?: InputType
}

export type SavedBody = {
  name: string
  id: string
  templateId: string
  bodyRows: BodyRows[]
}
