import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from 'src/controllers/student.controller';
import { CareerEntity } from 'src/entities/career.entity';
import { CourseEntity } from 'src/entities/course.entity';
import { EventEntity } from 'src/entities/event.entity';
import { ParticipationEntity } from 'src/entities/participation.entity';
import { RoleEntity } from 'src/entities/role.entity';
import { StudentEntity } from 'src/entities/student.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CourseService } from 'src/services/course.service';
import { StudentService } from 'src/services/student.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentEntity, 
      EventEntity,
      CourseEntity,
      ParticipationEntity,
      RoleEntity,
      CareerEntity,
    ])
  ],
  controllers: [
    StudentController],
  providers: [
    StudentService,
    CourseService,
  ],
})
export class StudentModule { }