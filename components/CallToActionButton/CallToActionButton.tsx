"use client";

// REACT
import { ComponentProps, ReactNode } from "react";
import { useFormStatus } from "react-dom";
// EXTERNAL
import { SpinnerDiamond } from "spinners-react";
// STYLES
import styles from "./CallToActionButton.module.scss";

interface ButtonProps extends ComponentProps<"button"> {
  secondary?: boolean;
}

export default function CallToActionButton({
  children,
  secondary,
  className,
  disabled,
  ...otherProps
}: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={disabled || pending}
      className={`${styles.ctaButton} ${
        secondary ? styles.secondary : ""
      } ${className}`}
      {...otherProps}
    >
      {pending ? (
        <SpinnerDiamond
          size={30}
          thickness={150}
          speed={125}
          color="#FFF"
          aria-label="Loading Spinner"
        />
      ) : (
        children
      )}
    </button>
  );
}
