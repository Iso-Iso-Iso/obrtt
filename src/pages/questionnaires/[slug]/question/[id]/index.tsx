import React, { FC } from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import {
  getQuestionByParams,
  getQuestionnaireBySlug,
  getQuestionnaireConfig,
} from "@/config/helpers";
import { COMPONENT_RENDERER_MAP } from "@/config/constants";
import QuestionnaireLayout, {
  QuestionnaireLayoutVariant,
} from "@/components/QuestionnaireLayout/QuestionnaireLayout";
import {
  ConfigSlug,
  Question,
  QuestionId,
  QuestionVariant,
} from "@/config/types";

const getStaticPathForQuestionnaires = () =>
  getQuestionnaireConfig().flatMap((questionnaire) => {
    return questionnaire.questions.map((item) => ({
      params: { slug: questionnaire.slug, id: item.id },
    }));
  });

export const getStaticPaths = (async () => {
  return {
    paths: getStaticPathForQuestionnaires(),
    fallback: true,
  };
}) satisfies GetStaticPaths;

type StaticParams = { id: QuestionId; slug: ConfigSlug };
type StaticProps = {
  question: Question;
};

export const getStaticProps: GetStaticProps<
  StaticProps,
  StaticParams
> = async ({ params }) => {
  if (!params?.id) {
    return { notFound: true };
  }

  const questionnaire = getQuestionnaireBySlug({ slug: params.slug });

  if (!questionnaire) {
    return { notFound: true };
  }

  const question = getQuestionByParams({ id: params.id, questionnaire });

  if (!question) {
    return { notFound: true };
  }

  return { props: { question } };
};

const questionMap: Record<QuestionVariant, QuestionnaireLayoutVariant> = {
  ALERT: "gradient",
  PICKER: "pink",
  RESULTS: "pink",
} as const;

const Index: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  question,
}) => {
  const Renderer = COMPONENT_RENDERER_MAP[question?.variant];

  const layoutVariant = questionMap[question?.variant];

  if (!question) {
    return null;
  }

  return (
    <QuestionnaireLayout variant={layoutVariant}>
      <Renderer question={question} />
    </QuestionnaireLayout>
  );
};

export default Index;
