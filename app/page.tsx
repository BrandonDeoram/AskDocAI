import Wrap from "../components/wrap";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Dashboard from "@/components/Dashboard";
import { Toaster } from "react-hot-toast";

export default async function Home() {
  const { userId } = auth();
  const isAuth = !!userId;

  return (
    <>
      <Toaster position="top-center" />
      <Wrap>
        {isAuth ? (
          <Dashboard></Dashboard>
        ) : (
          <>
            <div className="grid grid-rows-2 row-span-1 lg:grid-rows-4 gap-10 sm:mt-20 mt-8 h-full md:grid-rows-1">
              {/* Content for the first column */}
              <div className="flex items-center flex-col mb-6 row-span-1 sm:row-span-1 w-full">
                <div className="text-4xl font-bold text-foreground sm:text-5xl text-center">
                  Have a chat with your{" "}
                  <span className="text-muted-foreground">documents.</span>
                </div>
                <div className="text-sm text-muted-foreground mt-2 text-center max-w-3xl leading-6">
                  You can ask <span className="font-bold">AskDocAi</span>{" "}
                  anything about your PDF document. It allows you to have
                  conversations with any PDF. Simply upload your file and start
                  asking questions.
                </div>
                <Button className="mt-4 "> Get Started</Button>
              </div>

              <div className="flex items-center flex-col mb-6 row-span-2 sm:row-span-3 md:row-span-4">
                <div className="-m-2 rounded-xl flow-root p-4 bg-border">
                  <img
                    src="dashboard-preview.jpg"
                    alt="loading"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-4 sm:flex-nowrap rounded-xl m-6 mx-auto w-full justify-center ">
              <div className="p-5 flex mx-auto">
                <div>
                  <div className="w-10 h-10 bg-background outline-none outline-white rounded-full flex items-center justify-center text-white ">
                    1
                  </div>
                </div>
                <div className="sm:pl-10 flex flex-col mb-0 pl-4 pr-4  ">
                  <h2 className="text-2xl text-center font-semibold sm:text-3xl text-white mb-2">
                    Drag and Drop Your File
                  </h2>
                  <Separator className="bg-muted-foreground"></Separator>
                  <div className="mt-2 mb-10">
                    <img src="drag.png" alt="Image" className="rounded-xl " />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-4 sm:flex-nowrap rounded-xl m-6 mx-auto w-full justify-center ">
              <div className="p-5 flex mx-auto">
                <div>
                  <div className="w-10 h-10 bg-background outline-none outline-white rounded-full flex items-center justify-center text-white ">
                    2
                  </div>
                </div>
                <div className="sm:pl-10 sm:pr-10 flex flex-col mb-0 pl-4 pr-4 ">
                  <h2 className="text-2xl text-center font-semibold sm:text-3xl text-white mb-2">
                    Chat with the PDF
                  </h2>
                  <Separator className="bg-muted-foreground"></Separator>
                  <div className="mt-2 mb-10 justify-center flex">
                    <img
                      src="image2.png"
                      alt="Image"
                      className="rounded-xl max-h-[37rem]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Wrap>
    </>
  );
}
