import { GoogleGenAI } from '@google/genai';
import * as FileSystem from 'expo-file-system';

const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY });

const config = {
    responseMimeType: 'text/plain'
};

const model = 'gemini-1.5-flash';

function getMimeType(uri: string): string {
    if (uri.endsWith('.png')) return 'image/png';
    if (uri.endsWith('.jpg') || uri.endsWith('.jpeg')) return 'image/jpeg';
    return 'image/jpeg';
}

export async function generateAIContent(customPrompt: string, imageUri?: string) {
    const prompt = `
    Você é um professor do curso de farmácia. 
    Analise a imagem fornecida (se houver) junto com a pergunta abaixo e dê uma resposta clara e instrutiva:

    "${customPrompt}"

    Responda apenas se for relevante à prática farmacêutica.
  `;

    const contents: any[] = [{
        role: 'user',
        parts: [{ text: prompt }],
    }];

    if (imageUri) {
        console.log(imageUri);
        try {
            const base64pic = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            contents[0].parts.push({
                inlineData: {
                    mimeType: getMimeType(imageUri),
                    data: base64pic,
                },
            });

            console.log(contents)

        } catch (error) {
            console.error("Erro ao ler imagem:", error);
            return "Erro ao processar a imagem.";
        }
    }

    try {
        const result = await ai.models.generateContent({ contents, model, config });
        return result.text;
    } catch (error) {
        console.error("Erro ao gerar conteúdo com IA:", error);
        return "Ocorreu um erro ao processar sua solicitação.";
    }
}
