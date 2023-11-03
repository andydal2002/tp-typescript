import { Regla } from './Regla';
import { Resultado } from './Resultado';

export class TieneCaracEspeciales implements Regla {
  private caracteresEspeciales: string[] = ['@', '$', '!', '%', '?', '&'];

  constructor() {}

  cumple(usuario: string, contrasenia: string): Resultado {
    const regex = new RegExp(`.*[${this.caracteresEspeciales.join('')}].*`);
    if (regex.test(contrasenia)) {
      return new Resultado(true, '');
    } else {
      return new Resultado(false, 'La contraseña debe tener al menos un carácter especial. ');
    }
  }

  agregarCaracter(caracter: string) {
    this.caracteresEspeciales.push(caracter);
  }

  eliminarCaracter(caracter: string) {
    const index = this.caracteresEspeciales.indexOf(caracter);
    if (index !== -1) {
      this.caracteresEspeciales.splice(index, 1);
    }
  }
}
