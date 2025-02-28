const { Router } = require("express");
const router = Router();

const Images = require("../controllers/rest/images.api");

router.get("/api/images",Images.images);

router.get("/api/images-aggregate", Images.imagesAggregate);


module.exports = router;