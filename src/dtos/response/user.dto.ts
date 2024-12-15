import { ProfessorEntity } from "src/entities/professor.entity";
import { StudentEntity } from "src/entities/student.entity";
import { UserEntity } from "src/entities/user.entity";
import { RoleDto } from "./role.dto";

export class UserDto {
  userId: string;
  userCode: string;
  fullName: string;
  email: string;
  phoneNum: string;
  role: RoleDto;
  profilePhoto: string;

  career?: string;
  semester?: number;
  studentRole?: RoleDto;

  presentation?: string;
  linkBio?: string;
  activeProfessor?: boolean;

  constructor(user: UserEntity) {
    this.userId = user.userId;
    this.userCode = user.userCode;
    this.fullName = `${user.names.trim()} ${user.lastNames.trim()}`;
    this.email = user.email;
    this.phoneNum = user.phoneNum;
    this.role = new RoleDto(user.role);
    this.profilePhoto = user.profilePhoto;
  }

  public static fromStudent(student: StudentEntity): UserDto {
    const userDto = new UserDto(student.user);
    userDto.career = student.career ? student.career.name : null;
    userDto.semester = student.semester ?? null;
    userDto.studentRole = student.studentRole ? new RoleDto(student.studentRole) : null;
    return userDto;
  }
  
  public static fromProfessor(professor: ProfessorEntity): UserDto {
    const userDto = new UserDto(professor.user);
    userDto.presentation = professor.presentation;
    userDto.linkBio = professor.linkBio;
    userDto.activeProfessor = professor.activeProfessor;
    return userDto;
  }
}