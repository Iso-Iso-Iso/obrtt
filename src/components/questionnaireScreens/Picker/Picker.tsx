import React, { FC, useState } from "react";
import styles from "./picker.module.scss";
import cx from "clsx";
import ParsableTitle from "@/components/ParsableTitle/ParsableTitle";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  selectQuestionnaireAnswers,
  setAnswer,
} from "@/store/slices/questionnaireSlice";
import { Question, QuestionOption } from "@/config/types";

type OptionsProps = {
  question: Question;
};
// TODO: move in different directory

export const Picker: FC<OptionsProps> = ({ question }) => {
  const [option, setOption] = useState<QuestionOption | null>(null);
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();

  const handlePickerSelect = (option: QuestionOption) => {
    setOption(option);
    dispatch(setAnswer({ id: question.id, value: option.value }));
    router.push(`/questionnaires/${params.slug}/question/${option.nextId}`);
  };

  return (
    <>
      <ParsableTitle text={question.title} />
      <div className={styles.wrapper}>
        {question.options.map((item) => (
          <button
            key={item.value}
            className={cx(
              styles.pickerItem,
              item.value === option?.value && styles.pickerItemActive,
            )}
            onClick={() => handlePickerSelect(item)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
};
