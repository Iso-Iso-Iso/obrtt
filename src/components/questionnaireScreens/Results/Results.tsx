import React, { FC } from "react";
import { useAppSelector } from "@/store/store";
import {
  getAnswerByParams,
  getQuestionByParams,
} from "@/config/helpers";
import { selectQuestionnaireAnswers } from "@/store/slices/questionnaireSlice";

const Results: FC = () => {
  const answers = useAppSelector(selectQuestionnaireAnswers);

  const results = Object.entries(answers).map(([id, value]) => {
    const question = getQuestionByParams({ id });
    if (!question || !question?.options) {
      return "";
    }

    const answer = getAnswerByParams({
      value,
      options: question.options,
    });

    if (!answer) {
      return "";
    }

    return `${question.title} - ${answer.label}`;
  });

  return (
    <div>
      {results.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
};

export default Results;
