"use client";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { uploadToS3 } from "@/lib/db/s3";
import { Inbox, Loader2 } from "lucide-react";
import { useCounter } from "./CounterProvider";
import { v4 as uuidv4 } from "uuid";
// https://github.com/aws/aws-sdk-js-v3/issues/4126
function generateChatId() {
  // Generate a random UUID (Universally Unique Identifier)
  const uuid = uuidv4();
  return uuid.slice(0, 5);
}

const FileUpload = () => {
  const router = useRouter();
  const { counter, incrementCounter } = useCounter();
  const [uploading, setUploading] = React.useState(false);
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
      chatId,
    }: {
      file_key: string;
      file_name: string;
      chatId: string; // Ensure chatId is specified as a string
    }) => {
      // Convert chatId to a string if it's not already
      const chatIdAsString = chatId.toString();

      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
        chatId: chatIdAsString, // Pass chatId as a string
      });
      console.log("logging returned data", response.data);
      return response.data;
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        // bigger than 10mb!
        toast.error("File too large");
        return;
      }

      try {
        setUploading(true);
        const newChatId = generateChatId();
        const data = await uploadToS3(newChatId, file);
        console.log("meow", data);
        if (!data?.file_key || !data.file_name) {
          toast.error("Something went wrong");
          return;
        }
        
        // check if chatId is a string
        if (typeof data.chatId !== "string") {
          console.log("MUST BE A DAM STRING");
         
        }
        incrementCounter();
        mutate(data, {
          onSuccess: () => {
            toast.success("Chat created!");
            console.log(newChatId);
            router.push(`/chat/${newChatId}`);
          },
          onError: (err) => {
            toast.error("Error creating chat");
            console.error(err);
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl w-4/5">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col h-96",
        })}
      >
        <input {...getInputProps()} />
        {uploading || isLoading ? (
          <>
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">
              Spilling Tea to GPT...
            </p>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
