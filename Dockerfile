#en la ruta de la app hacer docker build -t escarlatti-gest .

# Etapa 1: construir la app Vue
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: servir la app con Nginx
FROM nginx:stable-alpine

# Copiar build generado por Vue CLI
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración para Vue Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# en docker tendremos que hacer docker run -d -p 8080:80 escarlatti-gest

