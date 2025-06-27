const Relacion = require('../../domain/entities/Relacion');

async function obtenerRelaciones(relacionRepo) {
  const relacionesData = await relacionRepo.obtenerRelaciones();

  // Convertimos cada fila en una entidad Relacion
  const relaciones = relacionesData.map(r => {
    const relacion = new Relacion(r.id, r.tesista_id, r.asesor_id);
    relacion.setNombres(r.tesista, r.asesor);
    return relacion;
  });

  return relaciones;
}

module.exports = obtenerRelaciones;
