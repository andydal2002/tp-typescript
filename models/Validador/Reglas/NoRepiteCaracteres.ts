import { Regla } from './Regla';
import { Resultado } from './Resultado';

export class NoRepiteCaracteres implements Regla {
  cumple(usuario: string, contrasenia: string): Resultado {
    if (/(.)\1{2,}/.test(contrasenia)) {
      return new Resultado(false, 'La contraseña no debe tener 3 o más caracteres repetidos consecutivos. ');
    } else {
      return new Resultado(true, '');
    }
  }
}
