FROM node:20-alpine

WORKDIR /app/api

COPY package.json package-lock.json* ./
RUN npm ci

COPY src ./src
COPY tsconfig.json ./

ENV PORT=8080 \
    SERVICE_NAME=bioinsights-api \
    PROJECT_ROOT=/app \
    DATASETS_PATH=/app/data/datasets.ts \
    GRAPH_PATH=/app/data/graph.generated.ts

EXPOSE 8080

CMD ["npm", "run", "start"]
