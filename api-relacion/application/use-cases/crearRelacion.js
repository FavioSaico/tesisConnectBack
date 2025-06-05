// Caso de uso: crear una relación entre tesista y asesor
async function crearRelacion({ tesista_id, asesor_id }, relacionRepo, usuarioRepo) {
  // Validar que los usuarios existen
  const usuarios = await usuarioRepo.obtenerUsuariosPorIds([tesista_id, asesor_id]);

  if (usuarios.length !== 2) {
    throw new Error('Usuarios no encontrados');
  }

  const tesista = usuarios.find(u => u.id === tesista_id);
  const asesor = usuarios.find(u => u.id === asesor_id);

  if (tesista.rol !== 'tesista' || asesor.rol !== 'asesor') {
    throw new Error('Roles incorrectos para la relación');
  }

  // Verificar si ya existe
  const existe = await relacionRepo.existeRelacion(tesista_id, asesor_id);
  if (existe) {
    throw new Error('La relación ya existe');
  }

  // Crear relación
  const nuevaRelacion = await relacionRepo.crearRelacion(tesista_id, asesor_id);

  return nuevaRelacion;
}

module.exports = crearRelacion;
