import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { Establecimiento } from "./Establecimiento"; // Asegúrate de importar la clase Establecimiento correcta
import { Servicio } from "./Servicio"; // Asegúrate de importar la clase Servicio correcta
import { Incidente } from "./Incidente"; // Asegúrate de importar la clase Incidente correcta

@Entity()
export class Prestacion {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Establecimiento, { eager: true })
  @JoinColumn({ name: "establecimiento_id" })
  establecimiento: Establecimiento;

  @OneToOne(() => Servicio, { eager: true })
  @JoinColumn({ name: "servicio_id" })
  servicio: Servicio;

  @ManyToMany(() => Incidente)
  @JoinTable({
    name: "prestacion_incidentes",
    joinColumn: { name: "prestacion_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "incidente_id", referencedColumnName: "id" },
  })
  incidentes: Incidente[];

  constructor(establecimiento: Establecimiento, servicio: Servicio) {
    this.establecimiento = establecimiento;
    this.servicio = servicio;
    this.incidentes = [];
  }

  agregarIncidente(incidente: Incidente) {
    this.incidentes.push(incidente);
  }

  eliminarIncidente(incidente: Incidente) {
    const index = this.incidentes.indexOf(incidente);
    if (index !== -1) {
      this.incidentes.splice(index, 1);
    }
  }
}

export default Prestacion;
