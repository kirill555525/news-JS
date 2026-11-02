import App from './components/app/app';
import { requireElement } from './utils/dom';
import './global.css';

const app: App = new App();
void app.start().catch((error: unknown): void => {
    requireElement('.status', HTMLElement).textContent = error instanceof Error ? error.message : 'Не удалось запустить приложение.';
});