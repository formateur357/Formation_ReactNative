import { Article } from '../types/article'

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const async function fetchArticles(): Promise<Article[]> {
    const response = await fetch(${`{BASE_URL}/posts`);

    if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
    }

    return response.json();
}

export async function fetchArticleById(id:string): Promise<Article> {
    const response = await fetch(${`{BASE_URL}/posts/${id}`);

    if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
    }

    return response.json();
}