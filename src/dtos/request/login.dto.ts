import {
  IsDefined,
  IsString,
  Length
} from "class-validator";

export class LoginDto {
  @IsDefined()
  @IsString()
  @Length(5, 5)
  userCode: string;

  @IsDefined()
  @IsString()
  @Length(8, 100)
  password: string;
}