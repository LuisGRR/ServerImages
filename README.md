# Servidor de imágenes.

## Introducción.

Este es un servidor de imágenes que se creó con Node.js y Express y tiene una base de datos en Mongo para que se puedan indexar las imágenes guardadas. Las imágenes se guardan directamente en la carpeta destinada, dando lugar a una referencia de la ruta en la bd Mongo.

El proyecto utiliza ejs.js para renderizar las vistas del servidor

Se usa Docker para el proyecto y todo el entorno docker-compose para crear la bd de Mongo y la imagen del proyecto.

## Instalación

Para instalar las dependencias necesarias, ejecutará el siguiente comando en la terminal:

```bash
npm install
```

Pata crear la imagen del proyecto

```bash
docker build -t ServerImages .
```

>[!NOTE]
> Él `.` es porque la terminal está abierta en la raíz del proyecto donde se encuentra el archivo Dockerfile.

Para ejecutar el proyecto en docker

```bash
docker-compose up -d
```

>[!NOTE]
>Cambiar la cadena de conexión de mongo en el archivo DB para apuntar al contenedor de la bd

## Uso

Para iniciar el servidor, ejecutar el siguiente comando.

```bash
npm run dev
```

Una vez que el servidor esté funcionando, se puede acceder a él en el navegador con la ruta `http://localhost:3000`

## Cómo funciona

Este servidor de imágenes utiliza Node.js y Express.js para servir las imágenes estáticas. Las imágenes se almacenan en la carpeta, `public/img/uploads` cada vez que se sube una imagen al servidor por medio del formulario. Cada imagen se muestra en la página principal del servidor.

>[!NOTE]
>La carpeta de almacenamiento se genera cuando se sube una imagen al servidor en caso de que no esté creada con anticipación.

### Dependencias

|Nombre|Versión |
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




