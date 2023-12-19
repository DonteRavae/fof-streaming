// STYLES
import styles from "./Modal.module.scss";

import React, {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

export type ModalRef = {
  showModal: () => void;
  closeModal: () => void;
};
type ModalProps = {
  children: ReactNode;
  className?: string;
};

export default forwardRef<ModalRef, ModalProps>(function Modal(
  { children, className },
  ref
) {
  const innerModalRef = useRef<HTMLDialogElement | null>(null);
  useImperativeHandle(
    ref,
    () => {
      return {
        showModal() {
          innerModalRef.current?.showModal();
        },
        closeModal() {
          innerModalRef.current?.close();
        },
      };
    },
    []
  );

  return (
    <dialog ref={innerModalRef} className={`${styles.modal} ${className}`}>
      {children}
    </dialog>
  );
});
