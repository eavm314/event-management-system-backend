import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length
} from "class-validator";

export class CreateEventDto {
  @Length(1, 255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Length(1, 255)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Length(10, 10)
  @IsString()
  @IsNotEmpty()
  initDate: string;

  @Length(10, 10)
  @IsString()
  @IsOptional()
  endDate: string;

  coordCode: string;

  @IsString()
  @IsNotEmpty()
  area: string;

  @IsBoolean()
  @IsNotEmpty()
  needsEnroll: boolean;
}
