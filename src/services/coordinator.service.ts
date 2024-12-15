import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CoordinatorDTO } from "../dtos/response/coordinator.dto";
import { CoordinatorEntity } from "../entities/coordinator.entity";
import { CoordinatorInterface } from "../interfaces/coordinator.interface";

export class CoordinatorService implements CoordinatorInterface {
  constructor(
    @InjectRepository(CoordinatorEntity)
    private coordinatorRepository: Repository<CoordinatorEntity>,

  ) { }

  async findById(codeCoord: string): Promise<CoordinatorDTO> {
    const entity = await this.coordinatorRepository.findOne({
      where: {codeCoordinator: codeCoord},
      relations: ['user']
    });

    if (!entity) {
      throw new NotFoundException("Coordinator not found!");
    }

    return new CoordinatorDTO(entity);
  }

  async findTeam(): Promise<CoordinatorDTO[]> {
    const entities: CoordinatorEntity[] = await this.coordinatorRepository.find({
      relations: ['user']
    });

    const listCoorDto = entities
      .filter(coord => coord.state)
      .sort((a,b) => a.orderTeam - b.orderTeam)
      .map(coord => new CoordinatorDTO(coord));
    return listCoorDto;
  }
}