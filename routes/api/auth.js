const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../schemas/users");

router.post(
  "/signup",
  validateBody(
    schemas.signupSchema,
    "Ошибка от Joi или другой библиотеки валидации"
  ),
  ctrlWrapper(ctrl.signup)
);

router.get(
  "/verify/:verificationToken",
  validateBody(schemas.emailSchema),
  ctrlWrapper(ctrl.verify)
);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
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

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;