import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { DropdownItem, DropdownOption } from "../component/InputTab/input-tab-types";

interface DropdownState {
    selectedDropdownId: string;
    selectedDropdown: DropdownItem | null;
    allDropdowns: DropdownItem[];
    searchItems: DropdownItem[];
    removedOptionIds: string[];
}

const initialState: DropdownState = {
    selectedDropdownId: "",
    selectedDropdown: null,
    allDropdowns: [],
    searchItems: [],
    removedOptionIds: [],
};

const dropdownSlice = createSlice({
    name: "dropdown",
    initialState,
    reducers: {
        setSelectedDropdownId: (state, action: PayloadAction<string>) => {
            state.selectedDropdownId = action.payload;
        },
        setSelectedDropdown: (state, action: PayloadAction<DropdownItem | null>) => {
            state.selectedDropdown = action.payload;
            state.selectedDropdownId = action.payload?.id ?? "";
        },
        setAllDropdowns: (state, action: PayloadAction<DropdownItem[]>) => {
            state.allDropdowns = action.payload;
            state.searchItems = action.payload;
            if (!state.selectedDropdownId && action.payload[0]?.id) {
                state.selectedDropdownId = action.payload[0].id;
            }
        },
        setSearchItems: (state, action: PayloadAction<DropdownItem[]>) => {
            state.searchItems = action.payload;
        },
        createDropdown: (state, action: PayloadAction<DropdownItem>) => {
            const nextDropdown = action.payload;
            state.allDropdowns = [nextDropdown, ...state.allDropdowns];
            state.searchItems = [nextDropdown, ...state.searchItems];
            state.selectedDropdownId = nextDropdown.id;
            state.selectedDropdown = nextDropdown;
            state.removedOptionIds = [];
        },
        updateDropdown: (state, action: PayloadAction<{ id: string; patch: Partial<DropdownItem> }>) => {
            const { id, patch } = action.payload;

            state.allDropdowns = state.allDropdowns.map((item) => (item.id === id ? { ...item, ...patch } : item));
            state.searchItems = state.searchItems.map((item) => (item.id === id ? { ...item, ...patch } : item));

            if (state.selectedDropdown?.id === id) {
                state.selectedDropdown = { ...state.selectedDropdown, ...patch };
            }
        },
        addDropdownOption: (state, action: PayloadAction<DropdownOption>) => {
            if (!state.selectedDropdown) {
                return;
            }

            const updatedDropdown = {
                ...state.selectedDropdown,
                dropdown_options: [...state.selectedDropdown.dropdown_options, action.payload],
            };

            state.selectedDropdown = updatedDropdown;
            state.allDropdowns = state.allDropdowns.map((item) => (item.id === state.selectedDropdownId ? updatedDropdown : item));
            state.searchItems = state.searchItems.map((item) => (item.id === state.selectedDropdownId ? updatedDropdown : item));
        },
        updateDropdownOption: (state, action: PayloadAction<{ optionId: string; patch: Partial<DropdownOption> }>) => {
            if (!state.selectedDropdown) {
                return;
            }

            const updatedDropdown = {
                ...state.selectedDropdown,
                dropdown_options: state.selectedDropdown.dropdown_options.map((option) =>
                    option.id === action.payload.optionId ? { ...option, ...action.payload.patch } : option,
                ),
            };

            state.selectedDropdown = updatedDropdown;
            state.allDropdowns = state.allDropdowns.map((item) => (item.id === state.selectedDropdownId ? updatedDropdown : item));
            state.searchItems = state.searchItems.map((item) => (item.id === state.selectedDropdownId ? updatedDropdown : item));
        },
        deleteDropdownOption: (state, action: PayloadAction<string>) => {
            if (!state.selectedDropdown) {
                return;
            }

            const updatedDropdown = {
                ...state.selectedDropdown,
                dropdown_options: state.selectedDropdown.dropdown_options.filter((option) => option.id !== action.payload),
            };

            state.selectedDropdown = updatedDropdown;
            state.allDropdowns = state.allDropdowns.map((item) => (item.id === state.selectedDropdownId ? updatedDropdown : item));
            state.searchItems = state.searchItems.map((item) => (item.id === state.selectedDropdownId ? updatedDropdown : item));
            if (!state.removedOptionIds.includes(action.payload)) {
                state.removedOptionIds.push(action.payload);
            }
        },
        deleteDropdown: (state, action: PayloadAction<string>) => {
            const idToDelete = action.payload;
            const remainingDropdowns = state.allDropdowns.filter((item) => item.id !== idToDelete);
            const remainingSearchItems = state.searchItems.filter((item) => item.id !== idToDelete);

            state.allDropdowns = remainingDropdowns;
            state.searchItems = remainingSearchItems;
            state.selectedDropdown = remainingDropdowns[0] ?? null;
            state.selectedDropdownId = remainingDropdowns[0]?.id ?? "";
            state.removedOptionIds = [];
        },
        addRemovedOptionId: (state, action: PayloadAction<string>) => {
            if (!state.removedOptionIds.includes(action.payload)) {
                state.removedOptionIds.push(action.payload);
            }
        },
        clearRemovedOptionIds: (state) => {
            state.removedOptionIds = [];
        },
    },
});

export const {
    setSelectedDropdownId,
    setSelectedDropdown,
    setAllDropdowns,
    setSearchItems,
    createDropdown,
    updateDropdown,
    addDropdownOption,
    updateDropdownOption,
    deleteDropdownOption,
    deleteDropdown,
    addRemovedOptionId,
    clearRemovedOptionIds,
} = dropdownSlice.actions;

export default dropdownSlice.reducer;
