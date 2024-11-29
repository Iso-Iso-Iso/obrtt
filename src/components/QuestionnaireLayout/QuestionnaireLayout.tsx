import React, { FC, PropsWithChildren } from "react";
import styles from "./questionnaireLayout.module.scss";
import Icon, { IconVariant } from "@/components/ui/Icon/Icon";
import { useRouter } from "next/router";
import cx from "clsx";

export type QuestionnaireLayoutVariant = "gradient" | "pink";

type MainLayoutProps = PropsWithChildren & {
  variant?: QuestionnaireLayoutVariant;
};

const iconVariantMap: Record<QuestionnaireLayoutVariant, IconVariant> = {
  gradient: "white",
  pink: "default",
};

const QuestionnaireLayout: FC<MainLayoutProps> = ({
  children,
  variant = "pink",
}) => {
  const router = useRouter();

  return (
    <div className={cx(styles.wrapper, styles[variant])}>
      <header className={styles.header}>
        <div onClick={router.back}>
          <Icon name="chevron" variant={iconVariantMap[variant]} />
        </div>
        <div className={styles.logo}>
          <Icon name="logo" variant={iconVariantMap[variant]} />
        </div>
      </header>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default QuestionnaireLayout;
