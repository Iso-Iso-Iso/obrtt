import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { QuestionValue } from "@/config/types";

export const QUESTIONNAIRE_SLICE_NAME = "questionnaire" as const;

export type Answers = Record<number, QuestionValue>;

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
    setQuestionnaireAnswer: ({ answers }, { payload }) => {
      answers[payload.id] = payload.value;
    },
    deleteQuestionnaireAnswer: (state, { payload }) => {
      state.answers = Object.fromEntries(
        Object.entries(state.answers).filter(([key]) => payload.id !== key),
      );
    },
  },
  selectors: {
    selectQuestionnaireAnswers: (state) => state.answers,
  },
});

export const { setQuestionnaireAnswer, deleteQuestionnaireAnswer } = questionnaireSlice.actions;

export const { selectQuestionnaireAnswers } = questionnaireSlice.selectors;
