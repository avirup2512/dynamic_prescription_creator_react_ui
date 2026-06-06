import { createSlice } from "@reduxjs/toolkit";

const HeaderSlice = createSlice({
  name: "counter",
  initialState: {
    allHeaderTemplates:[],
    defaultHeader: {
      id:"untitled",
      name:"untitled",
      headerRows:[
        {
          id:"untitled_header_rows",
          name:"untitled_header_rows",
          headerSections:{
          }
        }
      ]
    },
    defaultRows:{
          id:"untitled_header_rows",
          name:"untitled_header_rows",
          headerSections:{
          }
    },
    currentHeader: {},
  },
  reducers: {
    SetCurrentHeader:(state:any,action:any)=>{
      state.currentHeader= action.payload;
    },
    SetCurrentSavedHeader:(state:any,action:any)=>{      
      state.currentSavedHeader = action.payload;
      if(state.currentSavedHeader?.headerRows && state.currentSavedHeader?.headerRows.length > 0)
          {
            state.currentSavedHeader?.headerRows.forEach((e:any)=>{
              if(e?.headerSections)
              {
                for(let x in e.headerSections)
                {
                  if(e.headerSections[x] && e.headerSections[x].length )
                  {
                    e.headerSections[x].forEach((i:any)=>{
                      i.inputEntityTypeId = i?.type;
                      i.inputEntityDataId = i.inputEntityDataId ? i.inputEntityDataId : "";
                    })
                  }
                }
              }
            })
          }
    },
    AddRows:(state:any)=>{
      state.currentHeader.headerRows.push(state.defaultRows);
    },
    AddInputToSections:(state:any,action:any)=>{
      state.currentHeader.headerRows[action.payload.headerRowsIndex].headerSections[action.payload.headerSectionIndex]?.inputs.push(action.payload.inputType);
    },
    RemoveInputFromSections:(state:any,action:any)=>{
      state.currentHeader.headerRows[action.payload.headerRowsIndex].headerSections[action.payload.headerSectionIndex].inputs = 
      state.currentHeader.headerRows[action.payload.headerRowsIndex].headerSections[action.payload.headerSectionIndex]?.inputs?.filter((input:any,i:number) => i !== action.payload.headerSectionInputIndex)
    },
    RemoveRows:(state:any,action:any)=>{
      state.currentHeader.headerRows = state.currentHeader.headerRows.filter((rows:any,i:number) => i !== action.payload.rowIndex)
    },
    AddHeaderTemplate:(state:any,action:any)=>{
      state.allTemplates.push(action.payload);
      const allTemplate = JSON.parse(localStorage.getItem("savedTemplateList")) || [];
      allTemplate.push(action.payload);
      localStorage.setItem("savedTemplateList",JSON.stringify(allTemplate));
    },
    EditHeaderTemplate:(state:any,action:any)=>{
      let currentTemplate = state.allTemplates.find((t:any)=> t.id == action.payload.headerTemplateId);
      currentTemplate = action.payload.editedHeaderTemplate;
      state.allTemplates.forEach((t:any)=>{
        if(t.id == action.payload.headerTemplateId)
          t = currentTemplate;
      })
      const allTemplate = JSON.parse(localStorage.getItem("savedTemplateList")) || [];      
      const updatedTemplate = allTemplate.map((t:any)=> t.id == action.payload.headerTemplateId ? currentTemplate : t);
      localStorage.setItem("savedTemplateList",JSON.stringify(updatedTemplate));
    },
    AddSavedHeader:(state:any,action:any)=>{
      state.allSavedHeader.push(action.payload);
      const allTemplate = JSON.parse(localStorage.getItem("savedHeaderList")) || [];
      allTemplate.push(action.payload);
      localStorage.setItem("savedHeaderList",JSON.stringify(allTemplate));
    },
    EditSavedHeader:(state:any,action:any)=>{
      let currentSavedHeader = state.allSavedHeader.find((t:any)=> t.id == action.payload.savedHeaderId);
      currentSavedHeader = action.payload.editedSavedHeader;
      state.allSavedHeader.forEach((t:any)=>{
        if(t.id == action.payload.savedHeaderId)
          t = currentSavedHeader;
      })
      const allSavedHeaderList = JSON.parse(localStorage.getItem("savedHeaderList")) || [];      
      const updatedSavedHeader = allSavedHeaderList.map((t:any)=> t.id == action.payload.savedHeaderId ? currentSavedHeader : t);
      localStorage.setItem("savedHeaderList",JSON.stringify(updatedSavedHeader));
    },
    AddInputToHeaderSectionsForSavedData:(state:any,action:any) => {            
      if(state?.currentSavedHeader?.headerRows[action.payload.headerRowIndex]?.headerSections?.[action.payload.headerSectionIndex])
      {
        state.currentSavedHeader.headerRows[action.payload.headerRowIndex].headerSections[action.payload.headerSectionIndex]?.inputs?.push(action.payload.inputType);
      }
    },
    RemoveInputFromHeaderSectionsForSavedData:(state:any,action:any) => {            
      if(state?.currentSavedHeader?.headerRows[action.payload.headerRowIndex]?.headerSections?.[action.payload.headerSectionIndex]?.inputs)
      {
        state.currentSavedHeader.headerRows[action.payload.headerRowIndex].headerSections[action.payload.headerSectionIndex].inputs = 
        state.currentSavedHeader.headerRows[action.payload.headerRowIndex].headerSections[action.payload.headerSectionIndex].inputs.filter((e:any,index:number) => index !== action.payload.inputIndex)
      }
    },
    HandleInputChange:(state:any,action:any) => {  
      if(state?.currentSavedHeader?.headerRows[action.payload.headerRowIndex]?.headerSections?.[action.payload.headerSectionIndex]?.inputs)
      {
        state.currentSavedHeader.headerRows[action.payload.headerRowIndex].headerSections[action.payload.headerSectionIndex].inputs[action.payload.inputIndex].inputEntityDataId = action.payload.inputValue;
      }
    },
    HandleInputQuantityChange:(state:any,action:any) => {  
      if(state?.currentSavedHeader?.headerRows[action.payload.headerRowIndex]?.headerSections?.[action.payload.headerSectionIndex]?.inputs)
      {
        state.currentSavedHeader.headerRows[action.payload.headerRowIndex].headerSections[action.payload.headerSectionIndex].inputs[action.payload.inputIndex].quantityDataId = action.payload.inputValue;
      }
    },
    EditSavedQuantityFieldInHeader: (state: any, action: any) => {
      const row = state.currentSavedHeader?.headerRows?.[action.payload.headerRowIndex];
      const section = row?.headerSections?.[action.payload.headerSectionIndex];

      if (section?.inputs?.[action.payload.inputSectionIndex]) {
        section.inputs[action.payload.inputSectionIndex].quantityField = action.payload.quantityField;
      }
    },
    AddHeaderSection:(state:any,action:any) => {
      if(state?.currentHeader?.headerRows[action.payload.headerRowsIndex].hasOwnProperty('headerSections'))
      {
        console.log(action.payload);
        state.currentHeader.headerRows[action.payload.headerRowsIndex].headerSections[action.payload.headerSectionIndex] = {
          width:action.payload.width,
          inputs:[]
        }
      }
    },
    RemoveHeaderSection:(state:any,action:any) => {
      if(state?.currentHeader?.headerRows[action.payload.headerRowIndex]?.headerSections)
      {
        delete state.currentHeader.headerRows[action.payload.headerRowIndex].headerSections[action.payload.headerSectionIndex]
      }
    },
    EditQuantityFieldInHeader: (state: any, action: any) => {
      console.log(action.payload);
      const row = state.currentHeader?.headerRows?.[action.payload.headerRowIndex];
      const section = row?.headerSections?.[action.payload.headerSectionIndex];

      if (section?.inputs?.[action.payload.inputSectionIndex]) {
        section.inputs[action.payload.inputSectionIndex].quantityField = action.payload.quantityField;
      }
    },
  },
});

export const { SetCurrentHeader,SetCurrentSavedHeader,AddRows, AddInputToSections,RemoveRows,AddHeaderTemplate,AddSavedHeader,RemoveInputFromSections,EditHeaderTemplate, AddInputToHeaderSectionsForSavedData,RemoveInputFromHeaderSectionsForSavedData,HandleInputChange,EditSavedHeader,AddHeaderSection,RemoveHeaderSection,EditQuantityFieldInHeader,HandleInputQuantityChange,EditSavedQuantityFieldInHeader } = HeaderSlice.actions;

export default HeaderSlice.reducer;