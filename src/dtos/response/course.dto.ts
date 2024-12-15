import { CourseEntity } from "src/entities/course.entity";
import { CoordinatorDTO } from "./coordinator.dto";
import { ParticipationEntity } from "src/entities/participation.entity";

export class CourseDto {
  courseCode: string;
  courseName: string;
  area: string;
  description: string;
  type: string;
  startDate: Date;
  endDate: Date;
  coordinator: CoordinatorDTO;

  enrollDate?: Date;
  score?: number;

  constructor(entity: CourseEntity) {
    this.courseCode = entity.courseCode;
    this.courseName = entity.courseName;
    this.area = entity.area.name;
    this.coordinator = entity.coordinator ? new CoordinatorDTO(entity.coordinator) : null;
    this.description = entity.description;
    this.type = entity.type?.code;
    this.startDate = entity.startDate;
    this.endDate = entity.endDate;
  }

  public static fromParticipation(participation: ParticipationEntity): CourseDto {
    const courseDto = new CourseDto(participation.course);
    courseDto.enrollDate = participation.enrollDate;
    courseDto.score = participation.score;
    return courseDto;
  }
}