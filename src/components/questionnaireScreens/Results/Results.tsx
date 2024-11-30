import React, { FC } from "react";
import { useAppSelector } from "@/store/store";
import {
  getAnswerByParams,
  getQuestionByParams,
  getQuestionnaireBySlug,
} from "@/config/helpers";
import { selectQuestionnaireAnswers } from "@/store/slices/questionnaireSlice";
import { useParams } from "next/navigation";
import { parseStringWithVars } from "@/helpers/parseStringWithVars";

const Results: FC = () => {
  const answers = useAppSelector(selectQuestionnaireAnswers);

  const params = useParams();

  const results = Object.entries(answers).map(([id, value]) => {
    if (!params.slug || Array.isArray(params.slug)) {
      return "";
    }

    const questionnaire = getQuestionnaireBySlug({ slug: params.slug });

    if (!questionnaire) {
      return "";
    }

    const question = getQuestionByParams({ id, questionnaire });

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

    return `${parseStringWithVars(question.title, answers)} - ${answer.label}`;
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
