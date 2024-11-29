import React, { FC } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/store/store";
import ParsableTitle from "@/components/ParsableTitle/ParsableTitle";
import styles from "./alert.module.scss";
import { Question } from "@/config/types";
import { selectQuestionnaireAnswers } from "@/store/slices/questionnaireSlice";

type AlertProps = {
  question: Question;
};

const Alert: FC<AlertProps> = ({ question }) => {
  const router = useRouter();
  const params = useParams();

  const { redirectDependOnQuestion: previousQuestionId } = question;

  const answers = useAppSelector(selectQuestionnaireAnswers);

  const handleButtonPress = () => {
    if (!previousQuestionId) {
      return;
    }

    const value = answers[+previousQuestionId];

    const nextId = question?.redirectMap?.[value];

    if (nextId) {
      router.push(`/questionnaires/${params.slug}/question/${nextId}`);
    }
  };

  return (
    <div>
      <ParsableTitle text={question.title} variant="white" />
      {question.description && (
        <p className={styles.description}>{question.description}</p>
      )}
      <button onClick={handleButtonPress} className={styles.button}>
        Ok
      </button>
    </div>
  );
};

export default Alert;
