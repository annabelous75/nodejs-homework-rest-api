const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../schemas/user");

router.post(
  "/signup",
  validateBody(
    schemas.signupSchema,
    "Ошибка от Joi или другой библиотеки валидации"
  ),
  ctrlWrapper(ctrl.signup)
);

router.post(
  "/login",
  validateBody(
    schemas.loginSchema,
    "Ошибка от Joi или другой библиотеки  валидации"
  ),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/:contactId/subscription",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema, "missing field favorite"),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;