import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Usuario } from "./Usuario"; // Asegúrate de importar la clase Usuario correcta

@Entity()
export class Observacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, { eager: true })
  usuario: Usuario;

  @Column()
  observado: string;

  constructor(usuario: Usuario, observado: string) {
    this.usuario = usuario;
    this.observado = observado;
  }
}

export default Observacion;
