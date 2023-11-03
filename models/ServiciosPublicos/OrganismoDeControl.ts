import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Repository, getRepository } from "typeorm";
import { Entidad } from "./Entidad";
import { Servicio } from "./Servicio";

@Entity()
export class OrganismoDeControl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToMany(() => Entidad)
  @JoinTable()
  entidadesControladas: Entidad[];

  @ManyToMany(() => Servicio)
  @JoinTable()
  serviciosControlados: Servicio[];

  public async agregarEntidadControlada(entidad: Entidad): Promise<void> {
    this.entidadesControladas.push(entidad);
  }

  public async agregarServicioControlado(servicio: Servicio): Promise<void> {
    this.serviciosControlados.push(servicio);
  }
}
