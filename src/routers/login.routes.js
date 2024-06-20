const { Router } = require("express");
const router = Router();

const middlewareSession = require("../middlewares/middleware.session");

//controller logini
const Login = require("../controllers/api/login");

//Login
router.post("/login",Login.login);
router.post("/register",Login.register);
router.get("/logout",middlewareSession.checkLoggedIn ,Login.logout);

module.exports = router;