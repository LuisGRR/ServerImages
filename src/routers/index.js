const { Router } = require("express");
const router = Router();

const apiImagenes = require("../routers/images.api.routers");

const imagesRoutes = require("../routers/images.routes");
const loginRoutes = require("../routers/login.routes");
const tagsRoutes = require("../routers/tags.routes");
const viewsRoutes = require("../routers/views.routes");

router.use(imagesRoutes);
router.use(loginRoutes);
router.use(tagsRoutes);
router.use(viewsRoutes);

router.use(apiImagenes);

module.exports = router;
