import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { RoleEntity } from "./role.entity";

@Entity('pagina')
export class PageEntity {
  @PrimaryGeneratedColumn("increment", { name: "Id_pagina" })
  pageId?: number;

  @Column({ name: "Nombre_pagina" })
  pageName: string;

  @Column({ name: "Ruta_pagina" })
  route: string;

  @Column({ name: "Requiere_autenticacion" })
  authRequired: boolean;

  @ManyToOne(() => RoleEntity, { eager: true })
  @JoinColumn({ name: "Requiere_rol" })
  roleRequired: RoleEntity;

  @Column({ name: "Orden_en_navbar", nullable: true })
  navbarOrder: number;

  @Column({ name: "Descripcion_pagina", type: "text", nullable: true })
  description: string;
}