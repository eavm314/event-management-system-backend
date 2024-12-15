import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('docente')
export class ProfessorEntity {
  @PrimaryColumn({ name: "Cod_docente" })
  professorCode: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: "Id_usuario" })
  user: UserEntity;

  @Column({ name: "Presentacion_doc", type: "text", nullable: true })
  presentation: string;

  @Column({ name: "Link_biografia_doc", nullable: true })
  linkBio: string;

  @Column({ name: "Doc_activo", default: false })
  activeProfessor: boolean;
}