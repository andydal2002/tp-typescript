import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
  } from "typeorm";
  import { Comunidad } from "./Comunidad"; // Asegúrate de importar la clase Comunidad correcta
  import { Observacion } from "./Observacion"; // Asegúrate de importar la clase Observacion correcta
  import { Usuario } from "./Usuario"; // Asegúrate de importar la clase Usuario correcta
  import { Prestacion } from "./Prestacion"; // Asegúrate de importar la clase Prestacion correcta
  import EstadoIncidente from "./EstadoIncidente"; // Importa el enum EstadoIncidente adecuado
  
  @Entity()
  export class Incidente {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Comunidad, { eager: true })
    @JoinColumn({ name: "comunidad_id" })
    comunidad: Comunidad;
  
    @OneToMany(() => Observacion, (observacion) => observacion.incidente, {
      cascade: ["persist", "merge"],
    })
    observaciones: Observacion[];
  
    @ManyToOne(() => Usuario, { eager: true })
    @JoinColumn({ name: "usuario_apertura" })
    usuarioApertura: Usuario;
  
    @ManyToOne(() => Usuario, { eager: true })
    @JoinColumn({ name: "usuario_cierre" })
    usuarioCierre: Usuario;
  
    @Column({ name: "horario_apertura", type: "timestamp" })
    horarioApertura: Date;
  
    @Column({ name: "horario_cierre", type: "timestamp" })
    horarioCierre: Date;
  
    @Column({ name: "estado_incidente" })
    estado: EstadoIncidente; // Asegúrate de que EstadoIncidente tenga un tipo adecuado en TypeScript
  
    @ManyToOne(() => Prestacion, { eager: true })
    @JoinColumn({ name: "prestacion_id" })
    prestacion: Prestacion;
  
    constructor(
      comunidad: Comunidad,
      usuarioApertura: Usuario,
      prestacion: Prestacion,
      observaciones: Observacion[]
    ) {
      this.comunidad = comunidad;
      this.usuarioApertura = usuarioApertura;
      this.prestacion = prestacion;
      this.observaciones = observaciones;
      this.horarioApertura = new Date();
      this.estado = EstadoIncidente.ABIERTO;
    }
  
    agregarObservacion(observacion: Observacion) {
      this.observaciones.push(observacion);
    }
  
    primeraObservacion(): string {
      return this.observaciones.length > 0 ? this.observaciones[0].observado : "";
    }
  
    minutosEntreAperturaYCierre(): number {
      if (!this.horarioCierre) {
        return 0;
      } else {
        const apertura = new Date(this.horarioApertura);
        const cierre = new Date(this.horarioCierre);
        return (cierre.getTime() - apertura.getTime()) / (1000 * 60);
      }
    }
  
    seReportoEnLaSemanaDeLaFecha(unaFecha: Date): boolean {
      const fechaApertura = new Date(this.horarioApertura);
      const inicioDeSemana = new Date(unaFecha);
      inicioDeSemana.setDate(
        unaFecha.getDate() - (unaFecha.getDay() - 1 + 7) % 7
      );
      inicioDeSemana.setHours(0, 0, 0, 0);
      const finDeSemana = new Date(unaFecha);
      finDeSemana.setDate(
        unaFecha.getDate() + (7 - (unaFecha.getDay() - 1 + 7) % 7)
      );
      finDeSemana.setHours(23, 59, 59, 999);
      return (
        fechaApertura >= inicioDeSemana && fechaApertura <= finDeSemana
      );
    }
  
    seCerroEnLaSemanaDeLaFecha(unaFecha: Date): boolean {
      if (!this.estaResuelto() || !this.horarioCierre) return false;
      const fechaCierre = new Date(this.horarioCierre);
      const inicioDeSemana = new Date(unaFecha);
      inicioDeSemana.setDate(
        unaFecha.getDate() - (unaFecha.getDay() - 1 + 7) % 7
      );
      inicioDeSemana.setHours(0, 0, 0, 0);
      const finDeSemana = new Date(unaFecha);
      finDeSemana.setDate(
        unaFecha.getDate() + (7 - (unaFecha.getDay() - 1 + 7) % 7)
      );
      finDeSemana.setHours(23, 59, 59, 999);
      return fechaCierre >= inicioDeSemana && fechaCierre <= finDeSemana;
    }
  
    seOriginoEnEntidad(entidad: Entidad): boolean {
      return this.prestacion.establecimiento.entidad === entidad;
    }
  
    getEstablecimientoNombre(): string {
      return this.prestacion.establecimiento.nombre;
    }
  
    getServicioNombre(): string {
      return this.prestacion.servicio.nombre;
    }
  
    getComunidadNombre(): string {
      return this.comunidad.nombre;
    }
  
    getEstablecimiento(): Establecimiento {
      return this.prestacion.establecimiento;
    }
  
    getServicio(): Servicio {
      return this.prestacion.servicio;
    }
  
    getMiembrosAfectados(): number {
      return this.comunidad.getCantPerfilesAfectados();
    }
  
    estaResuelto(): boolean {
      return this.estado === EstadoIncidente.RESUELTO;
    }
  
    toString(): string {
      return JSON.stringify({
        comunidad: this.comunidad,
        observaciones: this.observaciones,
        usuarioApertura: this.usuarioApertura,
        usuarioCierre: this.usuarioCierre,
        horarioApertura: this.horarioApertura,
        horarioCierre: this.horarioCierre,
        estado: this.estado,
        prestacion: this.prestacion,
      });
    }
  }
  
  export default Incidente;
  