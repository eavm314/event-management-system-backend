import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { RoleEntity } from "./role.entity";

@Entity('usuario')
export class UserEntity {
  @PrimaryGeneratedColumn("uuid", { name: "Id_usuario" })
  userId?: string

  @Column({ unique: true, name: "Cod_usuario" })
  userCode: string;

  @Column({ name: "Pwd_usuario" })
  password: string;

  @Column({ name: "Correo_usuario", nullable: true })
  email: string;

  @Column({ name: "Num_celular_usuario", nullable: true })
  phoneNum: string;

  @ManyToOne(() => RoleEntity, { eager: true })
  @JoinColumn({ name: "Rol_usuario" })
  role: RoleEntity;

  @Column({ name: "Foto_usuario", nullable: true })
  profilePhoto: string;

  @Column({ name: "Nombres_usuario", default: "Juan" })
  names?: string;

  @Column({ name: "Apellidos_usuario", default: "Perez" })
  lastNames?: string;
}