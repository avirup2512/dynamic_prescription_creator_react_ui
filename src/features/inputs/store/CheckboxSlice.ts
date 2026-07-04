import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { CheckboxItem } from "../component/InputTab/input-tab-types";
import { initialCheckboxes } from "../component/InputTab/input-tab-mock-data";

interface CheckboxState {
    items: CheckboxItem[];
    selectedId: string;
}

const initialState: CheckboxState = {
    items: initialCheckboxes,
    selectedId: initialCheckboxes[0]?.id ?? "",
};

const checkboxSlice = createSlice({
    name: "checkbox",
    initialState,
    reducers: {
        setSelectedId: (state, action: PayloadAction<string>) => {
            state.selectedId = action.payload;
        },
        updateCheckbox: (state, action: PayloadAction<{ id: string; patch: Partial<CheckboxItem> }>) => {
            const { id, patch } = action.payload;
            state.items = state.items.map((item) => (item.id === id ? { ...item, ...patch } : item));
        },
        addCheckbox: (state) => {
            const next: CheckboxItem = {
                id: `checkbox-${Date.now()}`,
                label: `New Checkbox ${state.items.length + 1}`,
                checkedValue: "checked",
                defaultChecked: false,
            };
            state.items = [next, ...state.items];
            state.selectedId = next.id;
        },
        deleteCheckbox: (state, action: PayloadAction<string>) => {
            const remaining = state.items.filter((item) => item.id !== action.payload);
            state.items = remaining;
            state.selectedId = remaining[0]?.id ?? "";
        },
    },
});

export const { setSelectedId, updateCheckbox, addCheckbox, deleteCheckbox } = checkboxSlice.actions;

export default checkboxSlice.reducer;
