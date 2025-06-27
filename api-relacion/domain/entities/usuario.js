class Usuario {
  constructor(id, nombre, rol) {
    this.id = id;
    this.nombre = nombre;
    this.rol = rol;
  }

  esTesista() {
    return this.rol === 'tesista';
  }

  esAsesor() {
    return this.rol === 'asesor';
  }
}

module.exports = Usuario;
