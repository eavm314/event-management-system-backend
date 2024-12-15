import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("area")
export class AreaEntity {
  @PrimaryColumn({ name: "Cod_area" })
  codeArea: string;

  @Column({ name: "Nombre_area" })
  name: string;
  
  @Column({ name: "Descripcion_area", type: "text", nullable: true })
  description: string;
}