import { Regla } from './Regla';
import { Resultado } from './Resultado';

export class Longitud implements Regla {
  private min: number;
  private max: number;

  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
  }

  cumple(usuario: string, contrasenia: string): Resultado {
    const tamanio = contrasenia.length;

    if (tamanio < this.min || tamanio > this.max) {
      return new Resultado(false, 'La contraseña debe tener entre 8 y 64 caracteres. ');
    } else {
      return new Resultado(true, '');
    }
  }
}
