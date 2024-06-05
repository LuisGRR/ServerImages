const { Router } = require("express");
const router = Router();

const middlewareSession = require("../middlewares/middleware.session");

const vista = require("../controllers/views/vistas");

const viewLogin = require("../controllers/views/login.view");

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

router.get("/",viewLogin.viewLogin );

//views for imgs
router.get("/home", middlewareSession.checkLoggedIn, vista.index);

router.get("/upload", middlewareSession.checkLoggedIn, vista.upload);

router.get("/resizes", middlewareSession.checkLoggedIn, vista.resizes);

//img manipulation view
router.get("/image/:id", middlewareSession.checkLoggedIn, vista.imageById);

router.get("/image/:id/edit", middlewareSession.checkLoggedIn, vista.imageEdit);

router.get("/image/:id/:type", middlewareSession.checkLoggedIn, vista.imageManipulation);

// routers img
router.post("/upload", middlewareSession.checkLoggedIn, postController.uploadImage);

router.post("/image/rezise", middlewareSession.checkLoggedIn, postController.rezise);

router.post("/image/convert", middlewareSession.checkLoggedIn, postController.convert);


router.delete("/image/:id/delete", middlewareSession.checkLoggedIn, deleteController.deleteImage);

router.put("/image/:id/edit",middlewareSession.checkLoggedIn ,putController.editImage);

//login

router.post("/login",apiLogin.login);

router.post("/register",apiLogin.register);

router.get("/logout",middlewareSession.checkLoggedIn ,apiLogin.logout);

//Tags api

router.get("/tags",middlewareSession.checkLoggedIn ,apiTags.tags);
router.post("/tag",middlewareSession.checkLoggedIn ,apiTags.tagSave);

//API REST
router.get("/images",Images.images);

module.exports = router;
