import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    ManyToOne,
    JoinColumn,
    OneToMany,
    BaseEntity,
  } from 'typeorm';
  import { EstadoServicio } from './EstadoServicio';
  import { Usuario } from './Usuario';
  import { Establecimiento } from './Establecimiento';
  import { AtributoVariable } from './AtributoVariable';
  import { RegistroDeCambio } from './RegistroDeCambio';
  
  @Entity()
  export class Servicio extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;
  
    @ManyToMany(() => AtributoVariable)
    atributosVariables: AtributoVariable[];
  
    @Column({
      type: 'enum',
      enum: EstadoServicio,
      default: EstadoServicio.DISPONIBLE,
    })
    estado: EstadoServicio;
  
    @OneToMany(() => RegistroDeCambio, (registro) => registro.servicio)
    registro: RegistroDeCambio[];
  
    @ManyToOne(() => Establecimiento)
    @JoinColumn({ name: 'establecimiento_id', referencedColumnName: 'id' })
    establecimiento: Establecimiento;
  
    constructor(nombre: string) {
      super();
      this.nombre = nombre;
      this.atributosVariables = [];
      this.registro = [];
    }
  
    setEstado(estado: EstadoServicio, usuario: Usuario) {
      this.estado = estado;
    }

  
    agregarAtributoVar(nombre: string, valor: string) {
      const nuevoAtributo = new AtributoVariable(nombre, valor);
      this.atributosVariables.push(nuevoAtributo);
    }
  
    eliminarAtributoVar(nombre: string) {
      this.atributosVariables = this.atributosVariables.filter(
        (atributo) => atributo.nombre_atributo !== nombre
      );
    }
  }
  