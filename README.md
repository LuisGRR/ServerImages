# Servididor de imagenes

## Introduccon

Este es un servidor de imagenes creado con Node.ja y Express con una base de datos en mongo para su facil indexaciòn sobre las imagenes guardadas,
las imagenes se guardan directamente en la carpeta destinada, creando una referencia de la ruta en la bd Mongo

El proyecto utiliza ejs.js para renderizar las vistas del servidor

Se  usa docker para el proyecto y todo el entorno docker-compose para crear la bd de mongo y la imagen del proyecto

## Intalaciòn

Para instalar las dependecias necesarias, ejecutara el sigiente comando en la terminal:

```bash
npm install
```

Pata crear la imagen del proyecto

```bash
docker build -t ServerImages .
```

>[!NOTE]
> El . es por que la terminal esta abierta en la raiz del proycto donde se encuentra el archivo Dockerfile

Para ejecutar el proyecto en docker

```bash
docker-compose up -d
```

>[!NOTE]
>CAmbiar la cadena de conexion de mongo en el archivo DB para apuntar al contenedor de la bd

## Uso

Para inicar el servidor, ejecutarel siguiente comando

```bash
npm run dev
```

Una vez que el servidor este funcionanado, se puede acceder a el en el navegador con la ruta `http://localhost:3000`

## Como funciona

Este servidor de imagenes utiliza Node.js y Express.js para servir las imagenes estaticas. Las imagenes se alamcenan en la carpeta `public/img/uploads` cada que se sube una imagen al servidor por medio del formulario, cada imagen se muestra en la pagina principal del servidor.

>[!NOTE]
>La carpeta de almcanamiento se crea cuando se sube una imagen al servidor en caso que no este creada de antelacion


### Dependcias

|Nombre|Version |
|------|--------|
|Express|4.18.2|
|Node|latest|
|ejs|3.1.9|
|fs-extra|11.2.0|
|mongose|8.0.4|
|morgan|1.10.0|
|multer|1.4.5-lts.1|
|sharp|0.33.2|
|timeago.js|4.0.2|
|uuid|9.0.1|
|nodemon|3.0.2|
|tailwindcss|3.4.1|




