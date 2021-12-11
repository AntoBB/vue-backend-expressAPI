const express = require('express');

const router = express.Router();

// Get Posts
router.get('/', (req, res) => {
    res.send('hello World by ndo!!');
});

module.exports = router;