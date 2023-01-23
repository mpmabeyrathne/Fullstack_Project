const express = require('express');
const userController = require('../controller/user.controller');

const router = express.Router();

router.post('/user-save', userController.saveUser);
router.get('/user-get-all', userController.getAllUsers);
router.get('/user-login/:email/:password', userController.getLogin);

module.exports = router;