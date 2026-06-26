const express = require('express');
const { chatAi } = require('../controllers/ai.controller');

const router = express.Router();

router.post('/chat', chatAi);

module.exports = router;