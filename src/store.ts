import { configureStore } from "@reduxjs/toolkit";
import HeaderReducer from "./features/header/store/HeaderSlice";
import BodyReducer from "./features/body/store/BodySlice";
import InputEntityTypeSlice from "./features/inputEntityType/store/InputEntityTypeSlice"
import TemplateReducer from "./features/new-template/store/TemplateSlice";
import SectionReducer from "./features/section/store/SectionSlice"
import AuthReducer from "./features/auth/store/AuthSlice";
import InputSlice from "./features/inputs/store/InputSlice";
import DropdownSlice from "./features/inputs/store/DropdownSlice";
import FoodSlice from "./features/inputs/store/FoodSlice";
import RecipeSlice from "./features/inputs/store/RecipeSlice";
import ToggleSlice from "./features/inputs/store/ToggleSlice";
import CheckboxSlice from "./features/inputs/store/CheckboxSlice";
export const store = configureStore({
  reducer: {
    header: HeaderReducer,
    body: BodyReducer,
    inputEntityType: InputEntityTypeSlice,
    template: TemplateReducer,
    section: SectionReducer,
    auth: AuthReducer,
    inputs: InputSlice,
    dropdown: DropdownSlice,
    food: FoodSlice,
    recipe: RecipeSlice,
    toggle: ToggleSlice,
    checkbox: CheckboxSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;