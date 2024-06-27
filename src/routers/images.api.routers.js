const { Router } = require("express");
const router = Router();

const Images = require("../controllers/rest/images.api");

router.get("/api/images",Images.images);

module.exports = router;