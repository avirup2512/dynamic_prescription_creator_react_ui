import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ToggleItem } from "../component/InputTab/input-tab-types";
import { initialToggles } from "../component/InputTab/input-tab-mock-data";

interface ToggleState {
    items: ToggleItem[];
    selectedId: string;
}

const initialState: ToggleState = {
    items: initialToggles,
    selectedId: initialToggles[0]?.id ?? "",
};

const toggleSlice = createSlice({
    name: "toggle",
    initialState,
    reducers: {
        setSelectedId: (state, action: PayloadAction<string>) => {
            state.selectedId = action.payload;
        },
        updateToggle: (state, action: PayloadAction<{ id: string; patch: Partial<ToggleItem> }>) => {
            const { id, patch } = action.payload;
            state.items = state.items.map((item) => (item.id === id ? { ...item, ...patch } : item));
        },
        addToggle: (state) => {
            const next: ToggleItem = {
                id: `toggle-${Date.now()}`,
                label: `New Toggle ${state.items.length + 1}`,
                offValue: "No",
                onValue: "Yes",
                defaultOn: false,
            };
            state.items = [next, ...state.items];
            state.selectedId = next.id;
        },
        deleteToggle: (state, action: PayloadAction<string>) => {
            const remaining = state.items.filter((item) => item.id !== action.payload);
            state.items = remaining;
            state.selectedId = remaining[0]?.id ?? "";
        },
    },
});

export const { setSelectedId, updateToggle, addToggle, deleteToggle } = toggleSlice.actions;

export default toggleSlice.reducer;
