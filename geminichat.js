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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

    const imagePart1 = fileToGenerativePart(
        `${mediaPath}/treino01.jpg`,
        "image/jpeg",
    );

    const imagePart2 = fileToGenerativePart(
        `${mediaPath}/treino02.jpg`,
        "image/jpeg",
    );

    const imagePart3 = fileToGenerativePart(
        `${mediaPath}/treino03.jpg`,
        "image/jpeg",
    );

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "Olá." }],
            },
            {
                role: "model",
                parts: [{ text: "Tudo bem? Eu sou um modelo que conversa sobre teoria musical." }],
            },
            {
                role: "user",
                parts: [{ text: "Considere esta melodia no nosso contexto." }, imagePart1],
            },
            {
                role: "model",
                parts: [{ text: "OK. Estou analisando a imagem." }],
            },
            {
                role: "user",
                parts: [{ text: "Quais as figuras musicais existentes no primeiro compasso?" }],
            },
            {
                role: "model",
                parts: [{ text: "As figuras musicais do primeiro compasso são duas mínimas." }],
            },
            {
                role: "user",
                parts: [{ text: "Quais as figuras musicais existentes no segundo compasso?" }],
            },
            {
                role: "model",
                parts: [{ text: "As figuras musicais do segundo compasso são três semínimas e uma pausa de semínima." }],
            },
            {
                role: "user",
                parts: [{ text: "Quais as figuras musicais existentes no terceiro compasso?" }],
            },
            {
                role: "model",
                parts: [{ text: "As figuras musicais do terceiro compasso são quatro semínimas." }],
            },
            {
                role: "user",
                parts: [{ text: "Qual a figura musical existente no quarto compasso?" }],
            },
            {
                role: "model",
                parts: [{ text: "A figura musical do quarto compasso é uma semibreve." }],
            },
        ],
    });

    let result = await chat.sendMessage(["Considere que a imagem anexada agora se chama melodia2. Quanto compassos existem nesta melodia? Informe também o nome da imagem.", imagePart2]);
    console.log(result.response.text());
    result = await chat.sendMessage("Quais as figuras musicais existentes no primeiro compasso?");
    console.log(result.response.text());
    result = await chat.sendMessage("Quais as figuras musicais existentes no segundo compasso?");
    console.log(result.response.text());

    result = await chat.sendMessage(["Considere que a imagem anexada agora se chama melodia3. Existe alguma semínima nesta imagem anexada? Caso haja, informe o número do compasso. Informe também o nome da imagem.", imagePart3]);
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
