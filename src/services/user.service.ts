import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { auth } from 'src/config/config';
import { CreateUserDto } from 'src/dtos/request/createUser.dto';
import { UserDto } from 'src/dtos/response/user.dto';
import { RoleEntity } from 'src/entities/role.entity';
import { UserEntity } from 'src/entities/user.entity';
import { StudentEntity } from 'src/entities/student.entity';
import { ProfessorEntity } from 'src/entities/professor.entity';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
    @InjectRepository(ProfessorEntity)
    private professorRepository: Repository<ProfessorEntity>,
  ) { }

  async findById(userId: string): Promise<UserDto> {
    const userEntity = await this.userRepository.findOneBy({ userId });
    if (!userEntity) {
      throw new NotFoundException("User Code Not Found");
    }

    return new UserDto(userEntity);
  };

  async findByCode(userCode: string): Promise<UserDto> {
    const userEntity = await this.userRepository.findOneBy({ userCode });
    if (!userEntity) {
      throw new NotFoundException("User Code Not Found");
    }

    switch (userEntity.role?.roleCode) {
      case Role.STUDENT:
        const createdStudent = await this.studentRepository.findOne({
          where: { studentCode: userCode },
          relations: ['user'],
        });
        return UserDto.fromStudent(createdStudent);

      case Role.PROFESSOR:
        const createdProfessor = await this.professorRepository.findOne({
          where: { professorCode: userCode },
          relations: ['user'],
        });
        return UserDto.fromProfessor(createdProfessor);

      default:
        return new UserDto(userEntity);
    }
  };

  async findAll(): Promise<UserDto[]> {
    const userEntities = await this.userRepository.find({
      relations: ["role"],
    });
    return userEntities.map(userEntity => new UserDto(userEntity));
  };

  async createUser(userData: CreateUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ userCode: userData.userCode });
    const userEmail = await this.userRepository.findOneBy({ email: userData.email });
    if (user || userEmail) {
      throw new ConflictException("User already exists");
    }

    const roleEntity = await this.roleRepository.findOneBy({ roleCode: userData.roleCode });
    if (!roleEntity) {
      throw new NotFoundException("Role Code Not Found");
    }
    const salt = bcrypt.genSaltSync(auth.saltRounds);

    const passwordHash = bcrypt.hashSync(userData.password, salt);

    const newUser: UserEntity = {
      names: userData.names,
      lastNames: userData.lastNames,
      userCode: userData.userCode,
      password: passwordHash,
      email: userData.email,
      phoneNum: userData.phoneNum,
      role: roleEntity,
      profilePhoto: null,
    }
    const createdUser = await this.userRepository.save(newUser);

    switch (createdUser.role?.roleCode) {
      case Role.STUDENT:
        const createdStudent = await this.studentRepository
          .save({ studentCode: createdUser.userCode, user: createdUser });
        return UserDto.fromStudent(createdStudent);

      case Role.PROFESSOR:
        const createdProfessor = await this.professorRepository
          .save({ professorCode: createdUser.userCode, user: createdUser });
        return UserDto.fromProfessor(createdProfessor);

      default:
        return new UserDto(createdUser);
    }
  };

  async updateUser(userCode: string, userData: Partial<CreateUserDto>): Promise<UserDto> {
    const userEntity = await this.userRepository.findOneBy({ userCode });

    if (!userEntity) {
      throw new NotFoundException("User Code Not Found");
    }

    let roleEntity: RoleEntity;
    if (userData.roleCode && userData.roleCode !== userEntity.role.roleCode) {
      roleEntity = await this.roleRepository.findOneBy({ roleCode: userData.roleCode });
      if (!roleEntity) {
        throw new NotFoundException("Role Code Not Found");
      }
    }

    let passwordHash: string;
    if (userData.password) {
      const salt = bcrypt.genSaltSync(auth.saltRounds);
      passwordHash = bcrypt.hashSync(userData.password, salt);
    }

    const userUpdateData: Partial<UserEntity> = {
      names: userData.names,
      lastNames: userData.lastNames,
      password: passwordHash,
      email: userData.email,
      phoneNum: userData.phoneNum,
      profilePhoto: userData.profilePhoto,
      role: roleEntity,
    }

    const updatedUser = await this.userRepository.merge(userEntity, userUpdateData);
    const createdUser = await this.userRepository.save(updatedUser);
    return new UserDto(createdUser);
  };

  async deleteUser(userCode: string): Promise<void> {
    const user = await this.findByCode(userCode);
    if (!user) {
      throw new NotFoundException("User Code Not Found");
    }

    await this.userRepository.delete({ userCode: user.userCode });
  };
}
