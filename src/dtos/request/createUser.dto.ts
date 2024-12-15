import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength
} from "class-validator";

export class CreateUserDto {
  @Length(1)
  @IsDefined()
  @IsString()
  names: string;

  @Length(1)
  @IsDefined()
  @IsString()
  lastNames: string;

  @IsDefined()
  @IsString()
  @MinLength(5)
  userCode: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  password: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsPhoneNumber()
  phoneNum: string;

  @IsDefined()
  @IsString()
  @Length(5, 6)
  roleCode: string;

  @IsOptional()
  @IsString()
  profilePhoto: string;
}