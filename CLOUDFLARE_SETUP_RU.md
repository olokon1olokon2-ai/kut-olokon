# КУТ — запуск на Cloudflare Workers + Neon + R2

## Что уже подготовлено
- Страницы сайта остаются в `public/`.
- API перенесён с Netlify Functions на Cloudflare Worker.
- PostgreSQL подключается через `env.HYPERDRIVE`.
- Зашифрованные файлы хранятся в приватном R2 через `env.EMPLOYEE_FILES`.
- Схема БД находится в `migrations/0001_initial_schema.sql`.

## ВАЖНО: перед первым запуском
1. Убедитесь, что пароль Neon был сброшен после прежней публикации строки подключения. Новую строку подключения не отправляйте в чат и не помещайте в Git.
2. В Neon откройте SQL Editor, выберите базу `neondb` и выполните целиком SQL из `migrations/0001_initial_schema.sql`.
3. В Cloudflare Worker `kut-olokon` → Settings → Variables and Secrets добавьте как **Secrets** три значения: `KUT_SESSION_SECRET`, `KUT_DATA_ENCRYPTION_KEY`, `KUT_SETUP_TOKEN`.
4. Сгенерировать три значения можно локально командой `node scripts/generate-secrets.mjs` после `npm install`. Сохраните их в надёжном месте. Не публикуйте их и не отправляйте в чат.
5. В Cloudflare у Worker должны быть bindings:
   - `HYPERDRIVE` → `kut-olokon-db`
   - `EMPLOYEE_FILES` → `kut-private-employee-files`
6. Перед deploy проверьте, что `wrangler.jsonc` содержит актуальные ID Hyperdrive и имя R2 bucket. Сейчас указаны созданные в этом проекте значения.

## Развёртывание через GitHub
1. Загрузите содержимое этой папки в корень репозитория `olokon1olokon2-ai/kut-olokon` (с сохранением папок `public`, `netlify/functions`, `migrations`, `scripts`).
2. В Cloudflare → Workers & Pages → `kut-olokon` → Settings → Builds проверьте:
   - Root directory: `/`
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
3. Убедитесь, что secrets и bindings настроены для Production.
4. Только после этого запускайте deployment.

## Первичная настройка приложения
После успешного deployment откройте `/setup`. Введите `KUT_SETUP_TOKEN` из Cloudflare Secrets, задайте логин администратора и длинный пароль (не менее 14 символов). Затем войдите через `/login`.

## Важные замечания
- Не делайте R2 bucket публичным. Доступ к фото и паспортным сканам идёт только через API после проверки сессии и прав.
- Не удаляйте старый Netlify-проект и исходный ZIP до успешной проверки входа, создания/согласования пропуска, просмотра фото и скачивания документов.
- Перед production запуском сначала выполните SQL migration. Сам Worker автоматически не создаёт таблицы.
- Старые Netlify-файлы оставлены в проекте как исходный архив; активный Worker импортирует только адаптированный API.
