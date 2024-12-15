import { Module } from "@nestjs/common";
import { EventController } from "../controllers/event.controller";
import { EventService } from "../services/event.service";
import { EventEntity } from "../entities/event.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoordinatorEntity } from "../entities/coordinator.entity";
import { AreaEntity } from "../entities/area.entity";
import { CourseEntity } from "src/entities/course.entity";
import { ProfessorEntity } from "src/entities/professor.entity";
import { CourseController } from "src/controllers/course.controller";
import { CourseService } from "src/services/course.service";
import { StudentService } from "src/services/student.service";
import { StudentModule } from "./student.module";
import { StudentEntity } from "src/entities/student.entity";
import { ParticipationEntity } from "src/entities/participation.entity";

@Module({
  imports: [TypeOrmModule.forFeature([
    EventEntity,
    CoordinatorEntity,
    AreaEntity,
    CourseEntity,
    ProfessorEntity,
    StudentEntity,
    ParticipationEntity,
  ])
],
  controllers: [
    EventController,
    CourseController,
  ],
  providers: [
    EventService,
    CourseService,
    StudentService,
  ],
})
export class EventModule { }
