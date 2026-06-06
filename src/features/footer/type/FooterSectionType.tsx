export type InputTypeItem = {
  id: string
  inputTypeId: string
  name: string
}

export type FooterSection = {
  id: string
  title: string
  inputs?: InputTypeItem[]
}

export type FooterSectionItem = {
  id: string
  title: string
  sections: FooterSection[]
}
