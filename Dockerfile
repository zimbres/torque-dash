FROM node:22.15.0-slim

RUN groupadd -r appuser && useradd -r -g appuser -d /app appuser
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN chown -R appuser:appuser /app
USER appuser

CMD ["node", "app.js"]
