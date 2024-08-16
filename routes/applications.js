const applicationRouter = require("express").Router();
const upload = require("../utills/upload");
const { applyNow } = require("../controllers/applications");

applicationRouter.post("/applyNow", upload.single("cv"), applyNow);

module.exports = applicationRouter;
