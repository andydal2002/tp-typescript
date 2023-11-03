import { Regla } from './reglas'; // Importa las reglas correspondientes
import { Resultado } from './resultado'; // Importa la clase Resultado

export class Validador {
  private reglas: Regla[];

  constructor() {
    this.reglas = [];
  }

  public logear(usuario: string, contrasenia: string): Resultado {
    let valor = true;
    let mensajeError = '';

    for (const regla of this.reglas) {
      const resultadoRegla = regla.cumple(usuario, contrasenia);
      valor = valor && resultadoRegla.valor;
      mensajeError += resultadoRegla.mensajeError;
    }

    return new Resultado(valor, mensajeError);
  }

  public agregarRegla(...reglas: Regla[]): void {
    this.reglas.push(...reglas);
  }

  public eliminarRegla(regla: Regla): void {
    const index = this.reglas.indexOf(regla);
    if (index !== -1) {
      this.reglas.splice(index, 1);
    }
  }

  public cargarConfig1(): void {
    this.agregarRegla(
      new EsFuerte(),
      new CredencialesPorDefecto(),
      new Longitud(8, 64),
      new TieneMayus(),
      new TieneMinus(),
      new TieneNumero(),
      new TieneCaracEspeciales(),
      new NoRepiteCaracteres()
    );
  }
}
