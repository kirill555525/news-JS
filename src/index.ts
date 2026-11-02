import App from './components/app/app';
import { requireElement } from './utils/dom';
import courseLogo from './assets/rss-logo.svg';
import './global.css';

requireElement('.course-logo', HTMLImageElement).src = courseLogo;
requireElement('.demo-note', HTMLElement).hidden = !(process.env.API_URL ?? '').includes('/mocks/');
const app: App = new App();
void app.start().catch((error: unknown): void => {
    requireElement('.status', HTMLElement).textContent = error instanceof Error ? error.message : 'Не удалось запустить приложение.';
});