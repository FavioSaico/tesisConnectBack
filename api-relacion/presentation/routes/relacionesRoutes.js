const express = require('express');
const router = express.Router();
const relacionesController = require('../controllers/relacionesController');

router.post('/', relacionesController.crearRelacion);
router.get('/', relacionesController.obtenerRelaciones);

module.exports = router;
