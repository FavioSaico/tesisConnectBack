const db = require('../db');

class UsuarioRepository {
  async obtenerUsuariosPorIds(ids) {
    const placeholders = ids.map(() => '?').join(',');
    const [rows] = await db.query(
      `SELECT id, nombre, rol FROM usuarios WHERE id IN (${placeholders})`,
      ids
    );
    return rows;
  }
}

module.exports = UsuarioRepository;
