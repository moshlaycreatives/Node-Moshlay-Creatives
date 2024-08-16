const contactRouter = require("express").Router();
const { createContact } = require("../controllers/contacts");

contactRouter.post("/createContact", createContact);

module.exports = contactRouter;
