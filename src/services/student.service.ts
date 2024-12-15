import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseDto } from 'src/dtos/response/course.dto';
import { EventDto } from 'src/dtos/response/event.dto';
import { EventEntity } from 'src/entities/event.entity';
import { ParticipationEntity } from 'src/entities/participation.entity';
import { StudentEntity } from 'src/entities/student.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { CourseService } from './course.service';
import { EnrollDto } from 'src/dtos/response/enroll.dto';
import { CourseEntity } from 'src/entities/course.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
    @InjectRepository(ParticipationEntity)
    private participationRepository: Repository<ParticipationEntity>,
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,

    private courseService: CourseService,
  ) { }

  async enrollEvents(studentCode: string, eventCodes: string[]): Promise<EnrollDto[]> {
    const student = await this.studentRepository.findOneBy({ studentCode });
    if (!student) {
      throw new NotFoundException("Student Not Found with this StudentCode");
    }

    let participations: ParticipationEntity[] = [];
    let results: EnrollDto[] = [];

    for (const eventCode of eventCodes) {
      const event = await this.eventRepository.findOneBy({ eventCode });
      if (!event) {
        throw new NotFoundException(`Event Not Found with code '${eventCode}'`);
      }

      const result = new EnrollDto();
      result.event = event.eventName;

      const participation = await this.participationRepository.findOneBy({ student, event });
      if (participation) {
        result.message = "Student is Already Enrolled in this Event";
        results.push(result);
        continue;
      }

      const newParticipation: ParticipationEntity = {
        student,
        event,
        enrollDate: new Date(),
        score: null,
      };

      result.message = "Student Enrolled Successfully";

      participations.push(newParticipation);
      results.push(result);
    }
    await this.participationRepository.save(participations);
    return results;
  }

  async enrollCourses(studentCode: string, courseCodes: string[]): Promise<EnrollDto[]> {
    const student = await this.studentRepository.findOneBy({ studentCode });
    if (!student) {
      throw new NotFoundException("Student Not Found with this StudentCode");
    }

    let participations: ParticipationEntity[] = [];
    let results: EnrollDto[] = [];

    for (const courseCode of courseCodes) {
      const course = await this.courseRepository.findOneBy({ courseCode });
      if (!course) {
        throw new NotFoundException(`Course Not Found with code '${courseCode}'`);
      }

      const result = new EnrollDto();
      result.course = course.courseName;

      const participation = await this.participationRepository.findOneBy({ student, course });
      if (participation) {
        result.message = "Student is Already Enrolled in this Course";
        results.push(result);
        continue;
      }

      const newParticipation: ParticipationEntity = {
        student,
        course,
        enrollDate: new Date(),
        score: null,
      };

      result.message = "Student Enrolled Successfully";

      participations.push(newParticipation);
      results.push(result);
    }
    await this.participationRepository.save(participations);
    return results;
  }


  async getStudentEvents(studentCode: string): Promise<EventDto[]> {
    const student = await this.studentRepository.findOneBy({ studentCode });
    if (!student) {
      throw new NotFoundException("Student Not Found with this StudentCode");
    }

    const participations = await this.participationRepository.find({
      where: { student, event: Not(IsNull()) },
      relations: ['event', 'event.coordinator'],
    });
    return participations.map(p => EventDto.fromParticipation(p));
  }

  async getEnrolledCourses(studentCode: string): Promise<CourseDto[]> {
    const student = await this.studentRepository.findOneBy({ studentCode });
    if (!student) {
      throw new NotFoundException("Student Not Found with this StudentCode");
    }

    const participations = await this.participationRepository.find({
      where: { student, course: Not(IsNull()) },
      relations: ['course'],
    });

    return participations.map(p => CourseDto.fromParticipation(p));
  }

  async getAvailablesCourses(studentCode: string): Promise<CourseDto[]> {
    const enrolledCourses = await this.getEnrolledCourses(studentCode);
    const codes = enrolledCourses.map(c => c.courseCode);

    const courses = await this.courseService.findAll();
    return courses.filter(c => !codes.includes(c.courseCode));
  }

}
