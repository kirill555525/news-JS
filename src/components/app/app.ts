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
            this.controller.getNews(event, (data: NewsResponse): void => this.view.drawNews(data));
        });
        this.controller.getSources((data: SourcesResponse): void => this.view.drawSources(data));
    }
}