# Immagine Node LTS compatibile con Angular
FROM node:20-alpine

# Directory di lavoro
WORKDIR /app

# Copia package.json e lock
COPY package*.json ./

# Installa dipendenze
RUN npm install

# Copia il resto del progetto
COPY . .

# Espone la porta di Angular
EXPOSE 4200

# Avvio dev server
CMD ["npm", "start"]
