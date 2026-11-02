# news-JS

## Запуск

Нужен Node.js 24.
1. npm ci
2. Скопировать .env.example в .env.
3. npm start
4. Открыть http://localhost:8080.

По умолчанию .env.example использует статические /mocks/ без личного ключа.
Для реальных данных: API_URL=https://rss-news-api.onrender.com/ и свой API_KEY.
После изменения .env нужно перезапустить сервер или пересобрать проект. 
