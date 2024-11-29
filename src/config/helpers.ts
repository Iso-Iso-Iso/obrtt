import config from "./questionnaire.json";
import {
  Config,
  QuestionId,
  QuestionOption,
  QuestionValue,
} from "@/config/types";

export const getQuestionnaireConfig = (): Config => config as Config;

export const getQuestionByParams = ({ id }: { id: QuestionId }) => {
  return getQuestionnaireConfig().questions.find((item) => item.id === id);
};

export const getAnswerByParams = ({
  options,
  value,
}: {
  options: QuestionOption[];
  value: QuestionValue;
}): QuestionOption | undefined =>
  options.find((option) => option.value === value);
