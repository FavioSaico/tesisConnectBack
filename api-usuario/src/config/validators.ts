export class Validators {
  // retorna una expresión regular
  static get email() {
      return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  } 
}