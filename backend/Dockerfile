# Use Node.js
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npx sequelize-cli init


COPY . .

EXPOSE 3001
CMD ["npm", "start"]
