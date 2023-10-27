import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { v4 as uuidv4 } from "uuid";
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);
function generateChatId() {
  // Generate a random UUID (Universally Unique Identifier)
  const uuid = uuidv4();
  return uuid.slice(0, 5);
}

export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      stream: true,
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {}
}
