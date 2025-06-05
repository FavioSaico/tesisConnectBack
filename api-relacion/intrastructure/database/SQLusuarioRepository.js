const db = require('./db');

class usuarioRepository {
  async obtenerUsuariosPorIds(ids) {
    const placeholders = ids.map(() => '?').join(',');
    const [rows] = await db.query(
      `SELECT id, rol FROM usuarios WHERE id IN (${placeholders})`,
      ids
    );
    return rows;
  }
}

module.exports = usuarioRepository;
