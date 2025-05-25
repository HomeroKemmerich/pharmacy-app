export interface Medication {
    id: string;
    name: string;
    genericName: string;
    brandNames: string[];
    category: string;
    description: string;
    dosageForm: string;
    strength: string;
    indications: string[];
    contraindications: string[];
    sideEffects: string[];
    mechanismOfAction: string;
    pregnancyCategory: 'A' | 'B' | 'C' | 'D' | 'X';
    createdAt: Date;
    updatedAt: Date;
}

export interface DrugInteraction {
    id: string;
    medicationId1: string;
    medicationId2: string;
    severityLevel: 'Minor' | 'Moderate' | 'Major' | 'Contraindicated';
    description: string;
    mechanism: string;
    clinicalManagement: string;
    references: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface MedicationDatabase {
    medications: Medication[];
    interactions: DrugInteraction[];
} 