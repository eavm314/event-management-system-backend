import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseDto } from "src/dtos/response/course.dto";
import { CourseEntity } from "src/entities/course.entity";
import { Repository } from "typeorm";


@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
  ) { }

  async findByCode(courseCode: string): Promise<CourseDto> {
    const entity: CourseEntity = await this.courseRepository.findOne({
      where: { courseCode },
      relations: ['area', 'coordinator'],
    });
    if (!entity) {
      throw new NotFoundException("The course does not exists!");
    }

    return new CourseDto(entity);
  };

  async findAll(): Promise<CourseDto[]> {
    const entities = await this.courseRepository.find({
      relations: ['area', 'coordinator'],
    });

    const coursesDto = entities.map((course) => new CourseDto(course));
    return coursesDto;
  };  
}
