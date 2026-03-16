import React from "react";
import { Spin } from "antd";
import { Loader2 } from "lucide-react";
import styles from "./loading-spinner.module.css";

interface ILoadingSpinnerProps {
  size?: "small" | "default" | "large";
  tip?: string;
  fullscreen?: boolean;
}

export const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({ size = "default", tip, fullscreen = false }) => {
  const sizeMap = { small: 16, default: 24, large: 32 };
  const iconSize = sizeMap[size];

  const spinner = <Spin indicator={<Loader2 size={iconSize} className={styles.spinIcon} />} tip={tip} />;

  if (fullscreen) {
    return <div className={styles.fullscreenWrapper}>{spinner}</div>;
  }

  return spinner;
};
