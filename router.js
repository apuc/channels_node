const router = require('express').Router();
const path = require('path');

router.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '../vue_channels/dist/index.html'));
});

module.exports = router;