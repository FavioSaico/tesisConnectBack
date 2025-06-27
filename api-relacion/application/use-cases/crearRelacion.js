const Usuario = require('../../domain/entities/Usuario');
const Relacion = require('../../domain/entities/Relacion');

async function crearRelacion({ tesista_id, asesor_id }, relacionRepo, usuarioRepo) {
  // 1. Obtener los usuarios por ID
  const usuariosData = await usuarioRepo.obtenerUsuariosPorIds([tesista_id, asesor_id]);

  if (usuariosData.length !== 2) {
    throw new Error('Usuarios no encontrados');
  }

  // 2. Convertir los datos planos en entidades Usuario
  const usuarios = usuariosData.map(u => new Usuario(u.id, u.nombre, u.rol));
  const tesista = usuarios.find(u => u.id === tesista_id);
  const asesor = usuarios.find(u => u.id === asesor_id);

  // 3. Validar roles usando métodos de la entidad Usuario
  if (!tesista.esTesista() || !asesor.esAsesor()) {
    throw new Error('Roles incorrectos para la relación');
  }

  // 4. Verificar si la relación ya existe
  const existe = await relacionRepo.existeRelacion(tesista_id, asesor_id);
  if (existe) {
    throw new Error('La relación ya existe');
  }

  // 5. Crear la relación en la base de datos
  const nuevaRelacionData = await relacionRepo.crearRelacion(tesista_id, asesor_id);

  // 6. Retornar una entidad Relacion (opcional, si prefieres devolver una clase y no solo un JSON)
  return new Relacion(nuevaRelacionData.id, tesista_id, asesor_id);
}

module.exports = crearRelacion;
