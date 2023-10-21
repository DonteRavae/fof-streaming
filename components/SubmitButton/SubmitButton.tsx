"use client";

// REACT
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";
// EXTERNAL
import { SpinnerDiamond } from "spinners-react";

export default function SubmitButton({
  className,
  disabled,
  label,
  onClick,
}: {
  className: string;
  disabled: boolean;
  label: string;
  onClick?: () => void;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className={className}
      disabled={disabled || pending}
      onClick={onClick}
    >
      {pending ? (
        <SpinnerDiamond
          size={40}
          thickness={150}
          speed={125}
          aria-label="Loading Spinner"
        />
      ) : (
        label
      )}
    </button>
  );
}
