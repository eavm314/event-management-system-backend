import { CreateUserDto } from "src/dtos/request/createUser.dto";
import { UserDto } from "src/dtos/response/user.dto";

export interface IUserService {
  findAll(): Promise<UserDto[]>;
  findByCode(userCode: string): Promise<UserDto>;
  createUser(userData: CreateUserDto): Promise<UserDto>;
  updateUser(userId: string, userData: Partial<CreateUserDto>): Promise<UserDto>;
  deleteUser(userCode: string): Promise<void>;
}