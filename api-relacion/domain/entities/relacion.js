class Relacion {
  constructor(id, tesista_id, asesor_id, fecha_creacion = null, activa = true) {
    this.id = id;
    this.tesista_id = tesista_id;
    this.asesor_id = asesor_id;
    this.fecha_creacion = fecha_creacion;
    this.activa = activa;
  }

  setNombres(tesistaNombre, asesorNombre) {
    this.tesista_nombre = tesistaNombre;
    this.asesor_nombre = asesorNombre;
  }

  esValida() {
    return this.tesista_id !== this.asesor_id;
  }
}

module.exports = Relacion;
