export interface NewsItem {
    id: string;
    title: string;
    category: string;
    summary?: string;
    imageUrl?: string;
    publishedAt: Date;
    url: string;
}

export interface NewsCategory {
    id: string;
    name: string;
    slug: string;
} 