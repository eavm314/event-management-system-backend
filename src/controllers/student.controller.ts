import { BadRequestException, Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { InfoMessage } from 'src/dtos/response/_messages';
import { CourseDto } from 'src/dtos/response/course.dto';
import { EnrollDto } from 'src/dtos/response/enroll.dto';
import { EventDto } from 'src/dtos/response/event.dto';
import { Role } from 'src/enums/role.enum';
import { StudentService } from 'src/services/student.service';

@Roles(Role.STUDENT)
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post('events')
  async enrollEvents(@Req() req, @Body() eventCodes: string[]): Promise<InfoMessage<EnrollDto[]>> {
    const { userCode } = req.user;
    if (!eventCodes){
      throw new BadRequestException("No course codes were provided");
    }
    const results = await this.studentService.enrollEvents(userCode, eventCodes);
    return { 
      message: "Student enrolled Successfully",
      data: results,
    }
  };

  @Get('events')
  async getStudentEvents(@Req() req): Promise<InfoMessage<EventDto[]>> {
    const { userCode } = req.user;
    const events = await this.studentService.getStudentEvents(userCode);
    return {
      message: "Student's Events Retrieved Successfully",
      data: events,
    }
  };

  @Post('courses')
  async enrollCourses(@Req() req, @Body() courseCodes: string[]): Promise<InfoMessage<EnrollDto[]>> {
    const { userCode } = req.user;
    if (!courseCodes){
      throw new BadRequestException("No course codes were provided");
    }
    const results = await this.studentService.enrollCourses(userCode, courseCodes);
    return { 
      message: "Student enrolled Successfully",
      data: results,
    }
  };

  @Get('courses')
  async getStudentCourses(@Req() req): Promise<InfoMessage<CourseDto[]>> {
    const { userCode } = req.user;
    const courses = await this.studentService.getEnrolledCourses(userCode);
    return {
      message: "Student's Courses Retrieved Successfully",
      data: courses,
    }
  };

  @Get("courses/available")
  async getAvailableCourses(@Req() req): Promise<InfoMessage<CourseDto[]>> {
    const { userCode } = req.user;
    const courses = await this.studentService.getAvailablesCourses(userCode);
    return {
      message: "Courses retrieved successfully",
      data: courses
    }
  }
}
