const { Router } = require("express");
const router = Router();

const middlewareSession = require("../middlewares/middleware.session");


const Images = require("../controllers/rest/images.api");

router.get("/api/images",Images.images);

router.get("/api/image/:filename",  middlewareSession.checkLoggedIn, Images.imageLoad);


router.get("/api/images-aggregate", Images.imagesAggregate);

router.get("/api/image-duplicate/:id", Images.imageDuplciate);



module.exports = router;