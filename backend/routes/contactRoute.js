const express = require('express');
const { insertReview } = require('../controllers/Query/queryController');

const router = express.Router();

router.post('/insert-review',insertReview);

module.exports = router;