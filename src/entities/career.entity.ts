import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { CoordinatorEntity } from "./coordinator.entity";

@Entity("carrera")
export class CareerEntity {
  @PrimaryColumn({ name: "Cod_carrera" })
  code: string;

  @Column({ name: "Nombre_carrera" })
  name: string;
  
  @Column({ name: "Descripcion_carrera", type: "text", nullable: true })
  description: string;
}