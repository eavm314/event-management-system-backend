import {
  Controller,
  Get,
  Param,
} from "@nestjs/common";
import { InfoMessage } from "../dtos/response/_messages";
import { RoleService } from "src/services/role.service";
import { RoleDto } from "src/dtos/response/role.dto";

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Get()
  async getAllRoles(): Promise<InfoMessage<RoleDto[]>> {
    const roles = await this.roleService.findAll();
    return {
      message: "Roles Retrieved Successfully",
      data: roles,
    }
  };

  @Get("/:code")
  async getUserByCode(@Param("code") roleCode: string): Promise<InfoMessage<RoleDto>> {
    const role = await this.roleService.findByCode(roleCode);
    return {
      message: "Role Retrieved Successfully",
      data: role,
    }
  };
}
