export interface Regla {
    cumple(usuario: string, contrasenia: string): Resultado;
  }
  