# Установка базового образа Node.js
FROM node:14

# Установка рабочей директории в контейнере
WORKDIR /usr/src/app

# Копирование файлов package.json и package-lock.json (если есть)
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование остальных файлов проекта
COPY . .

# Объявление порта, который будет слушать приложение
EXPOSE 3000

# Запуск приложения
CMD [ "npm", "start" ]