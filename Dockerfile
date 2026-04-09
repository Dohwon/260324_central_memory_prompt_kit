FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build
RUN mkdir -p .next/standalone/.next && cp -R .next/static .next/standalone/.next/static
RUN if [ -d public ]; then cp -R public .next/standalone/public; fi

ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

EXPOSE 8080

CMD ["node", ".next/standalone/server.js"]
