FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build
RUN npm prune --production

ENV NODE_ENV=production
ENV PORT=5173

EXPOSE 5173

CMD ["node", "build/index.js"]
