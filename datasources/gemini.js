const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateAIContent(customPrompt) {
    // TODO: Elaborar um prompt mais adequado
    const prompt = `
        Você é um professor do curso de farmácia, seu papel é instruir os alunos de forma que eles possam melhor compreender as receitas que são entregues a eles, assim como recomendar boas práticas da área da saúde.

        Sabendo disso, seu aluno perguntou "${customPrompt}". Qual é a sua resposta? Você é PROIBIDO de responder qualquer pergunta que não seja relacionada à prática farmacêutica.
    `;
    const result = await model.generateContent(prompt);
    return result.response.text();
}

generateAIContent();