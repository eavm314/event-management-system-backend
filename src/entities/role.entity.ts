import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('rol')
export class RoleEntity {
  @PrimaryColumn({ name: "Cod_rol" })
  roleCode: string;

  @Column({ name: "Nombre_rol" })
  roleName: string;

  @Column({ name: "Descripcion_rol", type: "text", nullable: true })
  description: string;
}