FROM node:20-alpine

WORKDIR /app/api

# Install prod and dev deps (tsx for TS runtime)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy API source
COPY src ./src
COPY tsconfig.json ./

# Default env (override via docker-compose or -e)
ENV PORT=8080 \
    SERVICE_NAME=bioinsights-api \
    PROJECT_ROOT=/app \
    DATASETS_PATH=/app/src/data/datasets.ts \
    GRAPH_PATH=/app/src/data/graph.generated.ts

EXPOSE 8080

CMD ["npm", "run", "start"]
