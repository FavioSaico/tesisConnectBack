async function obtenerRelaciones(relacionRepo) {
  return await relacionRepo.obtenerRelaciones();
}

module.exports = obtenerRelaciones;
