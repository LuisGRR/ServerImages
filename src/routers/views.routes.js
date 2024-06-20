const { Router } = require("express");
const router = Router();

const middlewareSession = require("../middlewares/middleware.session");

const vista = require("../controllers/views/vistas");
const viewLogin = require("../controllers/views/login.view");

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

module.exports = router;