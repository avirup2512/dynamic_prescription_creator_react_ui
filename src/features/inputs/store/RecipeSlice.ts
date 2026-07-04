import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RecipeItem } from "../component/InputTab/input-tab-types";

interface RecipeCategory {
    id: string;
    name: string;
}

interface RecipeTagGroup {
    name: string;
    recipes: RecipeItem[];
}

interface RecipeFetchPayload {
    tags: RecipeTagGroup[];
}

interface RecipeRecord extends RecipeItem {
    category?: string;
    ingredients?: Array<{ name?: string }>;
    nutrients?: {
        energy?: string | number;
    };
}

interface RecipeState {
    query: string;
    selectedCategoryId: string;
    categories: RecipeCategory[];
    fetchedRecipes: RecipeFetchPayload;
    selectedIds: string[];
}

const initialState: RecipeState = {
    query: "",
    selectedCategoryId: "All categories",
    categories: [],
    fetchedRecipes: { tags: [] },
    selectedIds: ["diabetic-breakfast-bowl"],
};

const recipeSlice = createSlice({
    name: "recipe",
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
        setCategories: (state, action: PayloadAction<RecipeCategory[]>) => {
            state.categories = action.payload;
        },
        setFetchedRecipes: (state, action: PayloadAction<RecipeFetchPayload>) => {
            state.fetchedRecipes = action.payload;
        },
        toggleRecipeSelection: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.selectedIds = state.selectedIds.includes(id)
                ? state.selectedIds.filter((itemId) => itemId !== id)
                : [...state.selectedIds, id];
        },
    },
});

export const {
    setQuery,
    setSelectedCategoryId,
    setCategories,
    setFetchedRecipes,
    toggleRecipeSelection,
} = recipeSlice.actions;

export default recipeSlice.reducer;
