import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";
import { UserController } from "src/controllers/user.controller";
import { UserService } from "src/services/user.service";
import { RoleEntity } from "src/entities/role.entity";
import { RoleService } from "src/services/role.service";
import { RoleController } from "src/controllers/role.controller";
import { StudentEntity } from "src/entities/student.entity";
import { ProfessorEntity } from "src/entities/professor.entity";
import { CoordinatorEntity } from "src/entities/coordinator.entity";

@Module({
  imports: [TypeOrmModule.forFeature([
    UserEntity, 
    RoleEntity,
    StudentEntity,
    ProfessorEntity,
    CoordinatorEntity,
  ])],
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService],
  exports: [UserService],
})
export class UserModule { }
