import { IsBoolean, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCoordinatorDTO {
  @Length(8, 8)
  @IsString()
  @IsNotEmpty()
  id?: string;

  @Length(5, 5)
  @IsString()
  @IsNotEmpty()
  code: string

  @IsString()
  @IsNotEmpty()
  names: string;

  @IsString()
  @IsNotEmpty()
  lastNames: string;

  @Length(8, 16)
  @IsString()
  @IsNotEmpty()
  password: string;

  @Length(8, 8)
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  state?: boolean;

  @IsString()
  @IsNotEmpty()
  photo: string;
}