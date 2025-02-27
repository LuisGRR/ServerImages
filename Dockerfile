FROM node:20-buster

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN chown root.root .

#instalacion Sharp reconstruccion para la plataforma correcta
RUN npm install sharp
RUN npm rebuild --arch=x64 --platform=linux --libc=musl sharp

COPY . .

EXPOSE 3000

CMD ["node","/app/src/index.js"]

