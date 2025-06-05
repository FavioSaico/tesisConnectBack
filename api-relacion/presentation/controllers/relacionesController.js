const crearRelacion = require('../../application/use-cases/crearRelacion');
const SQLrelacionRepository = require('../../intrastructure/database/SQLrelacionRepository');
const SQLusuarioRepository = require('../../intrastructure/database/SQLusuarioRepository');
const obtenerRelaciones = require('../../application/use-cases/obtenRelaciones');

const relacionRepo = new SQLrelacionRepository();
const usuarioRepo = new SQLusuarioRepository();

exports.crearRelacion = async (req, res) => {
  try {
    const nuevaRelacion = await crearRelacion(req.body, relacionRepo, usuarioRepo);
    res.status(201).json(nuevaRelacion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.obtenerRelaciones = async (req, res) => {
  try {
    const relaciones = await obtenerRelaciones(relacionRepo);
    res.json(relaciones);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener relaciones' });
  }
};
