"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import FileUpload from "./FileUpload";
import { MdDelete } from "react-icons/md";
import { Button } from "./ui/button";
import { deleteFromS3 } from "@/lib/db/s3-server";
import { downloadAllFilesFromS3 } from "@/lib/db/s3-server";
import axios from "axios";
import { ListObjectsV2Output } from "@aws-sdk/client-s3";
import { toast } from "react-toastify";
import { useCounter } from "./CounterProvider";
import { useRouter } from "next/navigation"; // Import `next/router` instead of `next/navigation`
import { Loader } from "lucide-react";
const Dashboard = () => {
  const router = useRouter();
  const [files, setFiles] = useState<ListObjectsV2Output["Contents"]>([]);
  const [loading, setLoading] = useState(false); // State to control the loading screen

  const { counter, incrementCounter } = useCounter();

  useEffect(() => {
    const downloadFiles = async () => {
      const res = await downloadAllFilesFromS3();
      setFiles(res);
      incrementCounter();
    };
    downloadFiles();
  }, [counter]);

  return (
    <div className="w-full mt-3 h-full">
      <div className="flex flex-col h-[50rem] max-w-full ">
        <div className="flex flex-col justify-center item-center max-w-full lg:mx-40 sm:mx-10 mx-10">
          <h3 className="text-4xl font-bold text-foreground mb-10 w-full text-center">
            My Files
          </h3>
          <Separator className="bg-muted-foreground h-1"></Separator>
          <div className="flex flex-row gap-5 flex-wrap justify-center md:justify-normal">
            {files?.map((index) => (
              <div
                key={index.Key}
                className="flex flex-col w-40 bg-muted-foreground rounded-xl p-4 mt-4 mb-0 relative"
                onClick={async () => {
                  console.log(index.Key?.split("/")[1]);
                  setLoading(true); // Set loading to true
                  toast.success("Chat Loading...");
                  // Simulate loading for 2 seconds before pushing to the new route
                  setTimeout(() => {
                    setLoading(false);
                    router.push(`/chat/${index.Key?.split("/")[1]}`);
                  }, 1000);
                }}
              >
                <div className="flex flex-row gap-2 items-center">
                  <p className="text-center font-semibold sm:text-sm">
                    {index.Key?.split("/")[2].split("-")[1]}
                  </p>
                </div>
                <Button
                  variant={"secondary"}
                  className="mt-2"
                  onClick={async () => {
                    await deleteFromS3(index.Key as string);
                    console.log("hola");
                    toast("File Deleted");
                    toast.error("File Deleted");
                    toast.info("id");
                    console.log("file deleted");
                    incrementCounter();
                  }}
                >
                  <MdDelete></MdDelete>
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="justify-center item-center flex mt-10">
          <FileUpload></FileUpload>
        </div>
      </div>

      {/* Conditional loading screen */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-80">
          <Loader className="h-10 w-10 text-blue-500 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
