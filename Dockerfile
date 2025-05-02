FROM node:22.15.0-slim

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

CMD ["node", "app.js"]
