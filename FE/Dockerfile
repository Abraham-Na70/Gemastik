# --- Build Stage ---
FROM node:22-alpine AS build
WORKDIR /app

# --- Baris-baris ini sangat penting ---
# Mendeklarasikan build arguments
ARG VITE_BACKEND_API_URL
ARG VITE_AI_API_URL

# Menjadikannya environment variable untuk proses build
ENV VITE_BACKEND_API_URL=$VITE_BACKEND_API_URL
ENV VITE_AI_API_URL=$VITE_AI_API_URL
# ------------------------------------

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Production Stage (Nginx) ---
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]