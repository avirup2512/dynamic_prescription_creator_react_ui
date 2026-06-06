import { configureStore } from "@reduxjs/toolkit";
import HeaderReducer from "./features/header/store/HeaderSlice";
import BodyReducer from "./features/body/store/BodySlice";
import InputEntityTypeSlice from "./features/inputEntityType/store/InputEntityTypeSlice"
import TemplateReducer from "./features/template/store/TemplateSlice";
import SectionReducer from "./features/section/store/SectionSlice"
export const store = configureStore({
  reducer: {
    header:HeaderReducer,
    body:BodyReducer,
    inputEntityType:InputEntityTypeSlice,
    template:TemplateReducer,
    section:SectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;