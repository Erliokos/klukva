# Studio Landing Page

Одностраничный лендинг для студии веб-разработки на Next.js 14 (App Router) c TypeScript, Styled Components, Framer Motion, React Three Fiber и кастомной Canvas-анимацией частиц.

## Скрипты

- `npm run dev` — запуск режима разработки (Webpack через `NEXT_DISABLE_TURBOPACK=1`, http://localhost:3000).
- `npm run build` — production-сборка (см. примечание про переменную окружения ниже).
- `npm run start` — запуск собранного приложения.
- `npm run lint` — проверка ESLint.
- `npm run vite` / `npm run vite:build` — вспомогательная сборка мини-библиотеки для движка частиц (Vite в lib-режиме).

### Важное примечание

В окружении Cursor автоматически устанавливается переменная `__NEXT_PRIVATE_STANDALONE_CONFIG`, из-за которой Next.js пытается использовать сериализованную конфигурацию и падает на шаге генерации `BUILD_ID`. Перед запуском `npm run build` (и `npm run start`) необходимо удалить эту переменную:

```bash
unset __NEXT_PRIVATE_STANDALONE_CONFIG
npm run build
```

Или можно разово выполнить:

```bash
env -u __NEXT_PRIVATE_STANDALONE_CONFIG npm run build
```

## Структура

- `app/` — App Router, layout + страница.
- `components/` — переиспользуемые компоненты (UI, Canvas, провайдеры, шапка и т. д.).
- `sections/` — логические блоки лендинга (Hero, Услуги, Преимущества, Портфолио, Процесс, Отзывы, Контакты).
- `styles/` — тема, глобальные стили и SSR-реестр Styled Components.
- `lib/particles/` — TypeScript-движок частиц (можно собирать Vite в `public/assets/particles-lib`).
- `public/assets/` — изображения-заглушки портфолио.

## Фичи

- Sticky-хедер с бургером и переключением темы.
- Hero с Canvas-анимацией частиц и сценой React Three Fiber.
- Анимации Framer Motion при скролле и ховере.
- Карточки услуг, преимуществ, портфолио, этапов процесса.
- Отзывы (grid) и форма заявки на базе `react-hook-form` с валидацией.
- Контакты + CTA, light/dark темы.

## Запуск

```bash
npm install
npm run dev
```

Для production:

```bash
unset __NEXT_PRIVATE_STANDALONE_CONFIG
npm run build
npm run start
```
