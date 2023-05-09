const express = require('express');
const router = express.Router();
const guard = require('../../../helpers/guard');

const userController = require('../../../controllers/users');

router.post('/registration', userController.reg);
router.post('/login', userController.login);
router.post('/logout', guard, userController.logout);

module.exports = router;