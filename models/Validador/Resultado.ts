export class Resultado {
    private valor: boolean;
    private mensajeError: string;
  
    constructor(valor: boolean, mensajeError: string) {
      this.valor = valor;
      this.mensajeError = mensajeError;
    }
  
    public isValor(): boolean {
      return this.valor;
    }
  
    public setValor(valor: boolean): void {
      this.valor = valor;
    }
  
    public getMensajeError(): string {
      return this.mensajeError;
    }
  
    public setMensajeError(mensajeError: string): void {
      this.mensajeError = mensajeError;
    }
  }
  