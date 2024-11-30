import React, { FC, Fragment } from "react";
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

  const results = Object.entries(answers)
    .map(([id, value]) => {
      if (!params.slug || Array.isArray(params.slug)) {
        return null;
      }

      const questionnaire = getQuestionnaireBySlug({ slug: params.slug });

      if (!questionnaire) {
        return null;
      }

      const question = getQuestionByParams({ id, questionnaire });

      if (!question || !question?.options) {
        return null;
      }

      const answer = getAnswerByParams({
        value,
        options: question.options,
      });

      if (!answer) {
        return null;
      }

      return {
        questionText: parseStringWithVars(question.title, answers),
        answerText: answer.label,
      };
    })
    .filter((item) => !!item);

  return (
    <div>
      {results.map((item) => (
        <Fragment key={item.questionText}>
          <h3>{item.questionText}</h3>
          <p>{item.answerText}</p>
        </Fragment>
      ))}
    </div>
  );
};

export default Results;
