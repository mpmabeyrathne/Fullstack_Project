const express = require('express');
const memoryController = require('../controller/memory.controller');

const router = express.Router();

router.post('/memory-add', memoryController.addMemory);
router.post('/p-memory', memoryController.createPersonalMemory);

module.exports = router;