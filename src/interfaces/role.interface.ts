import { RoleDto } from "src/dtos/response/role.dto";

export interface IRoleService {
  findByCode(roleCode: string): Promise<RoleDto>;
  findAll(): Promise<RoleDto[]>;
}