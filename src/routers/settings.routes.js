const { Router } = require("express");
const router = Router();

const middlewareSession = require("../middlewares/middleware.session");
const middlewaMulter = require("../middlewares/middlewareMulter")

const perfil = require("../controllers/api/perfil");


router.post(
  "/update-perfil/:id",
  middlewareSession.checkLoggedIn,
  middlewaMulter.single("avatar"),
  perfil.updatePrefile
);


module.exports = router;
