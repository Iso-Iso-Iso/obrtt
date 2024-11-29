import React, { FC } from "react";
import Image from "next/image";
import ChevronSvg from "@/assets/Chevron.svg";
import LogoSvg from "@/assets/logo.svg";
import styles from "./icon.module.scss";

const iconMap = {
  chevron: ChevronSvg,
  logo: LogoSvg,
};

export type IconVariant = "white" | "default";

type IconProps = {
  name: keyof typeof iconMap;
  variant: IconVariant;
};

const Icon: FC<IconProps> = ({ name, variant }) => {
  const Renderer = iconMap[name];
  return <Renderer className={styles[variant]} />;
};

export default Icon;
