const express = require('express');
const { aboutInfo } = require('../controllers/aboutController');

const router = express.Router();

router.get('/about', aboutInfo);

module.exports = router;
