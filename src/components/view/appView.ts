import News from './news/news';
import Sources from './sources/sources';
import type { NewsResponse, SourcesResponse } from '../../types';

export class AppView {
    private readonly news: News = new News();
    private readonly sources: Sources = new Sources();

    public drawNews(data: NewsResponse): void {
        this.news.draw(data.articles);
    }

    public drawSources(data: SourcesResponse): void {
        this.sources.draw(data.sources);
    }
}