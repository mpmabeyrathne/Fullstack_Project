const express = require('express');
const groupController = require('../controller/group.controller');

const router = express.Router();

router.post('/group-create', groupController.createGroup);


module.exports = router;