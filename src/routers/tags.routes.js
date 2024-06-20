const { Router } = require("express");
const router = Router();

const middlewareSession = require("../middlewares/middleware.session");

//controllers for Tags
const Tags = require("../controllers/api/tags");

//Tags
router.get("/tags",middlewareSession.checkLoggedIn ,Tags.tags);
router.post("/tag",middlewareSession.checkLoggedIn ,Tags.tagSave);

module.exports = router;