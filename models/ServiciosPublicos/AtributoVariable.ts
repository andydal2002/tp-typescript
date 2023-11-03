import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class AtributoVariable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre_atributo: string;

  @Column()
  valor_atributo: string;

  constructor(nombre_atributo: string, valor_atributo: string) {
    this.nombre_atributo = nombre_atributo;
    this.valor_atributo = valor_atributo;
  }
}

export default AtributoVariable;
