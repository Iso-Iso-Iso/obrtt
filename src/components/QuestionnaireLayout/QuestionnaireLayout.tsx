import React, { FC, PropsWithChildren } from "react";
import styles from "./questionnaireLayout.module.scss";
import Icon, { IconVariant } from "@/components/ui/Icon/Icon";
import { useRouter } from "next/router";
import cx from "clsx";
import { useAppDispatch } from "@/store/store";
import { deleteQuestionnaireAnswer } from "@/store/slices/questionnaireSlice";
import { getQuestionnaireBySlug } from "@/config/helpers";
import { ConfigSlug, QuestionId } from "@/config/types";

export type QuestionnaireLayoutVariant = "gradient" | "pink";

type MainLayoutProps = PropsWithChildren & {
  variant?: QuestionnaireLayoutVariant;
  slug: ConfigSlug;
  questionId: QuestionId;
};

const iconVariantMap: Record<QuestionnaireLayoutVariant, IconVariant> = {
  gradient: "white",
  pink: "default",
};

const QuestionnaireLayout: FC<MainLayoutProps> = ({
  children,
  variant = "pink",
  slug,
  questionId,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const questionnaire = getQuestionnaireBySlug({ slug });

  const handleBack = () => {
    dispatch(deleteQuestionnaireAnswer({ id: questionId }));
    router.back();
  };

  return (
    <div className={cx(styles.wrapper, styles[variant])}>
      <header className={styles.header}>
        {questionnaire?.firstQuestionsId !== questionId && (
          <div onClick={handleBack}>
            <Icon name="chevron" variant={iconVariantMap[variant]} />
          </div>
        )}
        <div className={styles.logo}>
          <Icon name="logo" variant={iconVariantMap[variant]} />
        </div>
      </header>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default QuestionnaireLayout;
