import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { CareerEntity } from "./career.entity";
import { ParticipationEntity } from "./participation.entity";
import { RoleEntity } from "./role.entity";
import { UserEntity } from "./user.entity";

@Entity('estudiante')
export class StudentEntity {

  @PrimaryColumn({ name: "Cod_estudiante" })
  studentCode: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: "Id_usuario" })
  user: UserEntity;

  @ManyToOne(() => CareerEntity, { eager: true })
  @JoinColumn({ name: "Carrera_est" })
  career: CareerEntity;

  @Column({ name: "Semestre", nullable: true })
  semester: number;

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: "Rol_est" })
  studentRole: RoleEntity;

  @OneToMany(() => ParticipationEntity,
    part => part.student)
  participations: ParticipationEntity[];
}