import { useEffect, useState } from 'react';
import { NewsService } from '../services/newsService';
import { NewsItem, NewsState } from '../types/news';

export const useNews = () => {
    const [state, setState] = useState<NewsState>({
        loading: true,
        error: null,
        news: []
    });

    const fetchNews = async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));
            const newsService = NewsService.getInstance();
            const news = await newsService.fetchNews();
            setState({ loading: false, error: null, news });
        } catch (error) {
            setState({
                loading: false,
                error: 'Falha ao carregar notícias',
                news: []
            });
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return {
        ...state,
        refreshNews: fetchNews
    };
}; 