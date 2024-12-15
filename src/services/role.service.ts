import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleDto } from 'src/dtos/response/role.dto';
import { RoleEntity } from 'src/entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) { }

  async findByCode(roleCode: string): Promise<RoleDto> {
    const roleEntity = await this.roleRepository.findOneBy({ roleCode });
    if (!roleEntity) {
      throw new NotFoundException("Role Code Not Found");
    }

    return new RoleDto(roleEntity);
  };

  async findAll(): Promise<RoleDto[]> {
    const roleEntities = await this.roleRepository.find();
    return roleEntities.map(e => new RoleDto(e));
  };
}