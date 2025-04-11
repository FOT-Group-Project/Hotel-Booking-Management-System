# Use Node.js official image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Expose app port
EXPOSE 3001

# Run migrations and start the app
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npm start"]
