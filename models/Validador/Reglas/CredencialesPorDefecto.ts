import { Regla } from './Regla';
import { Resultado } from './Resultado';

export class CredencialesPorDefecto implements Regla {
  cumple(usuario: string, contrasenia: string): Resultado {
    if (usuario === contrasenia) {
      return new Resultado(false, 'La contraseña debe ser diferente del usuario.');
    } else {
      return new Resultado(true, '');
    }
  }
}
