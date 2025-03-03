# Pendragon Gallery

![Home](https://github.com/LuisGRR/ServerImages/blob/master/docs/assets/2025-03-02%2022.18.03%20localhost%20c781b6a5579d.png)


## Introducción

Bienvenido al proyecto **Pendragon Gallery**, un servidor de imágenes de uso personal que ofrece una solución robusta y eficiente para la gestión de imágenes. Este servidor está diseñado para facilitar el almacenamiento, la manipulación y el acceso a imágenes.

### Características Principales

- **Detección de Imágenes Nuevas**: Verifica la carpeta utilizada como almacenamiento de imágenes para identificar si se han agregado nuevas imágenes de manera manual.

- **Detección de Imágenes Removidas**: Verifica la carpeta utilizada como almacenamiento de imágenes para determinar si se han eliminado imágenes de manera manual, con el fin de eliminar su registro de la base de datos.

- **Detección de Imágenes Duplicadas**: Compara las imágenes mediante histogramas para determinar si ya existe una imagen idéntica y registra en la base de datos la imagen original y sus duplicados.

- **Redimensionamiento y Transformación**: Soporta operaciones de imágenes, como redimensionamiento y conversión de formatos (JPEG, PNG, WEBP).

- **Autenticación y Autorización**: Incluye opciones de autenticación y autorización para proteger el acceso a las imágenes y permitir un control granular sobre quién puede ver y modificar los recursos.

### Notas Finales

Este proyecto está diseñado para ser fácil de usar y altamente funcional, proporcionando a los usuarios una herramienta eficaz para gestionar sus colecciones de imágenes de manera segura y organizada.

## Instalación

Para instalar las dependencias necesarias, ejecutará el siguiente comando en la terminal:

```bash
npm install
```

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
Luego, inicia el contenedor con:

```bash
docker-compose up
```
>[!NOTE]
>El proyecto incluye un archivo docker-compose.yml para facilitar el uso de docker-compose up.

Una vez que el servidor esté funcionando, podrás acceder a él en el navegador mediante la ruta `http://localhost:3000`
>[!NOTE]
>El proyecto cuenta con una variable de entorno para definir el pruerto

---

Aquí tienes el texto corregido y mejorado para mayor claridad y compresión:

## Cómo Funciona

Este servidor de imágenes utiliza **Node.js** y **Express.js** para servir imágenes estáticas. Las imágenes se almacenan en la carpeta `public/img/uploads` o en la carpeta definida cada vez que se sube una imagen al servidor a través del formulario. Además, el servidor compara la nueva imagen con las previamente registradas mediante histogramas para determinar si ya existe una imagen idéntica.

Cuando el servidor se inicia, verifica la carpeta y la base de datos para comprobar si las imágenes registradas en la carpeta existen. Si no se encuentran, se elimina el registro correspondiente. Asimismo, el servidor verifica si hay imágenes que no están registradas y, en caso de que no lo estén, las registra y determina si son duplicadas.

Cada vez que se agregan imágenes en la carpeta de almacenamiento, el servidor detecta automáticamente las nuevas imágenes y registra cada una en la base de datos.

Cada imagen se muestra en la página principal del servidor.

> **Nota:** La carpeta de almacenamiento se genera cuando se sube una imagen al servidor, en caso de que no esté creada previamente o no se haya definido otra ruta de almacenamiento de imágenes.

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
|chokidar|4.0.3|
|connect-mongo|5.1.0|
|express-session|1.18.0|
|express-winston|4.2.0|
|winston|3.17.0|
|winston-mongodb|6.0.0|
