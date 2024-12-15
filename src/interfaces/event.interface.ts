import { EventDto } from 'src/dtos/response/event.dto';
import { CreateEventDto } from 'src/dtos/request/createEvent.dto';

export interface EventInterface {
  findByCode(codEvent: string): Promise<EventDto>;
  findAll(): Promise<EventDto[]>;
  createEvent(event: CreateEventDto): Promise<EventDto>;
  deleteEvent(codEvent: string): Promise<void>;
}
