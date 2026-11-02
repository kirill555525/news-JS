export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything'
}

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export type SourcePreview = Pick<Source, 'id' | 'name'>;

export interface Article {
    source: { id: string | null; name: string };
    author: string | null;
    title: string | null;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesResponse {
    status: 'ok';
    sources: Source[];
}

export interface NewsResponse {
    status: 'ok';
    totalResults: number;
    articles: Article[];
}

export interface ApiErrorResponse {
    status: 'error';
    code: string;
    message: string;
}

export type SortBy = 'relevancy' | 'popularity' | 'publishedAt';

export type QueryParams = Readonly<Partial<{
    apiKey: string;
    sources: string;
    pageSize: number;
    page: number;
    sortBy: SortBy;
}>>;

export interface RequestOptions {
    endpoint: Endpoint;
    options?: QueryParams;
}

export interface ApiConfig {
    baseUrl: string;
    apiKey: string;
}

export type Callback<T> = (data: T) => void;
export type ResponseParser<T> = (data: unknown) => T;
export type Guard<T> = (data: unknown) => data is T;