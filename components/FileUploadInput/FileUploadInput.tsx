"use client";

// REACT
import {
  ChangeEventHandler,
  DragEventHandler,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
// NEXT.JS
import Image from "next/image";
// INTERNAL
import { Icons } from "../Icons";
import FormInput, { FormInputProps } from "../FormInput/FormInput";
// STYLES
import styles from "./FileUploadInput.module.scss";

export default function FileUploadInput({
  id,
  ref,
  ...otherProps
}: FormInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);
  const [highlight, setHighlight] = useState<boolean>(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(false);
  const [fileType, setFileType] = useState<string>("");

  // DRAG AND DROP HANDLERS

  const preventDefaults: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (event) => {
    preventDefaults(event);
    setHighlight(true);
  };
  const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {
    preventDefaults(event);
    setHighlight(true);
  };
  const handleDragLeave: DragEventHandler<HTMLDivElement> = (event) => {
    preventDefaults(event);
    setHighlight(false);
  };
  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    preventDefaults(event);
    setHighlight(false);
    const files = event.dataTransfer.files;
    inputRef.current!.files = files;
    previewFile(files[0]);
  };

  const previewFile = (file: File) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      console.log(reader.result);
      previewRef.current!.src = reader.result as string;
    };
    setIsPreviewVisible(true);
  };

  // CLICK HANDLER
  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    inputRef.current!.click();
    inputRef.current!.value = "";
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    previewFile(event.currentTarget.files![0]);
  };

  const hidePreview = () => {
    setIsPreviewVisible(false);
    previewRef.current!.src = "";
  };

  // UPLOAD HANDLER

  return (
    <div
      className={`${styles.dropArea} ${highlight ? styles.highlight : ""}`}
      ref={dropAreaRef}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <FormInput
        id={id}
        ref={inputRef}
        type="file"
        onChange={handleChange}
        hidden
        {...otherProps}
      />

      <Icons className={styles.fileUploadIcon} type="file-upload" />
      <h3 className={styles.instructions}>Drag and drop files here</h3>
      <section className={styles.divider}>
        <hr />
        <p>or</p>
        <hr />
      </section>
      <button className={styles.chooseFileButton} onClick={handleClick}>
        Browse Files
      </button>
      <p className={styles.restrictions}>Maximum file size is 100MB</p>
      {isPreviewVisible && (
        <Image
          className={styles.preview}
          ref={previewRef}
          src=""
          alt="Poster Preview"
        />
      )}
      <button
        className={styles.closeButton}
        type="button"
        onClick={hidePreview}
      >
        <Icons type="close" />
      </button>
    </div>
  );
}
