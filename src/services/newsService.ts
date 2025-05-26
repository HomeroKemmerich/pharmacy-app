import axios from 'axios';
import { NewsItem } from '../types/news';

const BASE_URL = 'https://site.cff.org.br';

export class NewsService {
    private static instance: NewsService;
    private constructor() { }

    static getInstance(): NewsService {
        if (!NewsService.instance) {
            NewsService.instance = new NewsService();
        }
        return NewsService.instance;
    }

    async fetchNews(): Promise<NewsItem[]> {
        try {
            const response = await axios.get(BASE_URL);
            // Note: This is a placeholder. In a real implementation, 
            // we would need to properly parse the HTML response or use an API
            // For demo purposes, returning mock data that matches the website's content
            return [
                {
                    title: 'Farmacêutica lança assistente virtual no WhatsApp que lê e explica a bula de medicamentos',
                    category: 'Notícias Gerais',
                    date: new Date().toLocaleDateString(),
                    link: 'https://site.cff.org.br/farmaceutica-lanca-assistente-virtual-no-whatsapp-que-le-e-explica-a-bula-de-medicamentos'
                },
                {
                    title: 'Congresso Consulfarma: maior evento do mundo no segmento magistral está com inscrições abertas',
                    category: 'Notícias Gerais',
                    date: new Date().toLocaleDateString(),
                    link: 'https://site.cff.org.br/congresso-consulfarma-maior-evento-do-mundo-no-segmento-magistral-esta-com-inscricoes-abertas'
                },
                {
                    title: '94% dos medicamentos genéricos vendidos no Brasil são produzidos por farmacêuticas nacionais',
                    category: 'Notícias Gerais',
                    date: new Date().toLocaleDateString(),
                    link: 'https://site.cff.org.br/94-dos-medicamentos-genericos-vendidos-no-brasil-sao-produzidos-por-farmaceuticas-nacionais'
                },
                {
                    title: 'Medicamentos que modulam GLP-1 alteram preferências alimentares, aponta estudo',
                    category: 'Notícias Gerais',
                    date: new Date().toLocaleDateString(),
                    link: 'https://site.cff.org.br/medicamentos-que-modulam-glp-1-alteram-preferencias-alimentares-aponta-estudo'
                },
                {
                    title: 'Composto de esponja marinha tem potencial para eliminar parasita da malária',
                    category: 'Notícias Gerais',
                    date: new Date().toLocaleDateString(),
                    link: 'https://site.cff.org.br/composto-de-esponja-marinha-tem-potencial-para-eliminar-parasita-da-malaria'
                }
            ];
        } catch (error) {
            console.error('Error fetching news:', error);
            throw new Error('Falha ao carregar notícias');
        }
    }
} 