import { GoogleGenAI } from '@google/genai';
import * as FileSystem from 'expo-file-system';
import { findInteractions, formatInteractionForGemini, formatMedicationForGemini, searchMedications } from './medicationDatabase';
import { getMimeType } from './mime';

const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY });

const config = {
    responseMimeType: 'text/plain'
};

const model = 'gemini-1.5-flash';

export async function generateAIContent(customPrompt: string, imageUri?: string) {
    // First, try to find any relevant medication information
    const medications = await searchMedications(customPrompt);
    let medicationInfo = '';

    if (medications.length > 0) {
        medicationInfo = '\n\nInformações relevantes dos medicamentos encontrados:\n\n';
        for (const med of medications) {
            medicationInfo += formatMedicationForGemini(med) + '\n\n';

            // Get interactions for this medication
            const interactions = await findInteractions(med.id);
            if (interactions.length > 0) {
                medicationInfo += 'Interações medicamentosas:\n\n';
                for (const interaction of interactions) {
                    medicationInfo += formatInteractionForGemini(interaction, medications) + '\n\n';
                }
            }
        }
    }

    const prompt = `
    Você é um professor do curso de farmácia com vasto conhecimento em farmacologia e interações medicamentosas. 
    Analise a imagem fornecida (se houver) junto com a pergunta abaixo e dê uma resposta clara e instrutiva.
    Use as informações do banco de dados de medicamentos fornecidas (se houver) para enriquecer sua resposta.

    Pergunta do usuário: "${customPrompt}"

    ${medicationInfo}

    Responda apenas se for relevante à prática farmacêutica.
    Se houver informações sobre medicamentos ou interações no banco de dados, use-as para fundamentar sua resposta.
    Se não houver informações específicas no banco de dados, forneça uma resposta baseada em seu conhecimento geral,
    mas indique claramente que está fazendo isso.
  `;

    const contents: any[] = [{
        role: 'user',
        parts: [{ text: prompt }],
    }];

    if (imageUri) {
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
