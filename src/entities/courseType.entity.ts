import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("tipo_curso")
export class CourseTypeEntity {
  @PrimaryColumn({ name: "Cod_tipo_curso" })
  code: string;

  @Column({ name: "Nombre_tipo" })
  name: string;
  
  @Column({ name: "Descripcion_tipo", type: "text", nullable: true })
  description: string;
}