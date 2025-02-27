const { Router } = require("express");
const router = Router();

const apiImagenes = require("../routers/images.api.routers");

const imagesRoutes = require("../routers/images.routes");
const loginRoutes = require("../routers/login.routes");
const tagsRoutes = require("../routers/tags.routes");
const viewsRoutes = require("../routers/views.routes");
const settingsRoutes = require("../routers/settings.routes");


router.use(imagesRoutes);
router.use(loginRoutes);
router.use(tagsRoutes);
router.use(viewsRoutes);
router.use(settingsRoutes);

router.use(apiImagenes);

module.exports = router;
