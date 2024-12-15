import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post, Put,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { join } from "path";
import * as fs from 'fs';

import { files } from "src/config/config";
import { profilePath, saveProfileConfig } from "src/config/filesConfig";
import { Public } from "src/decorators/public.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { CreateUserDto } from "src/dtos/request/createUser.dto";
import { InfoMessage } from "src/dtos/response/_messages";
import { UserDto } from "src/dtos/response/user.dto";
import { Role } from "src/enums/role.enum";
import { UserService } from "src/services/user.service";

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Roles(Role.ADMIN)
  @Get("all")
  async getAllUsers(): Promise<InfoMessage<UserDto[]>> {
    const users = await this.userService.findAll();
    return {
      message: "Users Retrieved Successfully",
      data: users,
    }
  };

  @Get("me")
  async getUserByCode(@Req() req): Promise<InfoMessage<UserDto>> {
    const { userCode } = req.user;
    const user = await this.userService.findByCode(userCode);
    return {
      message: "User Retrieved Successfully",
      data: user,
    }
  };

  @Public()
  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<InfoMessage<UserDto>> {
    const user = await this.userService.createUser(userData);
    return {
      message: "User Created Successfully",
      data: user,
    }
  };

  @Put("me")
  async updateUser(@Req() req, @Body() userData: Partial<CreateUserDto>): Promise<InfoMessage<UserDto>> {
    const { userCode } = req.user;
    const user = await this.userService.updateUser(userCode, userData);
    return {
      message: "User Updated Successfully",
      data: user,
    }
  };

  @Delete("me")
  async deleteUser(@Req() req): Promise<InfoMessage<void>> {
    const { userCode } = req.user;
    await this.userService.deleteUser(userCode);
    return {
      message: "User Deleted Successfully",
    }
  };

  @Post("upload")
  @UseInterceptors(FileInterceptor('profilePhoto', saveProfileConfig))
  async uploadProfilePhoto(@Req() req, @UploadedFile() file: Express.Multer.File): Promise<InfoMessage<string>> {
    const { userCode } = req.user;
    const user = await this.userService.updateUser(userCode, { profilePhoto: file.filename });
    return {
      message: "Profile photo updated successfully",
      data: user.profilePhoto
    }
  }

  @Public()
  @Get("download/:fileName")
  async downloadProfilePhoto(@Param("fileName") fileName: string): Promise<InfoMessage<string>> {
    const imageBuffer = fs.readFileSync(join(files.storagePath, profilePath, fileName));
    const base64Image = imageBuffer.toString('base64');
    return {
      message: "Profile photo downloaded successfully",
      data: base64Image
    }
  }
}
