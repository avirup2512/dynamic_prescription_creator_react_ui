import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store.ts";

const selectLoaderState = (state: RootState) => state.loader;

export const selectLoader = createSelector(
    [selectLoaderState],
    (loader) => loader,
);

export const selectLoaderOpen = createSelector(
    [selectLoaderState],
    (loader) => loader.open,
);
