const express = require('express');
const router = express.Router();
const electionController = require('../controllers/electionController');

router.get('/config/:type', electionController.getElectionConfig);

module.exports = router;
