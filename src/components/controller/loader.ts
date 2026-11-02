import type { Callback, Endpoint, QueryParams, RequestOptions, ResponseParser } from '../../types';

export default class Loader {
    private readonly baseLink: string;
    private readonly options: QueryParams;

    public constructor(baseLink: string, options: QueryParams) {
        this.baseLink = baseLink.endsWith('/') ? baseLink : `${baseLink}/`;
        this.options = options;
    }

    protected async getResp<T>(
        { endpoint, options = {} }: RequestOptions,
        parse: ResponseParser<T>,
        callback: Callback<T>
    ): Promise<void> {
        const data: T = await this.load(endpoint, options, parse);
        callback(data);
    }

    private makeUrl(endpoint: Endpoint, options: QueryParams): string {
        const url: URL = new URL(endpoint, this.baseLink);
        const params: QueryParams = { ...this.options, ...options };
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== '') {
                url.searchParams.set(key, String(value));
            }
        }
        return url.href;
    }

    private async load<T>(endpoint: Endpoint, options: QueryParams, parse: ResponseParser<T>): Promise<T> {
        const response: Response = await fetch(this.makeUrl(endpoint, options), {
            method: 'GET',
            signal: AbortSignal.timeout(60_000)
        });
        if (!response.ok) {
            throw new Error(`Ошибка HTTP ${response.status}: ${response.statusText || 'запрос не выполнен'}`);
        }
        const data: unknown = await response.json();
        return parse(data);
    }
}