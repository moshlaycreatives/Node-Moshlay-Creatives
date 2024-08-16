const authRouter = require("express").Router();
const { adminLogin } = require("../controllers/auth");

authRouter.post("/adminLogin", adminLogin);

module.exports = authRouter;
