const express = require('express');
const router = express.Router();
const relacionesController = require('../controllers/relacionesController');

router.post('/', relacionesController.crearRelacion);

module.exports = router;
