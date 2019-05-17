const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.status(201).send('Test Route Hit');
});

module.exports = router;
