import { ListObjectsV2Output, S3 } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
export async function downloadFromS3(file_key: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const s3 = new S3({
        region: "us-east-2",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      });
      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: file_key,
      };

      const obj = await s3.getObject(params);
      const file_name = `/tmp/brandon${Date.now().toString()}.pdf`;
      const directory = path.dirname(file_name);
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }
      if (obj.Body instanceof require("stream").Readable) {
        console.log("started stream");
        const file = fs.createWriteStream(file_name);
        console.log("created write stream");
        file.on("open", function (fd) {
          console.log("opened file");
          // @ts-ignore
          obj.Body?.pipe(file).on("finish", () => {
            console.log("downloaded Sucessfully");
            return resolve(file_name);
          });
        });
      }
    } catch (error) {
      console.log("streaming error");

      console.error(error);
      reject(error);
      return null;
    }
  });
}

export const deleteFromS3 = (file_key: string) => {
  try {
    const s3 = new S3({
      region: "us-east-2",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
      },
    });
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
    };
    s3.deleteObject(params);
  } catch (error) {
    console.error("having trouble deleting object from S3");
    console.error(error);
  }
};

export const downloadAllFilesFromS3 = async (): Promise<
  ListObjectsV2Output["Contents"]
> => {
  return new Promise(async (resolve, reject) => {
    try {
      const s3 = new S3({
        region: "us-east-2",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      });
      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      };
      const files = await s3.listObjectsV2(params);
      const idk = files.Contents;
      return resolve(files.Contents);
    } catch (error) {
      reject(error);
    }
  });
};
