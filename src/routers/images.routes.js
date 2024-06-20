const { Router } = require("express");
const router = Router();

const middlewareSession = require("../middlewares/middleware.session");

//Controllers for images
const Images = require("../controllers/api/images");


router.post("/upload", middlewareSession.checkLoggedIn, Images.uploadImage);
router.post("/image/rezise", middlewareSession.checkLoggedIn, Images.rezise);
router.post("/image/convert", middlewareSession.checkLoggedIn, Images.convert);
router.delete("/image/:id/delete", middlewareSession.checkLoggedIn, Images.deleteImage);
router.put("/image/:id/edit",middlewareSession.checkLoggedIn ,Images.updateImage);

module.exports = router;