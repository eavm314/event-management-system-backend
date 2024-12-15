import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AreaEntity } from "./area.entity";
import { CoordinatorEntity } from "./coordinator.entity";
import { ParticipationEntity } from "./participation.entity";

@Entity('evento')
export class EventEntity {
  @PrimaryGeneratedColumn("increment", { name: "Id_Evento" })
  id?: number;

  @Column({ name: "Cod_evento", unique: true, default: "tempEvent" })
  eventCode?: string;

  @Column({ name: "Nombre_evento" })
  eventName: string;

  @ManyToOne(() => AreaEntity, { eager: true })
  @JoinColumn({ name: "Cod_area" })
  area: AreaEntity;

  @ManyToOne(() => CoordinatorEntity)
  @JoinColumn({ name: "Cod_coord" })
  coordinator: CoordinatorEntity;

  @Column({ name: "Descr_evento", type: "text" })
  description: string;

  @Column({ name: "Fecha_inicio" })
  startDate: Date;

  @Column({ name: "Fecha_fin", nullable: true })
  endDate: Date;

  @Column({ name: "Debe_inscribirse" })
  needsEnroll: boolean;

  @OneToMany(() => ParticipationEntity,
    part => part.event)
  participations: ParticipationEntity[];

  @Column({ name: "Fecha_creacion" })
  createdAt: Date;

  @Column({ name: "Imagen_evento", nullable: true })
  photoUrl: string;
}