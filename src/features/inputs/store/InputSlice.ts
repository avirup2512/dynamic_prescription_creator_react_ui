import { createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";

const InputSlice = createSlice({
    name: "counter",
    initialState: {
        selectedInput: {},
        allInputs: [],
        searchItems: [],
    },
    reducers: {
        setSelectedInput: (state: any, action: any) => {
            state.selectedInput = action.payload;
        },
        setAllInputs: (state: any, action: any) => {
            state.allInputs = action.payload;
            state.searchItems = action.payload;
        },
        addNewInput: (state: any, action: any) => {
            state.allInputs.push(action.payload);
            state.searchItems.push(action.payload);
        },
        updateInput: (state: any, action: any) => {
            const { selectedId, patch } = action.payload;
            // state.selectedInput = { ...state.selectedInput, ...patch };
            const index = state.allInputs.findIndex((i: any) => i.id === selectedId);
            if (index !== -1) {
                const updatedItem = { ...state.allInputs[index], ...patch };
                state.allInputs[index] = updatedItem;
            }
            const searchIndex = state.searchItems.findIndex((i: any) => i.id === selectedId);
            if (searchIndex !== -1) {
                const updatedSearchItem = { ...state.searchItems[searchIndex], ...patch };
                state.searchItems[searchIndex] = updatedSearchItem;
            }
        },
        deleteInput: (state: any, action: any) => {
            const idToDelete = action.payload;
            state.allInputs = state.allInputs.filter((item: any) => item.id !== idToDelete);
            state.searchItems = state.searchItems.filter((item: any) => item.id !== idToDelete);
        },
        setSearchItems: (state: any, action: any) => {
            state.searchItems = action.payload;
        },
        updateInputAfterSaveAPICall: (state: any, action: any) => {
            const { patch } = action.payload;
            state.selectedInput = { ...state.selectedInput, ...patch };
        }
    }
});

export const { setSelectedInput, setAllInputs, addNewInput, updateInput, deleteInput, setSearchItems, updateInputAfterSaveAPICall } = InputSlice.actions;

export default InputSlice.reducer;