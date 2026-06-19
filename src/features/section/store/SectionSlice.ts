import { createSlice } from "@reduxjs/toolkit";

const SectionSlice = createSlice({
  name: "section",
  initialState: {
    allSectionTemplates:[],
    defaultSection: {
      id:"untitled-section",
      name:"untitled-section",
      rows:[
        {
          id:"untitled_header_rows",
          name:"untitled_header_rows",
          row_order: 1,
          columns:[ {
          id:"untitled_column",
          name:"untitled_column",
          width: 100,
          inputGroup:[]
        }]
    }
      ]
    },
    defaultRows:{
          id:"untitled_header_rows",
          name:"untitled_header_rows",
          row_order: 1,
          columns:[ {
          id:"untitled_column",
          name:"untitled_column",
          width: 100,
          inputGroup:[]
        }]
    },
    defaultColumn: {
      id:"untitled_column",
      name:"untitled_column",
      width: 100,
      column_order: 0,
      inputGroup:[]
    },
    currentSection: {},
  },
  reducers: {
    SetCurrentSection:(state:any,action:any)=>{
      state.currentSection = action.payload;
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
                      i.input_entity_id = i.input_entity_id ? i.input_entity_id : "";
                    })
                  }
                }
              }
            })
          }
    },
    SetSectionName: (state: any, action: any) => {
      const { name } = action.payload;
      state.currentSection.name = name;
    },
    AddRowsToSection: (state: any) => {
      state.currentSection.rows.push(state.defaultRows);
    },
    EditSectionName:(state:any,action:any)=>{
      state.currentSection.name = action.payload;
    },
    EditSectionRowsName:(state:any,action:any)=>{
      if(state.currentSection?.rows && state.currentSection?.rows?.[action.payload.rowIndex])
        state.currentSection.rows[action.payload.rowIndex].name = action.payload.rowName;
    },
    AddInputToSections: (state: any, action: any) => {
      console.log(action.payload)
      const { rowIndex, columnIndex, input, inputGroupIndex, sameGroup } = action.payload;
      let lastInsertIndex = inputGroupIndex;
      if(state.currentSection?.rows?.[rowIndex]?.columns?.[columnIndex]?.inputGroup )
      {
        if (sameGroup)
        {
          if(state.currentSection?.rows?.[rowIndex]?.columns?.[columnIndex]?.inputGroup[inputGroupIndex] && state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup[inputGroupIndex].inputs)
          {
            state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup[inputGroupIndex].inputs.push(input);
          }
        } else {
          if(!state.currentSection?.rows?.[rowIndex]?.columns?.[columnIndex]?.inputGroup)
          state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup = [];
          const inputGroup = {id:'group'+Date.now() ,input_group_order: state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup.length+1, inputs: [input]};
          state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup.push(inputGroup);
          lastInsertIndex = state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup.length - 1;
        }
        state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup[lastInsertIndex].inputs.forEach((input: any, index: number) => {
          input.input_order = index + 1;
        })
      }
    },
    DeleteColumn:(state:any,action:any)=>{
      const { columnIndex, rowIndex } = action.payload;
      if(state.currentSection?.rows?.[rowIndex]?.columns)
      {
        state.currentSection.rows[rowIndex].columns = state.currentSection.rows[rowIndex].columns.filter((e:any,i:number) => i !== columnIndex)
      }
    },
    RemoveInputGroupFromSections: (state: any, action: any) => {
      const { rowIndex, columnIndex, inputGroupIndex } = action.payload;
      console.log(action.payload)
      if(state.currentSection?.rows?.[rowIndex]?.columns?.[columnIndex]?.inputGroup)
      state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup = 
      state.currentSection.rows[rowIndex].columns[columnIndex]?.inputGroup?.filter((input:any,i:number) => i !== inputGroupIndex)
    },
    RemoveInputFromSections: (state: any, action: any) => {
      const { rowIndex, columnIndex, inputIndex,inputGroupIndex } = action.payload;
      if(state.currentSection?.rows?.[rowIndex]?.columns?.[columnIndex]?.inputGroup && state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup[inputGroupIndex] && state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup[inputGroupIndex]?.inputs)
      state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup[inputGroupIndex].inputs = 
      state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup[inputGroupIndex]?.inputs?.filter((input:any,i:number) => i !== inputIndex)
    },
    AddCoulmnToSection: (state: any, action: any) => {
      const { columnData, rowIndex } = action.payload;
      if(state.currentSection?.rows && state.currentSection?.rows?.[rowIndex]) {
        state.currentSection.rows[rowIndex].columns.push(columnData);
      }
    },
    UpdateWidthOfColumn: (state: any, action: any) => {
      const { width, rowIndex } = action.payload;
      if (state.currentSection?.rows && state.currentSection?.rows?.[rowIndex] && state.currentSection?.rows?.[rowIndex].columns && state.currentSection?.rows?.[rowIndex].columns.length > 0) {
        state.currentSection?.rows?.[rowIndex].columns.forEach((e: any) => {
          e.width = width;
        })
      }
    },
    RemoveRows: (state: any, action: any) => {
      const { rowIndex } = action.payload;
      state.currentSection.rows = state.currentSection.rows.filter((rows: any, i: number) => i !== rowIndex)
    },
    AddSectionTemplate:(state:any,action:any)=>{
      state.allSectionTemplates.push(action.payload);
      const allTemplate = JSON.parse(localStorage.getItem("savedTemplateList") || "[]");
      allTemplate.push(action.payload);
      localStorage.setItem("savedTemplateList",JSON.stringify(allTemplate));
    },
    EditSectionTemplate:(state:any,action:any)=>{
      let currentTemplate = state.allSectionTemplates.find((t:any)=> t.id == action.payload.sectionTemplateId);
      currentTemplate = action.payload.editedSectionTemplate;
      state.allSectionTemplates.forEach((t:any)=>{
        if(t.id == action.payload.sectionTemplateId)
          t = currentTemplate;
      })
      const allTemplate = JSON.parse(localStorage.getItem("savedTemplateList")) || [];      
      const updatedTemplate = allTemplate.map((t:any)=> t.id == action.payload.sectionTemplateId ? currentTemplate : t);
      localStorage.setItem("savedTemplateList",JSON.stringify(updatedTemplate));
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
    HandleInputChange: (state: any, action: any) => {  
      const { rowIndex, columnIndex, inputGroupIndex, inputIndex, inputValue } = action.payload;
      if(state?.currentSection?.rows[rowIndex]?.columns?.[columnIndex]?.inputGroup?.[inputGroupIndex]?.inputs?.[inputIndex])
      {
        state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup[inputGroupIndex].inputs[inputIndex].input_entity_id = inputValue;
      }
    },
    HandleInputQuantityChange: (state: any, action: any) => {  
      const { rowIndex, columnIndex, inputGroupIndex, inputIndex, inputValue } = action.payload;
      if(state?.currentSection?.rows[rowIndex]?.columns?.[columnIndex]?.inputGroup?.[inputGroupIndex]?.inputs?.[inputIndex])
      {
        state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup[inputGroupIndex].inputs[inputIndex].quantity_id = inputValue;
      }
    },
    EditSavedQuantityFieldInSection: (state: any, action: any) => {
      const row = state.currentSavedHeader?.headerRows?.[action.payload.headerRowIndex];
      const section = row?.headerSections?.[action.payload.headerSectionIndex];

      if (section?.inputs?.[action.payload.inputSectionIndex]) {
        section.inputs[action.payload.inputSectionIndex].show_quantity = action.payload.show_quantity;
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
    EditQuantityFieldInSection: (state: any, action: any) => {
      const { rowIndex, columnIndex, inputIndex,inputGroupIndex, show_quantity } = action.payload;
      if (state?.currentSection?.rows?.[rowIndex]?.columns?.[columnIndex]?.inputGroup?.[inputGroupIndex]?.inputs?.[inputIndex]) {
        state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup[inputGroupIndex].inputs[inputIndex].show_quantity = show_quantity;
      }
    },
    EditShowLabelInSection: (state: any, action: any) => {
      const { rowIndex, columnIndex, inputIndex,inputGroupIndex, show_label } = action.payload;
      console.log(action.payload)
      if (state?.currentSection?.rows?.[rowIndex]?.columns?.[columnIndex]?.inputGroup?.[inputGroupIndex]?.inputs?.[inputIndex]) {
        state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup[inputGroupIndex].inputs[inputIndex].show_label = show_label;
      }
    },
    recalculateRowOrder: (state: any) => {
      console.log("GHUSH")
      state.currentSection.rows.forEach((row:any,index:number)=>{
        row.row_order = index + 1;
      })
    },
    recalculateColumnOrder: (state: any, action: any) => {
      const { rowIndex } = action.payload;
      state.currentSection.rows[rowIndex].columns.forEach((column: any, index: number) => {
        column.column_order = index + 1;
      })
    },
    recalculateInputOrder: (state: any, action: any) => {
      const { rowIndex, columnIndex } = action.payload;
      state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup.forEach((inputGroup: any) => {
        inputGroup.inputs.forEach((input: any, index: number) => {
          input.input_order = index + 1;
        });
      });
    },
    UpdateIsBoldInSection: (state: any, action: any) => {
      const { rowIndex, columnIndex, inputIndex,inputGroupIndex, is_bold } = action.payload;
      console.log(action.payload)
      if (state.currentSection?.rows && state.currentSection?.rows?.[rowIndex] && state.currentSection?.rows?.[rowIndex].columns && state.currentSection?.rows?.[rowIndex].columns?.[columnIndex] && state.currentSection?.rows?.[rowIndex].columns[columnIndex]?.inputGroup && state.currentSection?.rows?.[rowIndex].columns[columnIndex]?.inputGroup?.[inputGroupIndex]?.inputs?.[inputIndex]) {
        state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup[inputGroupIndex].inputs[inputIndex].is_bold = is_bold;
      }
    },
    UpdateFontSizeInSection: (state: any, action: any) => {
      const { rowIndex, columnIndex, inputIndex,inputGroupIndex, font_size } = action.payload;
      if (state.currentSection?.rows && state.currentSection?.rows?.[rowIndex] && state.currentSection?.rows?.[rowIndex].columns && state.currentSection?.rows?.[rowIndex].columns?.[columnIndex] && state.currentSection?.rows?.[rowIndex].columns[columnIndex]?.inputGroup && state.currentSection?.rows?.[rowIndex].columns[columnIndex]?.inputGroup?.[inputGroupIndex]?.inputs?.[inputIndex]) {
        state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup[inputGroupIndex].inputs[inputIndex].font_size = font_size;
      }
    },
    UpdateExtraNoteInSection: (state: any, action: any) => {
      const { rowIndex, columnIndex, inputIndex,inputGroupIndex, extra_note } = action.payload;
      if (state.currentSection?.rows && state.currentSection?.rows?.[rowIndex] && state.currentSection?.rows?.[rowIndex].columns && state.currentSection?.rows?.[rowIndex].columns?.[columnIndex] && state.currentSection?.rows?.[rowIndex].columns[columnIndex]?.inputGroup && state.currentSection?.rows?.[rowIndex].columns[columnIndex]?.inputGroup?.[inputGroupIndex]?.inputs?.[inputIndex]) {
        state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup[inputGroupIndex].inputs[inputIndex].extra_note = extra_note;
      }
    },
    AddSameInputInColumn:(state: any, action: any) => {
      const { rowIndex, columnIndex, inputGroupIndex, input, sameGroup } = action.payload;
        if (state.currentSection?.rows && state.currentSection?.rows?.[rowIndex] && state.currentSection?.rows?.[rowIndex].columns && state.currentSection?.rows?.[rowIndex].columns?.[columnIndex] && state.currentSection?.rows?.[rowIndex].columns[columnIndex]?.inputGroup) {
          delete input.input_id;
          if (sameGroup)
          {
            state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup[inputGroupIndex].inputs.push(input);
             state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup[inputGroupIndex].inputs.forEach((item: any, idx: number) => {
                item.input_order = idx + 1; // or idx if you use 0-based ordering
            });
          } else {
            const inputGroup = {id:'group'+Date.now(),input_group_order: state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup.length+1, inputs: [input]};
            state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup.push(inputGroup);
            const lastIndex = state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup.length - 1;
            state.currentSection.rows[rowIndex].columns[columnIndex].inputGroup[lastIndex].inputs.forEach((item: any, idx: number) => {
                item.input_order = idx + 1; // or idx if you use 0-based ordering
            });
          }
        }
    },
  },
});

export const { SetCurrentSection,SetCurrentSavedHeader,AddRowsToSection, AddInputToSections,RemoveRows,AddCoulmnToSection,AddSectionTemplate,RemoveInputFromSections,EditSectionTemplate, AddInputToHeaderSectionsForSavedData,RemoveInputFromHeaderSectionsForSavedData,HandleInputChange,AddHeaderSection,RemoveHeaderSection,EditQuantityFieldInSection,HandleInputQuantityChange,EditSavedQuantityFieldInSection,EditSectionName,EditSectionRowsName,UpdateWidthOfColumn,DeleteColumn,recalculateRowOrder,recalculateColumnOrder,recalculateInputOrder,EditShowLabelInSection,SetSectionName,UpdateIsBoldInSection,UpdateFontSizeInSection,UpdateExtraNoteInSection,AddSameInputInColumn,RemoveInputGroupFromSections } = SectionSlice.actions;

export default SectionSlice.reducer;