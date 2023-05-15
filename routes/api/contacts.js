const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../schemas/contact");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get(
  "/:contactId",
  isValidId,
  ctrlWrapper(ctrl.getContactById)
);

router.post(
  "/",
  validateBody(schemas.addSchema, "missing required name field"),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.updateSchema, "missing field"),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema, "missing field favorite"),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;