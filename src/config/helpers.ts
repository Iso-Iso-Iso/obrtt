import config from "./questionnaire.json";
import {
  Config,
  ConfigSlug,
  QuestionId,
  QuestionOption,
  QuestionValue,
} from "@/config/types";

export const getQuestionnaireConfig = (): Config[] => config as Config[];

export const getQuestionnaireBySlug = ({
  slug,
}: {
  slug: ConfigSlug;
}): Config | undefined =>
  getQuestionnaireConfig().find((item) => item.slug === slug);

export const getQuestionByParams = ({
  id,
  questionnaire,
}: {
  id: QuestionId;
  questionnaire: Config;
}) => {
  return questionnaire.questions.find((item) => item.id === id);
};

export const getAnswerByParams = ({
  options,
  value,
}: {
  options: QuestionOption[];
  value: QuestionValue;
}) => options.find((option) => option.value === value);
