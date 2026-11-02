import News from './news/news';
import Sources from './sources/sources';
import type { NewsResponse, Source, SourcesResponse } from '../../types';
import { requireElement } from '../../utils/dom';

export class AppView {
    private readonly news: News = new News();
    private readonly sources: Sources = new Sources();
    private readonly status: HTMLElement = requireElement('.status', HTMLElement);
    private readonly count: HTMLElement = requireElement('.source-count', HTMLElement);
    private allSources: readonly Source[] = [];

    public drawNews(data: NewsResponse): void {
        this.news.draw(data.articles);
        this.setStatus(data.articles.length ? `Показано новостей: ${Math.min(data.articles.length, 10)}` : 'У этого источника пока нет новостей.');
    }

    public drawSources(data: SourcesResponse, query: string): void {
        this.allSources = data.sources;
        this.filterSources(query);
    }

    public filterSources(query: string): void {
        const normalized: string = query.trim().toLocaleLowerCase();
        const filtered: Source[] = this.allSources.filter((source: Source): boolean =>
            source.name.toLocaleLowerCase().includes(normalized)
        );
        this.sources.draw(filtered);
        this.count.textContent = filtered.length ? `Источников: ${filtered.length}` : 'Источники не найдены.';
    }

    public selectSource(sourceId: string): void {
        this.sources.select(sourceId);
    }

    public clearNews(): void {
        this.news.draw([]);
    }

    public setStatus(message: string, isError: boolean = false): void {
        this.status.textContent = message;
        this.status.classList.toggle('status--error', isError);
    }
}