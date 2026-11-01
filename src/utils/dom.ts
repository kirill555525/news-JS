export function requireElement<T extends Element>(
    selector: string,
    elementClass: { new(): T },
    root: ParentNode = document
): T {
    const element: Element | null = root.querySelector(selector);
    if (!(element instanceof elementClass)) {
        throw new Error(`Не найден ожидаемый HTML-элемент: ${selector}`);
    }
    return element;
}

export function cloneTemplate(selector: string): DocumentFragment {
    const template: HTMLTemplateElement = requireElement(selector, HTMLTemplateElement);
    const clone: Node = template.content.cloneNode(true);
    if (!(clone instanceof DocumentFragment)) {
        throw new Error(`Не удалось скопировать шаблон: ${selector}`);
    }
    return clone;
}

export function safeHttpUrl(value: string | null): string | null {
    if (!value) return null;
    try {
        const url: URL = new URL(value);
        return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
    } catch {
        return null;
    }
}