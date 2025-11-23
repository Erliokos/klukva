# Используем Node LTS для ARM64
FROM node:20-alpine

# Рабочая директория
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Сборка проекта
RUN npm run build

# Экспонируем порт Next.js
EXPOSE 3001

# Команда запуска SSR
CMD ["npm", "start"]
