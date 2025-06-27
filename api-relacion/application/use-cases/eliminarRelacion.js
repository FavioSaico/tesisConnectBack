const Relacion = require('../../domain/entities/Relacion');

async function eliminarRelacion(id, relacionRepo) {
  
  // 1. Buscar en base de datos
  const data = await relacionRepo.obtenerRelacionPorId(id);
  if (!data) {
    throw new Error('Relación no encontrada');
  }

  // 2. Convertir a entidad
  const relacion = new Relacion(data.id, data.tesista_id, data.asesor_id);

  // 3. Eliminar usando el ID
  await relacionRepo.eliminarRelacion(relacion.id);

  // 4. Retornar algo útil desde la entidad
  return {
    mensaje: 'Relación eliminada correctamente',
    id: relacion.id,
    tesista_id: relacion.tesista_id,
    asesor_id: relacion.asesor_id
  };
}

module.exports = eliminarRelacion;
