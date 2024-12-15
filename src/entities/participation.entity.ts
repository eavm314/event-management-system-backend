import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { EventEntity } from "./event.entity";
import { UserEntity } from "./user.entity";
import { StudentEntity } from "./student.entity";
import { CourseEntity } from "./course.entity";

@Entity('participa')
export class ParticipationEntity {
  @PrimaryGeneratedColumn("increment", { name: "Id_participacion" })
  id?: number

  @ManyToOne(() => StudentEntity, std => std.participations)
  @JoinColumn({ name: "Cod_estudiante", referencedColumnName: "studentCode" })
  student: StudentEntity;

  @ManyToOne(() => EventEntity)
  @JoinColumn({ name: "Cod_evento", referencedColumnName: "eventCode" })
  event?: EventEntity;

  @ManyToOne(() => CourseEntity)
  @JoinColumn({ name: "Cod_curso", referencedColumnName: "courseCode" })
  course?: CourseEntity;

  @Column({ name: "Fecha_inscripcion" })
  enrollDate: Date;

  @Column({ name: "Calificacion_est", nullable: true })
  score: number;
}