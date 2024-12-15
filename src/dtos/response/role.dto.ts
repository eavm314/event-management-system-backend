import { RoleEntity } from "src/entities/role.entity";

export class RoleDto {
  code: string;
  name: string;
  description: string;

  constructor(entity: RoleEntity){
    this.code = entity.roleCode;
    this.name = entity.roleName;
    this.description = entity.description;
  }
}