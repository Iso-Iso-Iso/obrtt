export type QuestionVariant = "PICKER" | "RESULTS" | "ALERT";

export type QuestionId = string;

export type ConfigId = string;

export type ConfigSlug = string;

export type QuestionValue = string | number;

export type QuestionOption = {
  label: string;
  value: QuestionValue;
  nextId: QuestionId;
};

export type Question = {
  id: QuestionId;
  variant: QuestionVariant;
  title: string;
  options: QuestionOption[];
  description?: string;
  redirectDependOnQuestion?: string;
  redirectMap?: Record<string, QuestionId>;
};

export type Config = {
  questions: Question[];
  name: string;
  slug: ConfigSlug;
  firstQuestionsId: QuestionId;
  id: ConfigId;
};
