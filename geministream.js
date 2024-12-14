import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const mediaPath = "./";

main();

async function main() {
    const result = await chamada();
}

async function chamada() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Me fale em 2 parágrafos sobre o musical Wicked.";

    const result = await model.generateContentStream(prompt);

    // Print text as it comes in.
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        process.stdout.write(chunkText);
    }
}
