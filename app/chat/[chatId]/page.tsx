import PDFViewer from "@/components/PDFViewer";
import Wrap from "@/components/wrap";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
import ChatSideBar from "@/components/ChatSideBar";
import ChatComponent from "@/components/ChatComponent";
type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    console.log("not signed in");
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    console.log("no chats userId Found");
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === chatId)) {
    console.log("id not found", _chats.entries());
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === chatId);
  //   const isPro = await checkSubscription();

  return (
    <div className="h-full flex">
      <div className="w-full max-h-screen flex ">
        <div className="p-1 mt-2 flex-[1] text-white overflow-hidden">
          <ChatSideBar
            chatId={currentChat?.id || ""}
            chats={_chats}
            isPro={false}
          ></ChatSideBar>
        </div>
        <div className="h-[92vh] max-h-screen pt-4 flex-[4]">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
        <div className="ml-2 mt-[1rem] px-2 flex-[2] text-white border-l-4 border-l-white ">
          <ChatComponent chatId={chatId}></ChatComponent>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
