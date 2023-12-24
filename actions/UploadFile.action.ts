"use server";

// EXTERNAL
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const REGION = process.env.AWS_REGION!;
const SOURCE_BUCKET = process.env.AWS_SOURCE_BUCKET!;
const POSTERS_BUCKET = process.env.AWS_POSTERS_BUCKET!;
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID!;
const ACCESS_KEY = process.env.AWS_ACCESS_KEY!;

export default async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  const ext = file.type.substring(6);
  // Obtain identification
  const id = uuidv4();
  const filename = `${id}.${ext}`;
  // Send to AWS S3 Bucket for processing.
  const s3Client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: ACCESS_KEY,
    },
  });

  try {
    const command = new PutObjectCommand({
      Bucket:
        ext === "png" || ext === "jpg" || ext === "jpeg"
          ? POSTERS_BUCKET
          : SOURCE_BUCKET,
      Key: filename,
      Body: file,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 5 });

    return [url, filename];
  } catch (error) {
    console.log(error);
  }
}
