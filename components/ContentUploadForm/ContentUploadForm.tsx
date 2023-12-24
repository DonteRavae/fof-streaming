"use client";

// INTERNAL
import CallToActionButton from "../CallToActionButton/CallToActionButton";
import FileUploadInput from "../FileUploadInput/FileUploadInput";
import FormInput from "../FormInput/FormInput";
import {v4 as uuidv4} from "uuid";
// STYLES
import styles from "./ContentUploadForm.module.scss";

export default function ContentUploadForm() {
  const onSubmit = async (formData: FormData) => {
    console.log(formData);
  };

  const contentId = uuidv4();

  return (
    <form className={styles.contentUploadForm}>
      {/* TEASER VIDEO FILE INPUT */}
      <FileUploadInput
        id="teaserVideo"
        accept=".mp4"
        format="video"
        name="teaser"
      />
      {/* FEATURE POSTER IMAGE FILE INPUT */}
      <FileUploadInput
        id="posterImage"
        // label="Poster Image"
        accept=".jpg, .jpeg, .png"
        name="poster"
        format="image"
      />
      {/* FEATURE VIDEO FILE INPUT */}
      <FileUploadInput
        id="featureVideo"
        format="video"
        accept=".mp4"
        name="feature"
      />
      {/* TITLE */}
      <FormInput id="title" label="Title" />
      {/* DESCRIPTION */}
      <FormInput id="description" label="Description" />
      {/* SPEAKER IDs - ARRAY */}
      {/* PROVIDER ID - HIDDEN */}
      <FormInput id="providerId" hidden />
      {/* RELEASE DATE */}
      <FormInput id="releaseDate" type="date" label="Release Date" />

      <CallToActionButton secondary>Upload Content</CallToActionButton>
    </form>
  );
}
