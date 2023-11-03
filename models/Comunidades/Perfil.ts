import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Comunidad } from "./Comunidad"; // Asegúrate de importar la clase Comunidad correcta
import { Usuario } from "./Usuario"; // Asegúrate de importar la clase Usuario correcta
import TipoPerfil from "./TipoPerfil"; // Importa el enum TipoPerfil adecuado
import TipoMiembro from "./TipoMiembro"; // Importa el enum TipoMiembro adecuado

@Entity()
export class Perfil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @ManyToOne(() => Comunidad, { eager: true })
  comunidad: Comunidad;

  @Column({ name: "tipo_perfil" })
  tipoPerfil: TipoPerfil; // Asegúrate de que TipoPerfil sea un tipo adecuado en TypeScript

  @Column({ name: "tipo_miembro" })
  tipoMiembro: TipoMiembro; // Asegúrate de que TipoMiembro sea un tipo adecuado en TypeScript

  @ManyToOne(() => Usuario, { eager: true })
  usuario: Usuario;

  constructor(nickname: string, comunidad: Comunidad, tipoPerfil: TipoPerfil) {
    this.nickname = nickname;
    this.comunidad = comunidad;
    this.tipoPerfil = tipoPerfil;
  }

  esAfectado(): boolean {
    return this.tipoMiembro === TipoMiembro.AFECTADO;
  }

  toString(): string {
    return JSON.stringify({
      id: this.id,
      nickname: this.nickname,
      usuario: this.usuario,
    });
  }
}

export default Perfil;
