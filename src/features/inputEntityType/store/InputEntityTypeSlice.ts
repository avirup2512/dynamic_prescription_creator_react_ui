import { INPUT_TYPE } from "../../../constant/inputType.enum";
import { createSlice } from "@reduxjs/toolkit";

const InputEntityTypeSlice = createSlice({
  name: "counter",
  initialState: {
    inputEntityTypeArray:[
        {id:INPUT_TYPE.INPUTTYPE_1,name:"input"},
        {id:INPUT_TYPE.INPUTTYPE_2,name:"dropdown"},
        {id:INPUT_TYPE.INPUTTYPE_3,name:"textbox"}
    ],
    savedInputEntityData:{
        input:[],
        dropdown:[],
        textbox:[],
        quantity:[]
    }
  },
  reducers: {
    AddInput:(state:any,action:any)=>{
      state.savedInputEntityData.input.push(action.payload);
      const allTemplate = JSON.parse(localStorage.getItem("savedInputList")) || [];
      allTemplate.push(action.payload);
      localStorage.setItem("savedInputList",JSON.stringify(allTemplate));
    },
    AddDropdown:(state:any,action:any)=>{
      state.savedInputEntityData.dropdown.push(action.payload);
      const allTemplate = JSON.parse(localStorage.getItem("savedDropdownList")) || [];
      allTemplate.push(action.payload);
      localStorage.setItem("savedDropdownList",JSON.stringify(allTemplate));
    },
    AddQuantity:(state:any,action:any)=>{
      state.savedInputEntityData.quantity.push(action.payload);
      const allTemplate = JSON.parse(localStorage.getItem("savedQuantityList")) || [];
      allTemplate.push(action.payload);
      localStorage.setItem("savedQuantityList",JSON.stringify(allTemplate));
    },
    AddTextBox:(state:any,action:any)=>{
      state.savedInputEntityData.textbox.push(action.payload);
    }
  }
});

export const { AddInput,AddDropdown,AddQuantity,AddTextBox } = InputEntityTypeSlice.actions;

export default InputEntityTypeSlice.reducer;