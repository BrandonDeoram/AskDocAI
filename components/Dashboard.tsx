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
const Dashboard = () => {
  const [files, setFiles] = useState<ListObjectsV2Output["Contents"]>([]);

  useEffect(() => {
    const downloadFiles = async () => {
      const res = await downloadAllFilesFromS3();
      setFiles(res);
    };
    downloadFiles();
  }, []);
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
                className="flex flex-col w-40 bg-muted-foreground rounded-xl p-4 mt-2 mb-0 relative"
              >
                <div className="flex flex-row gap-2 items-center">
                  <div className="w-10 h-10 bg-white rounded-full"></div>
                  <p className="text-center font-semibold">
                    {index.Key?.split("/")[1].split("-")[1]}
                  </p>
                </div>
                <Button
                  variant={"secondary"}
                  className="mt-2"
                  onClick={() => toast.success("File deleted")}
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
    </div>
  );
};

export default Dashboard;
