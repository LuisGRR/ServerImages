const { Router } = require("express");
const router = Router();

const middlewareSession = require("../middlewares/middleware.session");


const Images = require("../controllers/rest/images.api");

router.get("/api/images", middlewareSession.checkLoggedIn, Images.images);

router.get("/api/image/:filename",  middlewareSession.checkLoggedIn, Images.imageLoad);




module.exports = router;