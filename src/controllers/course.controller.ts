import { Controller, Get, Param } from "@nestjs/common";
import { InfoMessage } from "src/dtos/response/_messages";
import { CourseDto } from "src/dtos/response/course.dto";
import { CourseService } from "src/services/course.service";

@Controller('courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
  ) { }

  @Get()
  async getAll(): Promise<InfoMessage<CourseDto[]>> {
    const courses = await this.courseService.findAll();
    return {
      message: "Courses retrieved successfully",
      data: courses
    }
  }

  @Get("/:code")
  async getByCode(@Param('code') code: string): Promise<InfoMessage<CourseDto>> {
    const course = await this.courseService.findByCode(code);
    return {
      message: "Course retrieved successfully",
      data: course
    }
  }
}