import React, { FC } from "react";
import styles from "./parsableTitle.module.scss";
import { useAppSelector } from "@/store/store";
import cx from "clsx";
import { selectQuestionnaireAnswers } from "@/store/slices/questionnaireSlice";
import { parseStringWithVars } from "@/helpers/parseStringWithVars";

type ParsableSpanProps = {
  variant?: "white" | "black";
  text: string;
};

const ParsableTitle: FC<ParsableSpanProps> = ({ text, variant = "black" }) => {
  const answers = useAppSelector(selectQuestionnaireAnswers);

  return (
    <h1 className={cx(styles.title, styles[variant])}>
      {parseStringWithVars(text, answers || {})}
    </h1>
  );
};

export default ParsableTitle;
