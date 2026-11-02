import type { ApiErrorResponse, Article, Guard, NewsResponse, Source, SourcesResponse } from '../types';

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNullableString(value: unknown): value is string | null {
    return typeof value === 'string' || value === null;
}

function isArrayOf<T>(value: unknown, guard: Guard<T>): value is T[] {
    return Array.isArray(value) && value.every(guard);
}

function isSource(value: unknown): value is Source {
    return isRecord(value)
        && typeof value.id === 'string'
        && typeof value.name === 'string'
        && typeof value.description === 'string'
        && typeof value.url === 'string'
        && typeof value.category === 'string'
        && typeof value.language === 'string'
        && typeof value.country === 'string';
}

function isArticle(value: unknown): value is Article {
    return isRecord(value)
        && isRecord(value.source)
        && isNullableString(value.source.id)
        && typeof value.source.name === 'string'
        && isNullableString(value.author)
        && isNullableString(value.title)
        && isNullableString(value.description)
        && typeof value.url === 'string'
        && isNullableString(value.urlToImage)
        && typeof value.publishedAt === 'string'
        && isNullableString(value.content);
}

function isApiError(value: unknown): value is ApiErrorResponse {
    return isRecord(value)
        && value.status === 'error'
        && typeof value.code === 'string'
        && typeof value.message === 'string';
}

function isSourcesResponse(value: unknown): value is SourcesResponse {
    return isRecord(value)
        && value.status === 'ok'
        && isArrayOf(value.sources, isSource);
}

function isNewsResponse(value: unknown): value is NewsResponse {
    return isRecord(value)
        && value.status === 'ok'
        && typeof value.totalResults === 'number'
        && Number.isFinite(value.totalResults)
        && isArrayOf(value.articles, isArticle);
}

function parseResponse<T>(value: unknown, guard: Guard<T>): T {
    if (isApiError(value)) {
        throw new Error(`${value.code}: ${value.message}`);
    }
    if (!guard(value)) {
        throw new Error('Сервер вернул данные неожиданного формата.');
    }
    return value;
}

export function parseSourcesResponse(value: unknown): SourcesResponse {
    return parseResponse(value, isSourcesResponse);
}

export function parseNewsResponse(value: unknown): NewsResponse {
    return parseResponse(value, isNewsResponse);
}