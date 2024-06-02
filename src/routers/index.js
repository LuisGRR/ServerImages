const { Router } = require("express");
const router = Router();

const middlewareSession = require("../middlewares/middleware.session");

const vista = require("../controllers/vistas");

const viewLogin = require("../controllers/login.view");

//controller logini
const apiLogin = require("../controllers/api/api.login");

//controllers for posts
const postController = require("../controllers/api/post");

//controllers for delete
const deleteController = require("../controllers/api/delete");

//controllers for put
const putController = require("../controllers/api/put");

//controllers for Tags
const apiTags = require("../controllers/api/tags");

//Controllers for images
const Images = require("../controllers/api/images.api");

//views for get

//view Login

router.get("/",viewLogin.view );

//views for imgs
router.get("/home", middlewareSession.checkLoggedIn, vista.index);

router.get("/upload", middlewareSession.checkLoggedIn, vista.upload);

router.get("/resizes", middlewareSession.checkLoggedIn, vista.resizes);

//img manipulation routers
router.get("/image/:id", middlewareSession.checkLoggedIn, vista.imageById);

router.get("/image/:id/edit", middlewareSession.checkLoggedIn, vista.imageEdit);

router.get("/image/:id/rezise", middlewareSession.checkLoggedIn, vista.imageRezise);

router.post("/upload", middlewareSession.checkLoggedIn, postController.uploadImage);

router.post("/image/rezise", middlewareSession.checkLoggedIn, postController.rezise);

router.delete("/image/:id/delete", middlewareSession.checkLoggedIn, deleteController.deleteImage);

router.put("/image/:id/edit",middlewareSession.checkLoggedIn ,putController.editImage);

//login

router.post("/login",apiLogin.login);

router.post("/register",apiLogin.register);

router.get("/logout",middlewareSession.checkLoggedIn ,apiLogin.logout);

//API REST
router.get("/images",Images.images);

//Tags api

router.get("/tags",apiTags.tags);
router.post("/tag",apiTags.tagSave);

module.exports = router;
