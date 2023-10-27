import { db } from "@/lib/db";
import { getS3Url } from "@/lib/db/s3";
import { chats } from "@/lib/db/schema";
import { loadS3IntoPinecone } from "@/lib/db/pinecone";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// /api/create-chat
export async function POST(req: Request, res: Response) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  console.log("from async call");
  try {
    const body = await req.json();
    const { file_key, file_name, chatId } = body;
    console.log("from async call", file_key, file_name, chatId);
    // check if chatId is a string
    if (typeof chatId !== "string") {
      console.log("MUST BE A DAM STRING");
      throw new Error("chatId must be a string");
    }
    // await loadS3IntoPinecone(file_key);

    // Ensure that chatId is treated as a string
    const chat_id = await db.insert(chats).values({
      fileKey: file_key,
      pdfName: file_name,
      pdfUrl: getS3Url(file_key),
      userId,
      id: chatId, // Convert chatId to a string
    });

    return NextResponse.json(
      {
        chat_id: chatId, // Ensure chatId is a string in the response
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
