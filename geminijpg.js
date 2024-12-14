import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';
import fs from "fs";

const mediaPath = "./";

main();

async function main() {
    const result = await chamada();
}

async function chamada() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // const prompt = `O trecho melódico da imagem treino01.jpg possui 4 compassos.
    // Quantas notas existem em cada compasso? Desconsidere as pausas. Semibreve é a figura musical
    // que não possui haste.
    // pergunta: compasso 1:
    // resposta: 2 mínimas
    // pergunta: compasso 2:
    // resposta: 3 semínimas
    // `;

    const prompt = `Quais são as figuras musicais usadas na notação ocidental?
    Resposta: Semibreve, mínima...`;

    const imagePart = fileToGenerativePart(
        `${mediaPath}/treino01.jpg`,
        "image/jpeg",
    );

    const result = await model.generateContent([prompt, imagePart]);
    console.log(result.response.text());
}


function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType,
        },
    };
}
