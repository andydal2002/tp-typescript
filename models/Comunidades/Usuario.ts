import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    ManyToMany,
    JoinTable,
  } from "typeorm";
  import { Perfil } from "./Perfil"; // Asegúrate de importar la clase Perfil correcta
  import { Localizacion } from "./Localizacion"; // Asegúrate de importar la clase Localizacion correcta
  import { Entidad } from "./Entidad"; // Asegúrate de importar la clase Entidad correcta
  import { Servicio } from "./Servicio"; // Asegúrate de importar la clase Servicio correcta
  import { Incidente } from "./Incidente"; // Asegúrate de importar la clase Incidente correcta
  import { ConfiguracionNotificacion } from "./ConfiguracionNotificacion"; // Asegúrate de importar la clase ConfiguracionNotificacion correcta
  import { Notificador } from "./Notificador"; // Asegúrate de importar la clase Notificador correcta
  import { Horario } from "./Horario"; // Asegúrate de importar la clase Horario correcta
  
  @Entity()
  export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    email: string;
  
    @Column()
    usuario: string;
  
    @Column()
    contrasenia: string;
  
    @Column()
    telefono: number;
  
    @ManyToOne(() => Perfil, { eager: true })
    perfiles: Perfil[];
  
    @OneToOne(() => Localizacion, { cascade: true })
    localizacion: Localizacion;
  
    @ManyToMany(() => Entidad, { cascade: true })
    @JoinTable()
    entidadesInteres: Entidad[];
  
    @ManyToMany(() => Servicio, { cascade: true })
    @JoinTable()
    serviciosInteres: Servicio[];
  
    @Column({ name: "tipo_usuario" })
    tipoUsuario: string; // Asegúrate de que TipoUsuario tenga un tipo adecuado en TypeScript
  
    @Column()
    configuracionNotificacion: ConfiguracionNotificacion;
  
    @Column()
    notificador: Notificador;
  
    @ManyToMany(() => Horario, { cascade: true })
    horarios: Horario[];
  
    @ManyToMany(() => Incidente)
    @JoinTable({ name: "usuario_incidentes_nuevos" })
    incidentesNuevos: Incidente[];
  
    @ManyToMany(() => Incidente)
    @JoinTable({ name: "usuario_incidentes_concluidos" })
    incidentesConcluidos: Incidente[];
  
    constructor(email: string, usuario: string, contrasenia: string, localizacion: Localizacion) {
      this.email = email;
      this.usuario = usuario;
      this.contrasenia = contrasenia;
      this.perfiles = [];
      this.localizacion = localizacion;
      this.entidadesInteres = [];
      this.serviciosInteres = [];
    }
  
    tieneApuro(): boolean {
      return this.configuracionNotificacion.apuro();
    }
  
    notificarPorMail(): boolean {
      return this.notificador.porMail();
    }
  
    agregarIncidenteNuevo(incidente: Incidente) {
      this.incidentesNuevos.push(incidente);
    }
  
    removerIncidenteNuevo(incidente: Incidente) {
      const index = this.incidentesNuevos.indexOf(incidente);
      if (index !== -1) {
        this.incidentesNuevos.splice(index, 1);
      }
    }
  
    agregarIncidenteConcluido(incidente: Incidente) {
      this.incidentesConcluidos.push(incidente);
    }
  
    incidentesNotificados() {
      this.incidentesNuevos = [];
      this.incidentesConcluidos = [];
    }
  
    agregarHorario(horario: Horario) {
      this.horarios.push(horario);
    }
  
    eliminarHorario(horario: Horario) {
      const index = this.horarios.indexOf(horario);
      if (index !== -1) {
        this.horarios.splice(index, 1);
      }
    }
  
    agregarPerfil(perfil: Perfil) {
      this.perfiles.push(perfil);
    }
  
    agregarEntidadInteres(entidad: Entidad) {
      this.entidadesInteres.push(entidad);
    }
  
    eliminarEntidadInteres(entidad: Entidad) {
      const index = this.entidadesInteres.indexOf(entidad);
      if (index !== -1) {
        this.entidadesInteres.splice(index, 1);
      }
    }
  
    agregarServicioInteres(servicio: Servicio) {
      this.serviciosInteres.push(servicio);
    }
  
    eliminarServicioInteres(servicio: Servicio) {
      const index = this.serviciosInteres.indexOf(servicio);
      if (index !== -1) {
        this.serviciosInteres.splice(index, 1);
      }
    }
  
    recibirNotificacionDeAperturaDeIncidente(incidente: Incidente) {
      if (this.configuracionNotificacion !== null) {
        this.configuracionNotificacion.notificarIncidenteNuevo(incidente, this);
      }
    }
  
    recibirNotificacionDeCierreDeIncidente(incidente: Incidente) {
      if (this.configuracionNotificacion !== null) {
        this.configuracionNotificacion.notificarConclusionDeIncidente(incidente, this);
      }
    }
  
    recibirNotificacionDeIncidentesCercanos(incidentes: Incidente[]) {
      if (this.configuracionNotificacion !== null) {
        this.configuracionNotificacion.notificarIncidentesCercanos(incidentes, this);
      }
    }
  
    recibirInformeSemanal(msjInformeSemanal: string) {
      if (this.configuracionNotificacion !== null) {
        this.configuracionNotificacion.notificarInformeSemanal(msjInformeSemanal, this);
      }
    }
  
    toString() {
      return JSON.stringify({
        id: this.id,
        usuario: this.usuario,
      });
    }
  }
  