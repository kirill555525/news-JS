import type { SourcePreview } from '../../../types';
import { cloneTemplate, requireElement } from '../../../utils/dom';
import './sources.css';

export default class Sources {
    private readonly container: HTMLElement = requireElement('.sources', HTMLElement);
    private selectedId: string | null = null;

    public draw(data: readonly SourcePreview[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        data.forEach((item: SourcePreview): void => {
            const clone: DocumentFragment = cloneTemplate('#sourceItemTemp');
            const button: HTMLButtonElement = requireElement('.source__item', HTMLButtonElement, clone);
            requireElement('.source__item-name', HTMLElement, clone).textContent = item.name;
            button.dataset.sourceId = item.id;
            button.setAttribute('aria-pressed', String(item.id === this.selectedId));
            fragment.append(clone);
        });
        this.container.replaceChildren(fragment);
    }

    public select(sourceId: string): void {
        this.selectedId = sourceId;
        this.container.querySelectorAll('button').forEach((button: HTMLButtonElement): void => {
            button.setAttribute('aria-pressed', String(button.dataset.sourceId === sourceId));
        });
    }
}