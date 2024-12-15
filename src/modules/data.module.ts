import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseTypeEntity } from 'src/entities/courseType.entity';
import { PageEntity } from 'src/entities/page.entity';
import { PagesService } from 'src/services/pages.service';
import { DataController } from '../controllers/data.controller';
import { AreaEntity } from '../entities/area.entity';
import { DataService } from '../services/area.service';
import { UserEntity } from 'src/entities/user.entity';
import { CoordinatorService } from 'src/services/coordinator.service';
import { CoordinatorEntity } from 'src/entities/coordinator.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AreaEntity,
      PageEntity,
      CourseTypeEntity,
      UserEntity,
      CoordinatorEntity
    ])
  ],
  controllers: [
    DataController],
  providers: [
    DataService,
    PagesService,
    CoordinatorService,
  ],
})
export class DataModule { }