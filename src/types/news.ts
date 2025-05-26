export interface NewsItem {
    title: string;
    category: string;
    imageUrl?: string;
    description?: string;
    link?: string;
    date?: string;
}

export interface NewsState {
    loading: boolean;
    error: string | null;
    news: NewsItem[];
} 