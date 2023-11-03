import { Regla } from './Regla';
import { Resultado } from './Resultado';

export class TieneNumero implements Regla {
  constructor() {}

  cumple(usuario: string, contrasenia: string): Resultado {
    for (let i = 0; i < contrasenia.length; i++) {
      if (/\d/.test(contrasenia[i])) {
        return new Resultado(true, '');
      }
    }

    return new Resultado(false, 'La contraseña debe tener al menos un número. ');
  }
}
