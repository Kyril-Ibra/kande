# Wedding site — static GitHub Pages version

Это независимая статическая версия сайта, воссозданная по опубликованной Framer-странице.

## Файлы
- `index.html` — структура страницы
- `styles.css` — responsive-стили
- `script.js` — плавная навигация и демо-обработка RSVP

## Важно про изображения
Сейчас изображения загружаются по публичным URL `framerusercontent.com`. Для полной независимости скачайте их в папку `assets/` и замените URL в `index.html` на локальные пути.

## Важно про RSVP
GitHub Pages — статический хостинг и не принимает формы сам по себе. Сейчас форма сохраняет ответ только в `localStorage` браузера как демонстрация.

Для реального сбора ответов подключите, например, Formspree/FormSubmit/Netlify Forms или свой endpoint. Самый простой путь с Formspree:
1. Создайте форму в Formspree.
2. Получите endpoint вида `https://formspree.io/f/XXXXXX`.
3. В `index.html` замените `<form id="rsvpForm" novalidate>` на `<form action="ВАШ_ENDPOINT" method="POST">`.
4. Уберите/измените обработчик submit в `script.js`.

## GitHub Pages
1. Создайте новый repository на GitHub.
2. Загрузите содержимое этой папки в корень репозитория.
3. Откройте `Settings → Pages`.
4. `Source: Deploy from a branch`.
5. Branch: `main`, Folder: `/ (root)`.
6. Нажмите Save.

Через несколько минут GitHub покажет адрес опубликованного сайта.


## Motion / animations
This version includes restrained Framer-like motion implemented in plain CSS/JavaScript: hero entrance, scroll reveals, staggered date cards, alternating timeline reveals, FAQ disclosure animation, button micro-interactions, selected radio states, and a subtle closing-image parallax. `prefers-reduced-motion` is respected automatically.
