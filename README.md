# Servidor de imágenes

## Introducción

Bienvenido al proyecto de Servidor de Imágenes, una solución robusta y eficiente para la gestión y distribución de imágenes. Este servidor está diseñado para facilitar el almacenamiento, la manipulación y el acceso a imágenes

### Características Principales

- **Almacenamiento Seguro**: Las imágenes se almacenan de manera segura

- **Redimensionamiento y Transformación**: Soporta operaciones de imágenes, como redimensionamiento y conversion de tipos(jpeg, png, webp).

- **Autenticación y Autorización**: Incluye opciones de autenticación y autorización para proteger el acceso a las imágenes y permitir un control granular sobre quién puede ver y modificar los recursos.

## Instalación

Para instalar las dependencias necesarias, ejecutará el siguiente comando en la terminal:

```bash
npm install
```

>[!NOTE]
>Cambiar la cadena de conexión de mongo en el archivo .env de la variable DB_CONNECTION_URL

## Uso

Para iniciar el servidor, ejecutar el siguiente comando.

```bash
npm run dev
```

## Uso con docker

Para crear la imagen del proyecto

```bash
docker build -t ServerImages .
```

>[!NOTE]
> Él `.` es porque la terminal está abierta en la raíz del proyecto donde se encuentra el archivo Dockerfile.

Para ejecutar el proyecto en docker

```bash
docker compose up
```

>[!NOTE]
>Cambiar la cadena de conexión de mongo en el archivo DB para apuntar al contenedor de la bd

---

Una vez que el servidor esté funcionando, se puede acceder a él en el navegador con la ruta `http://localhost:3000`

## Cómo funciona

Este servidor de imágenes utiliza Node.js y Express.js para servir las imágenes estáticas. Las imágenes se almacenan en la carpeta, `public/img/uploads` cada vez que se sube una imagen al servidor por medio del formulario.

Cada imagen se muestra en la página principal del servidor.

>[!NOTE]
>La carpeta de almacenamiento se genera cuando se sube una imagen al servidor en caso de que no esté creada con anticipación.

### Dependencias

|Nombre|Versión |
|------|--------|
|Express|4.19.2|
|Node|>=21.5.0|
|ejs|3.1.10|
|fs-extra|11.2.0|
|mongose|8.4.1|
|morgan|1.10.0|
|multer|1.4.5-lts.1|
|sharp|0.33.2|
|timeago.js|4.0.2|
|uuid|9.0.1|
|nodemon|3.1.2|
|tailwindcss|3.4.1|
|@tailwindcss/typography|0.5.13|
|bcrypt|5.1.1|
|dotenv|16.3.1|
|express-session|1.18.0|
|daisyui|4.12.2|
