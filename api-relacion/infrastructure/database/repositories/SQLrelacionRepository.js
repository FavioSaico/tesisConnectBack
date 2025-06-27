const db = require('../db');

class RelacionRepository {
  async crearRelacion(tesista_id, asesor_id) {
    const [result] = await db.query(
      `INSERT INTO relaciones (tesista_id, asesor_id) VALUES (?, ?)`,
      [tesista_id, asesor_id]
    );

    const [rows] = await db.query(
      `SELECT id, tesista_id, asesor_id, fecha_creacion FROM relaciones WHERE id = ?`,
      [result.insertId]
    );

    return rows[0];
  }

  async existeRelacion(tesista_id, asesor_id) {
    const [rows] = await db.query(
      'SELECT id FROM relaciones WHERE tesista_id = ? AND asesor_id = ?',
      [tesista_id, asesor_id]
    );
    return rows.length > 0;
  }

  async obtenerRelaciones() {
    const [rows] = await db.query(
      `SELECT
        r.id,
        r.tesista_id,
        r.asesor_id,
        r.fecha_creacion,
        t.nombre AS tesista,
        a.nombre AS asesor
      FROM relaciones r
      JOIN usuarios t ON r.tesista_id = t.id
      JOIN usuarios a ON r.asesor_id = a.id
      WHERE r.activa = true`
    );
    return rows;
  }

  async obtenerRelacionPorId(id) {
    const [rows] = await db.query(
      'SELECT * FROM relaciones WHERE id = ?', [id]
    );
    return rows[0];
  }

  async eliminarRelacion(id) {
  const [result] = await db.query(
    'UPDATE relaciones SET activa = false WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
}
}

module.exports = RelacionRepository;
