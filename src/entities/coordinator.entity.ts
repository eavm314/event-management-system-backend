import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("coordinador")
export class CoordinatorEntity {
  @PrimaryColumn({ name: "Cod_coordinador" })
  codeCoordinator: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: "Id_usuario" })
  user: UserEntity;

  @Column({ name: "Posicion_coord" })
  position: string;

  @Column({ name: "Descripcion_coord", nullable: true })
  description: string;

  @Column({ name: "Estado_coord" })
  state: boolean;

  @Column({ name: "Nombre_equipo", nullable: true })
  nameTeam: string;
  
  @Column({ name: "Orden_equipo", nullable: true })
  orderTeam: number;
}
