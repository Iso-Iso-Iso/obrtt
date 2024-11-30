import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { QuestionId, QuestionValue } from "@/config/types";

export const QUESTIONNAIRE_SLICE_NAME = "questionnaire" as const;

export type Answers = Record<QuestionId, QuestionValue>;

type SliceState = {
  answers: Answers;
};

const initialState: SliceState = {
  answers: {},
};

type Selectors = {
  selectQuestionnaireAnswers: (state: SliceState) => SliceState["answers"];
};

export const questionnaireSlice = createSlice<
  SliceState,
  SliceCaseReducers<SliceState>,
  typeof QUESTIONNAIRE_SLICE_NAME,
  Selectors
>({
  name: QUESTIONNAIRE_SLICE_NAME,
  initialState,
  reducers: {
    setQuestionnaireAnswer: (
      { answers },
      { payload }: PayloadAction<{ id: QuestionId; value: QuestionValue }>,
    ) => {
      answers[payload.id] = payload.value;
    },
    deleteQuestionnaireAnswer: (
      state,
      { payload }: PayloadAction<{ id: QuestionId }>,
    ) => {
      state.answers = Object.fromEntries(
        Object.entries(state.answers).filter(([key]) => payload.id !== key),
      );
    },
  },
  selectors: {
    selectQuestionnaireAnswers: (state) => state.answers,
  },
});

export const { setQuestionnaireAnswer, deleteQuestionnaireAnswer } =
  questionnaireSlice.actions;

export const { selectQuestionnaireAnswers } = questionnaireSlice.selectors;
