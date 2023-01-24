const express = require('express');
const notifiController = require('../controller/notifications.controller');

const router = express.Router();

router.post('/notifi', notifiController.sendNotifi);


module.exports = router;