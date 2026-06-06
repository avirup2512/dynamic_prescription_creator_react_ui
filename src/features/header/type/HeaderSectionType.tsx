export type HeaderInputType = INPUT_TYPE.INPUTTYPE_1 | INPUT_TYPE.INPUTTYPE_2 | INPUT_TYPE.INPUTTYPE_3

export type HeaderInputItem = {
  id: string
  type: HeaderInputType,
  showLabel?: boolean
  quantityField: boolean
  quantityDataId:string
  inputEntityTypeId?: string
  inputEntityDataId?: string
}
export type HeaderSectionsData = {
  width:any,
  inputs:Array<HeaderInputItem>
}
export type HeaderSectionObject = {
  1?:HeaderSectionsData,
  2?:HeaderSectionsData,
  3?:HeaderSectionsData,
}
export type HeaderRows = {
  id:string,
  name:string,
  headerSections:HeaderSectionObject
}
export type HeaderTemplates = {
  id:string,
  name:string,
  headerRows:Array<HeaderRows>
}
export type HeaderData = {
  templates:Array<HeaderTemplates>
}
// TYPE FOR SAVED HEADER STRATS
export type  SavedHeaderInputEntity= {
  inputEntityDataId?:string,
  inputEntityTypeId?:string
}
export type SavedHeaderSection = {
  1?:Array<SavedHeaderInputEntity>,
  2?:Array<SavedHeaderInputEntity>,
  3?:Array<SavedHeaderInputEntity>
}
export type SavedHeader = {
  name:string,
  id:string,
  templateId:string,
  headerRows:Array<SavedHeaderSection>
}
// TYPE FOR SAVED HEADER ENDS
