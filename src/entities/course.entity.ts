import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ParticipationEntity } from "./participation.entity";
import { AreaEntity } from "./area.entity";
import { CoordinatorEntity } from "./coordinator.entity";
import { CourseTypeEntity } from "./courseType.entity";
import { ProfessorEntity } from "./professor.entity";

@Entity('curso')
export class CourseEntity {
  @PrimaryGeneratedColumn("increment", { name: "Id_curso" })
  id?: number;

  @Column({ name: "Cod_curso", unique: true, default: "tempCourse" })
  courseCode?: string;

  @Column({ name: "Nombre_curso" })
  courseName: string;

  @ManyToOne(() => AreaEntity, { eager: true })
  @JoinColumn({ name: "Cod_area" })
  area: AreaEntity;

  @ManyToOne(() => CoordinatorEntity)
  @JoinColumn({ name: "Cod_coord" })
  coordinator: CoordinatorEntity;

  @Column({ name: "Descr_curso", type: "text" })
  description: string;

  @ManyToOne(() => CourseTypeEntity, { eager: true })
  @JoinColumn({ name: "Tipo_curso" })
  type: CourseTypeEntity;

  @ManyToOne(() => ProfessorEntity)
  @JoinColumn({ name: "Cod_doc_lider" })
  professor: ProfessorEntity;

  @Column({ name: "Fecha_inicio" })
  startDate: Date;

  @Column({ name: "Fecha_fin", nullable: true })
  endDate: Date;

  @OneToMany(() => ParticipationEntity,
    part => part.event)
  participations: ParticipationEntity[];
}