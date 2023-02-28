const { Router } = require("express");
const router = Router();

const vista = require("../controllers/vistas");

//controllers for posts
const postController = require("../controllers/api/post");

//controllers for delete
const deleteController = require("../controllers/api/delete");

//controllers for put
const putController = require("../controllers/api/put");

//views for get

//views for imgs
router.get("/", vista.index);

router.get("/upload", vista.upload);

router.get("/resizes", vista.resizes);

//img manipulation routers
router.get("/image/:id", vista.imageById);

router.get("/image/:id/edit", vista.imageEdit);

router.get("/image/:id/rezise", vista.imageRezise);

//API REST
router.post("/upload", postController.uploadImage);

router.post("/image/rezise", postController.rezise);

router.delete("/image/:id/delete", deleteController.deleteImage);

router.put("/image/:id/edit", putController.editImage);

module.exports = router;
