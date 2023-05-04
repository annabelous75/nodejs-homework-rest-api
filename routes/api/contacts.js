const express = require("express");
const controller = require("../../controllers/contact");
const validateData = require("../../middlewars/validateData");
const shema = require("../../schemas/contact");

const router = express.Router();

router.get("/", controller.getAll);

router.get("/:contactId", controller.getById);

router.post("/", validateData(shema), controller.add);

router.delete("/:contactId", controller.remove);

router.put("/:contactId", validateData(shema), controller.update);

module.exports = router;


