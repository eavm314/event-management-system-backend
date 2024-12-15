import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { EventDto } from 'src/dtos/response/event.dto';
import { Role } from 'src/enums/role.enum';
import { CreateEventDto } from '../dtos/request/createEvent.dto';
import { ErrorMessage, InfoMessage } from '../dtos/response/_messages';
import { EventService } from '../services/event.service';
import { Public } from 'src/decorators/public.decorator';
import { StudentService } from 'src/services/student.service';

@Controller('events')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly studentService: StudentService,
  ) { }

  @Public()
  @Get()
  async getAll(@Req() req): Promise<InfoMessage<EventDto[]>> {
    const events: EventDto[] = await this.eventService.getLastEvents();
    if (req.user?.userRole === Role.STUDENT) {
      const studentEvents = await this.studentService.getStudentEvents(req.user.userCode);
      events.forEach(ev => {
        if (studentEvents.map(e => e.codEvent).includes(ev.codEvent)) {
          ev.canEnroll = 2;
        }
      })
    } else {
      events.forEach(e => e.canEnroll = 0);
    }
    return {
      message: "Events gotten successfully!",
      data: events
    };
  };

  @Public()
  @Get("/:code")
  async getByCode(@Param("code") code): Promise<InfoMessage<EventDto>> {
    const event: EventDto = await this.eventService.findByCode(code);
    return {
      message: "Event gotten successfully!",
      data: event
    };
  };

  @Roles(Role.COORDINATOR)
  @Post()
  async postEvent(@Req() req, @Body() createEventDto: CreateEventDto): Promise<InfoMessage<EventDto>> {
    const { userCode } = req.user;
    createEventDto.coordCode = userCode;

    const newEvent: EventDto = await this.eventService.createEvent(createEventDto);
    return {
      message: "New event created successfully!",
      data: newEvent
    };
  };

  @Roles(Role.COORDINATOR)
  @Delete("/:id")
  async deleteEvent(@Param() params): Promise<ErrorMessage | InfoMessage<void>> {
    await this.eventService.deleteEvent(params.id);
    return {
      message: "Event deleted successfully",
    }
  };
}
