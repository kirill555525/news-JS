import Loader from './loader';
import type { ApiConfig } from '../../types';

const config: Readonly<ApiConfig> = {
    baseUrl: process.env.API_URL ?? 'https://rss-news-api.onrender.com/mocks/',
    apiKey: process.env.API_KEY ?? ''
};

export default class AppLoader extends Loader {
    public constructor() {
        super(config.baseUrl, { apiKey: config.apiKey });
    }
}