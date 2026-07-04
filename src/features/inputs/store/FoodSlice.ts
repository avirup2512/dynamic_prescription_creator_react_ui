import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { FoodItem } from "../component/InputTab/input-tab-types";

interface FoodCategory {
    id: string;
    name: string;
}

interface FoodRecord extends FoodItem {
    category?: {
        id?: string;
        name?: string;
    };
    nutrients?: {
        energy?: string | number;
        carbohydrate?: string | number;
        protein?: string | number;
        fiber?: string | number;
    };
    serving?: string;
    note?: string;
}

interface FoodState {
    query: string;
    selectedCategoryId: string;
    categories: FoodCategory[];
    fetchedFood: FoodRecord[];
    selectedIds: string[];
    multiSelect: boolean;
}

const initialState: FoodState = {
    query: "",
    selectedCategoryId: "",
    categories: [],
    fetchedFood: [],
    selectedIds: ["steel-cut-oatmeal", "oat-bread"],
    multiSelect: false,
};

const foodSlice = createSlice({
    name: "food",
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setSelectedCategoryId: (state, action: PayloadAction<string>) => {
            if (state.selectedCategoryId !== action.payload) {
                state.selectedIds = [];
            }
            state.selectedCategoryId = action.payload;
        },
        setCategories: (state, action: PayloadAction<FoodCategory[]>) => {
            state.categories = action.payload;
        },
        setFetchedFood: (state, action: PayloadAction<FoodRecord[]>) => {
            state.fetchedFood = action.payload;
        },
        toggleFoodSelection: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            if (!state.multiSelect) {
                state.selectedIds = state.selectedIds.includes(id) ? [] : [id];
                return;
            }

            state.selectedIds = state.selectedIds.includes(id)
                ? state.selectedIds.filter((itemId) => itemId !== id)
                : [...state.selectedIds, id];
        },
        setMultiSelect: (state, action: PayloadAction<boolean>) => {
            state.multiSelect = action.payload;
        },
    },
});

export const {
    setQuery,
    setSelectedCategoryId,
    setCategories,
    setFetchedFood,
    toggleFoodSelection,
    setMultiSelect,
} = foodSlice.actions;

export default foodSlice.reducer;
