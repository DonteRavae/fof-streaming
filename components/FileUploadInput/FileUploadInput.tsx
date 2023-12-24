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
import uploadFile from "@/actions/UploadFile.action";
import FormInput, { FormInputProps } from "../FormInput/FormInput";
// STYLES
import styles from "./FileUploadInput.module.scss";

interface FileUploadInputProps extends FormInputProps {
  format: "image" | "video";
}

export default function FileUploadInput({
  id,
  ref,
  format,
  name,
  ...otherProps
}: FileUploadInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const imagePreviewRef = useRef<HTMLImageElement>(null);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const [highlight, setHighlight] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("/blank.png");
  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(false);

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
    let reader = new FileReader();
    reader.readAsDataURL(files![0]);
    reader.onloadend = function () {
      if (format === "image")
        imagePreviewRef.current!.src = reader.result as string;
      else if (format === "video")
        videoPreviewRef.current!.src = reader.result as string;
    };
  };

  // INPUT HANDLERS
  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    inputRef.current!.click();
    inputRef.current!.value = "";
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.currentTarget.files![0];
    const formData = new FormData();
    formData.append("file", file);
    const [url, filename] = (await uploadFile(formData)) as string[];

    const upload = await fetch(url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    if (upload.ok) {
      console.log("Uploaded successfully!");
    } else {
      console.log(upload.status);
      console.error("Upload failed.");
    }
    const s3FileUrl = `${process.env.NEXT_PUBLIC_AWS_S3_FILE_URL}/${filename}`;
  };

  // HELPERS
  const previewFile = (fileUrl: string) => {
    if (format === "image") setImageUrl(fileUrl);
    else if (format === "video") videoPreviewRef.current!.src = fileUrl;
    setIsPreviewVisible(true);
  };

  const hidePreview = () => {
    setIsPreviewVisible(false);
  };

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
      {isPreviewVisible && format === "image" && (
        <Image
          className={styles.preview}
          ref={imagePreviewRef}
          src={imageUrl}
          alt="Poster Preview"
          fill
        />
      )}
      {isPreviewVisible && format === "video" && (
        <video
          autoPlay
          controls
          src=""
          className={styles.preview}
          ref={videoPreviewRef}
        ></video>
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
