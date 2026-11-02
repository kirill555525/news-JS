import AppLoader from './appLoader';
import { Endpoint } from '../../types';
import type { Callback, NewsResponse, SourcesResponse } from '../../types';
import { parseNewsResponse, parseSourcesResponse } from '../../utils/guards';

export default class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesResponse>): Promise<void> {
        return this.getResp<SourcesResponse>(
            { endpoint: Endpoint.Sources },
            parseSourcesResponse,
            callback
        );
    }

    public getNews(sourceId: string, callback: Callback<NewsResponse>): Promise<void> {
        return this.getResp<NewsResponse>(
            { endpoint: Endpoint.Everything, options: { sources: sourceId, pageSize: 10, sortBy: 'publishedAt' } },
            parseNewsResponse,
            callback
        );
    }
}