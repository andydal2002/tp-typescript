import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany } from "typeorm";
import { Localizacion } from "./Localizacion";
import { Establecimiento } from "./Establecimiento";
import { AtributoVariable } from "./AtributoVariable";
import { Usuario } from "./Usuario";
import { Prestacion } from "./Prestacion";

@Entity()
export class Entidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToOne(type => Localizacion, {
    cascade: true,
  })
  localizacion: Localizacion;

  @ManyToMany(type => Establecimiento, establecimiento => establecimiento.entidad, {
    cascade: true,
  })
  establecimientos: Establecimiento[];

  @ManyToMany(type => AtributoVariable, atributoVariable => atributoVariable.entidad, {
    cascade: true,
  })
  atributosVariables: AtributoVariable[];

  @ManyToMany(type => Usuario, usuario => usuario.entidadesInteres, {
    cascade: true,
  })
  usuariosAsignados: Usuario[];

  constructor(nombre: string) {
    this.nombre = nombre;
    this.establecimientos = [];
    this.atributosVariables = [];
    this.usuariosAsignados = [];
  }

  public servicios(): Servicio[] {
    return this.establecimientos
      .map(establecimiento => establecimiento.servicios)
      .reduce((acc, val) => acc.concat(val), []);
  }

  public agregarEstablecimientos(...establecimientos: Establecimiento[]): void {
    this.establecimientos.push(...establecimientos);
  }

  public eliminarEstablecimiento(establecimiento: Establecimiento): void {
    const index = this.establecimientos.indexOf(establecimiento);
    if (index !== -1) {
      this.establecimientos.splice(index, 1);
    }
  }

  public agregarAtributoVar(nombre: string, valor: string): void {
    const nuevoAtributo = new AtributoVariable(nombre, valor);
    this.atributosVariables.push(nuevoAtributo);
  }

  public eliminarAtributoVar(nombre: string): void {
    this.atributosVariables = this.atributosVariables.filter(atributoVariable => atributoVariable.nombre_atributo !== nombre);
  }

  public avisarAUsuarios(): void {
    // TODO: Implementar lógica de notificación
  }

  public getPromedioCierreRanking(fechaDeSemana: Date): number {
    // TODO: Implementar cálculo del promedio de cierre
    return 0;
  }

  public cantIncidentesEnLaSemana(listaDePrestacionesGlobal: Prestacion[], fechaDeSemana: Date): number {
    // TODO: Implementar cálculo de la cantidad de incidentes
    return 0;
  }

  public calcularImpactoProblematicas(fechaDeSemana: Date): number {
    // TODO: Implementar cálculo del impacto de las problemáticas
    return 0;
  }
}

export default Entidad;
