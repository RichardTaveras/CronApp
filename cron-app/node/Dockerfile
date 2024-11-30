# Utilizar una imagen base de Node.js
FROM node:14

# Crear el directorio de la aplicación
WORKDIR /usr/src/app

# Copiar archivos de la aplicación
COPY package.json ./
COPY index.js ./

# Instalar dependencias
RUN npm install

# Exponer el puerto (opcional, si tu aplicación escucha en algún puerto)
# EXPOSE 8080

# Comando por defecto
CMD [ "npm", "start" ]
