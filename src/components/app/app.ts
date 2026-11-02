import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import type { NewsResponse, SourcesResponse } from '../../types';
import { requireElement } from '../../utils/dom';

export default class App {
    private readonly controller: AppController = new AppController();
    private readonly view: AppView = new AppView();
    private selectedSource: string | null = null;

    public async start(): Promise<void> {
        const sources: HTMLElement = requireElement('.sources', HTMLElement);
        const search: HTMLInputElement = requireElement('#source-search', HTMLInputElement);

        sources.addEventListener('click', (event: MouseEvent): void => {
            if (!(event.target instanceof Element)) return;
            const button: Element | null = event.target.closest('.source__item');
            if (!(button instanceof HTMLButtonElement) || !sources.contains(button)) return;
            const sourceId: string | undefined = button.dataset.sourceId;
            if (sourceId) void this.loadNews(sourceId);
        });

        search.addEventListener('input', (): void => this.view.filterSources(search.value));

        this.view.setStatus('Загружаем источники…');
        try {
            await this.controller.getSources((data: SourcesResponse): void => this.view.drawSources(data, search.value));
            this.view.setStatus('Выберите источник, чтобы прочитать новости.');
        } catch (error: unknown) {
            this.showError(error);
        }
    }

    private async loadNews(sourceId: string): Promise<void> {
        if (sourceId === this.selectedSource) return;
        this.selectedSource = sourceId;
        this.view.selectSource(sourceId);
        this.view.clearNews();
        this.view.setStatus('Загружаем новости…');

        try {
            await this.controller.getNews(sourceId, (data: NewsResponse): void => {
                this.view.drawNews(data);
            });
        } catch (error: unknown) {
            this.selectedSource = null; // Теперь на тот же источник можно нажать повторно.
            this.showError(error);
        }
    }

    private showError(error: unknown): void {
        const message: string = error instanceof Error ? error.message : 'Неизвестная ошибка.';
        this.view.setStatus(`Не удалось получить данные. ${message}`, true);
    }
}