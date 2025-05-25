export interface Flashcard {
    id: string;
    front: string;
    back: string;
    category: string;
    lastReviewed?: Date;
    difficulty?: 'easy' | 'medium' | 'hard';
}

export interface FlashcardDeck {
    id: string;
    name: string;
    description: string;
    cards: Flashcard[];
    createdAt: Date;
    updatedAt: Date;
} 