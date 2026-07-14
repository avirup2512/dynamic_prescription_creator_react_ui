import { useCallback } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { hideLoader, showLoader, updateLoader } from "../store/loader/loaderSlice";
import type { LoaderPayload } from "../store/loader/loaderSlice";

export function useLoader() {
  const dispatch = useDispatch<AppDispatch>();

  const handleShowLoader = useCallback((payload?: LoaderPayload) => {
    dispatch(showLoader(payload));
  }, [dispatch]);

  const handleHideLoader = useCallback(() => {
    dispatch(hideLoader());
  }, [dispatch]);

  const handleUpdateLoader = useCallback((payload?: LoaderPayload) => {
    dispatch(updateLoader(payload));
  }, [dispatch]);

  return {
    showLoader: handleShowLoader,
    hideLoader: handleHideLoader,
    updateLoader: handleUpdateLoader,
  };
}
