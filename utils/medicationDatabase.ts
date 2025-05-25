import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrugInteraction, Medication, MedicationDatabase } from '../types/medication';

const MEDICATION_DB_KEY = 'medication-database';

// Sample initial data - you would replace this with real data from a reliable source
const initialMedicationData: MedicationDatabase = {
    medications: [
        {
            id: '1',
            name: 'Paracetamol',
            genericName: 'Acetaminophen',
            brandNames: ['Tylenol', 'Panadol'],
            category: 'Analgesics',
            description: 'Common pain reliever and fever reducer',
            dosageForm: 'Tablet',
            strength: '500mg',
            indications: ['Pain relief', 'Fever reduction'],
            contraindications: ['Severe liver disease'],
            sideEffects: ['Liver damage in high doses', 'Nausea'],
            mechanismOfAction: 'Inhibits prostaglandin synthesis in the CNS',
            pregnancyCategory: 'B',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],
    interactions: [
        {
            id: '1',
            medicationId1: '1',
            medicationId2: '2',
            severityLevel: 'Moderate',
            description: 'May increase risk of liver damage when used together',
            mechanism: 'Additive hepatotoxicity',
            clinicalManagement: 'Monitor liver function and avoid prolonged concurrent use',
            references: ['Drug Information Handbook 2023'],
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]
};

export async function initializeMedicationDatabase() {
    try {
        const existingData = await AsyncStorage.getItem(MEDICATION_DB_KEY);
        if (!existingData) {
            await AsyncStorage.setItem(MEDICATION_DB_KEY, JSON.stringify(initialMedicationData));
        }
    } catch (error) {
        console.error('Error initializing medication database:', error);
    }
}

export async function getMedicationDatabase(): Promise<MedicationDatabase | null> {
    try {
        const data = await AsyncStorage.getItem(MEDICATION_DB_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting medication database:', error);
        return null;
    }
}

export async function searchMedications(query: string): Promise<Medication[]> {
    try {
        const database = await getMedicationDatabase();
        if (!database) return [];

        const normalizedQuery = query.toLowerCase();
        return database.medications.filter(med =>
            med.name.toLowerCase().includes(normalizedQuery) ||
            med.genericName.toLowerCase().includes(normalizedQuery) ||
            med.brandNames.some(brand => brand.toLowerCase().includes(normalizedQuery))
        );
    } catch (error) {
        console.error('Error searching medications:', error);
        return [];
    }
}

export async function findInteractions(medicationId: string): Promise<DrugInteraction[]> {
    try {
        const database = await getMedicationDatabase();
        if (!database) return [];

        return database.interactions.filter(interaction =>
            interaction.medicationId1 === medicationId ||
            interaction.medicationId2 === medicationId
        );
    } catch (error) {
        console.error('Error finding interactions:', error);
        return [];
    }
}

export function formatMedicationForGemini(medication: Medication): string {
    return `
Nome: ${medication.name}
Nome Genérico: ${medication.genericName}
Marcas: ${medication.brandNames.join(', ')}
Categoria: ${medication.category}
Descrição: ${medication.description}
Forma de Dosagem: ${medication.dosageForm}
Concentração: ${medication.strength}
Indicações: ${medication.indications.join(', ')}
Contraindicações: ${medication.contraindications.join(', ')}
Efeitos Colaterais: ${medication.sideEffects.join(', ')}
Mecanismo de Ação: ${medication.mechanismOfAction}
Categoria na Gravidez: ${medication.pregnancyCategory}
    `.trim();
}

export function formatInteractionForGemini(interaction: DrugInteraction, medications: Medication[]): string {
    const med1 = medications.find(m => m.id === interaction.medicationId1);
    const med2 = medications.find(m => m.id === interaction.medicationId2);

    return `
Interação entre ${med1?.name} e ${med2?.name}
Nível de Severidade: ${interaction.severityLevel}
Descrição: ${interaction.description}
Mecanismo: ${interaction.mechanism}
Manejo Clínico: ${interaction.clinicalManagement}
Referências: ${interaction.references.join(', ')}
    `.trim();
} 