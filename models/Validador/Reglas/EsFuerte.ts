import { Regla } from './Regla';
import { Resultado } from './Resultado';
import * as fs from 'fs';

export class EsFuerte implements Regla {
  private rutaArchivo: string = 'src/main/properties/top_10000_peores_contrasenias.txt';

  cumple(usuario: string, contrasenia: string): Resultado {
    try {
      // Abre el archivo de texto para leerlo
      const data = fs.readFileSync(this.rutaArchivo, 'utf-8');

      // Divide el contenido del archivo en líneas
      const lineas = data.split('\n');

      // Comprueba si la contraseña está en la lista de contraseñas débiles
      if (lineas.some((linea) => linea.includes(contrasenia))) {
        return new Resultado(false, 'La contraseña es débil.');
      }
    } catch (error) {
      console.error('Error al leer el archivo: ' + error.message);
    }

    return new Resultado(true, '');
  }

  constructor() {}
}
