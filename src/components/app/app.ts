import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import type { NewsResponse, SourcesResponse } from '../../types';
import { requireElement } from '../../utils/dom';

export default class App {
    private readonly controller: AppController = new AppController();
    private readonly view: AppView = new AppView();

    public start(): void {
        const sources: HTMLElement = requireElement('.sources', HTMLElement);
        sources.addEventListener('click', (event: MouseEvent): void => {
            if (!(event.target instanceof Element)) return;
            const button: Element | null = event.target.closest('.source__item');
            if (!(button instanceof HTMLButtonElement) || !sources.contains(button)) return;
            const sourceId: string | undefined = button.dataset.sourceId;
            if (!sourceId) return;
            void this.controller.getNews(sourceId, (data: NewsResponse): void => this.view.drawNews(data))
                .catch((error: unknown): void => console.error(error));
        });
        void this.controller.getSources((data: SourcesResponse): void => this.view.drawSources(data))
            .catch((error: unknown): void => console.error(error));
    }
}