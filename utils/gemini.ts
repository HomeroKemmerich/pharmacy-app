import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY });
const config = {
    responseMimeType: 'text/plain'
}
const model = 'gemini-1.5-flash'


export async function generateAIContent(customPrompt: string, imageUri?: string) {
    // TODO: Elaborar um prompt mais adequado
    const prompt = `
        Você é um professor do curso de farmácia, seu papel é instruir os alunos de forma que eles possam melhor compreender as receitas que são entregues a eles, assim como recomendar boas práticas da área da saúde.

        Sabendo disso, seu aluno perguntou "${customPrompt}". Qual é a sua resposta? Você é PROIBIDO de responder qualquer pergunta que não seja relacionada à prática farmacêutica.
    `;

    const contents = [{
        role: 'user',
        parts: [{
            text: prompt,
        }],
    }];

    try {
        const result = await ai.models.generateContent({ contents, model, config });
        console.log('ai response');
        return result.text;
    } catch (error) {
        console.error("Erro ao gerar conteúdo com IA:", error);
        return "Ocorreu um erro ao processar.";
    }

    return result.text
}

// Helper para converter imagem em base64
async function fetchImageAsBase64(uri: string) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString('base64');
    return base64String;
}

