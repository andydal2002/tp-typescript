import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
  } from "typeorm";
  import { Perfil } from "./Perfil"; // Asegúrate de importar la clase Perfil correcta
  import { Servicio } from "./Servicio"; // Asegúrate de importar la clase Servicio correcta
  import { Establecimiento } from "./Establecimiento"; // Asegúrate de importar la clase Establecimiento correcta
  import { Incidente } from "./Incidente"; // Asegúrate de importar la clase Incidente correcta
  
  @Entity()
  export class Comunidad {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: "comunidad_nombre" })
    nombre: string;
  
    @ManyToOne(() => Perfil, { eager: true })
    miembros: Perfil[];
  
    @ManyToMany(() => Servicio)
    @JoinTable()
    serviciosDeComunidad: Servicio[];
  
    @ManyToMany(() => Establecimiento)
    @JoinTable()
    establecimientosDeComunidad: Establecimiento[];
  
    incidentes: Incidente[]; // No se necesita la anotación @Transient en TypeScript
  
    @Column({ name: "grado_de_confianza" })
    gradoDeConfianza: string; // Asegúrate de que GradoDeConfianza tenga un tipo adecuado en TypeScript
  
    @Column()
    activa: boolean;
  
    constructor(nombre: string) {
      this.nombre = nombre;
      this.miembros = [];
      this.serviciosDeComunidad = [];
      this.establecimientosDeComunidad = [];
      this.incidentes = [];
    }
  
    agregarMiembros(...perfiles: Perfil[]) {
      this.miembros.push(...perfiles);
    }
  
    eliminarMiembro(perfil: Perfil) {
      const index = this.miembros.indexOf(perfil);
      if (index !== -1) {
        this.miembros.splice(index, 1);
      }
    }
  
    agregarServicios(servicio: Servicio, ...servicios: Servicio[]) {
      this.serviciosDeComunidad.push(servicio, ...servicios);
    }
  
    eliminarServicio(servicio: Servicio) {
      const index = this.serviciosDeComunidad.indexOf(servicio);
      if (index !== -1) {
        this.serviciosDeComunidad.splice(index, 1);
      }
    }
  
    agregarIncidente(incidente: Incidente) {
      this.incidentes.push(incidente);
    }
  
    getIncidenteFromId(idIncidente: number) {
      return this.incidentes.find((incidente) => incidente.id === idIncidente);
    }
  
    getCantPerfilesAfectados() {
      return this.miembros.filter((perfil) => perfil.esAfectado).length;
    }
  
    toString() {
      return JSON.stringify({
        id: this.id,
        nombre: this.nombre,
        miembros: this.miembros,
        serviciosDeComunidad: this.serviciosDeComunidad,
        establecimientosDeComunidad: this.establecimientosDeComunidad,
        incidentes: this.incidentes,
        gradoDeConfianza: this.gradoDeConfianza,
        activa: this.activa,
      });
    }
  
    getIdUsuarios() {
      return this.miembros.map((perfil) => perfil.id);
    }
  
    getIdEstablecimientos() {
      return this.establecimientosDeComunidad.map((establecimiento) => establecimiento.id);
    }
  
    getIdServicios() {
      return this.serviciosDeComunidad.map((servicio) => servicio.id);
    }
  }
  