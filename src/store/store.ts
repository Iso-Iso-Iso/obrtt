import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  QUESTIONNAIRE_SLICE_NAME,
  questionnaireSlice,
} from "@/store/slices/questionnaireSlice";

export const store = configureStore({
  reducer: { [QUESTIONNAIRE_SLICE_NAME]: questionnaireSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
