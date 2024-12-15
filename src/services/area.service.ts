import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseTypeEntity } from "src/entities/courseType.entity";
import { Repository } from "typeorm";
import { AreaDTO } from "../dtos/response/area.dto";
import { AreaEntity } from "../entities/area.entity";
import { CourseTypeDto } from "src/dtos/response/courseType.dto";

export class DataService {
  constructor(
    @InjectRepository(AreaEntity)
    private areaRepository: Repository<AreaEntity>,
    @InjectRepository(CourseTypeEntity)
    private typeRepository: Repository<CourseTypeEntity>,
  ) { }

  async findAreaByCode(codeArea: string): Promise<AreaDTO> {
    const entity = await this.areaRepository.findOneBy({ codeArea });
    if (!entity) {
      throw new NotFoundException("Area not found!");
    }

    return new AreaDTO(entity);
  }
  async findAllAreas(): Promise<AreaDTO[]> {
    const entities: AreaEntity[] = await this.areaRepository.find();
    return entities.map(area => new AreaDTO(area));
  }
  
  async findTypeByCode(code: string): Promise<CourseTypeDto> {
    const entity = await this.typeRepository.findOneBy({ code });
    if (!entity) {
      throw new NotFoundException("Area not found!");
    }

    return entity;
  }
  async findAllTypes(): Promise<CourseTypeDto[]> {
    const entities = await this.typeRepository.find();
    return entities;
  }

}