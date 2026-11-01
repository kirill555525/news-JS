import type { Article } from '../../../types';
import { cloneTemplate, requireElement, safeHttpUrl } from '../../../utils/dom';
import placeholderUrl from '../../../assets/news-placeholder.svg';
import './news.css';

export default class News {
    private readonly container: HTMLElement = requireElement('.news', HTMLElement);

    public draw(data: readonly Article[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        data.slice(0, 10).forEach((item: Article): void => {
            const clone: DocumentFragment = cloneTemplate('#newsItemTemp');
            const image: HTMLImageElement = requireElement('.news__meta-photo', HTMLImageElement, clone);
            const link: HTMLAnchorElement = requireElement('.news__read-more a', HTMLAnchorElement, clone);
            const date: HTMLTimeElement = requireElement('.news__meta-date', HTMLTimeElement, clone);
            const articleUrl: string | null = safeHttpUrl(item.url);

            image.src = safeHttpUrl(item.urlToImage) ?? placeholderUrl;
            image.alt = item.title ?? 'Иллюстрация к новости';
            image.addEventListener('error', (): void => { image.src = placeholderUrl; }, { once: true });

            requireElement('.news__meta-author', HTMLElement, clone).textContent = item.author ?? item.source.name;
            requireElement('.news__description-title', HTMLElement, clone).textContent = item.title ?? 'Без заголовка';
            requireElement('.news__description-source', HTMLElement, clone).textContent = item.source.name;
            requireElement('.news__description-content', HTMLElement, clone).textContent = item.description ?? 'Описание отсутствует.';

            const publishedAt: Date = new Date(item.publishedAt);
            if (Number.isNaN(publishedAt.getTime())) {
                date.textContent = 'Дата неизвестна';
            } else {
                date.dateTime = publishedAt.toISOString();
                date.textContent = publishedAt.toLocaleDateString('ru-RU', { timeZone: 'UTC' });
            }

            if (articleUrl) link.href = articleUrl;
            else link.hidden = true;
            fragment.append(clone);
        });
        this.container.replaceChildren(fragment);
    }
}