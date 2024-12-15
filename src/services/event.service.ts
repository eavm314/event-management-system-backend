/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventEntity } from "../entities/event.entity";
import { Repository } from "typeorm";
import { EventInterface } from "../interfaces/event.interface";
import { EventDto } from "src/dtos/response/event.dto";
import { CreateEventDto } from "src/dtos/request/createEvent.dto";
import { AreaEntity } from "../entities/area.entity";
import { boliviaDateToJSDate } from "../utils/changeDate";
import { genCode } from "src/utils/prefixCode";
import { CoordinatorEntity } from "../entities/coordinator.entity";


@Injectable()
export class EventService implements EventInterface {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
    @InjectRepository(AreaEntity)
    private areaRepository: Repository<AreaEntity>,
    @InjectRepository(CoordinatorEntity)
    private coordinatorRepository: Repository<CoordinatorEntity>
  ) { }

  async findByCode(codEvent: string): Promise<EventDto> {
    const eventDB: EventEntity = await this.eventRepository.findOne({
      where: { eventCode: codEvent },
      relations: ['area', 'coordinator'],
    });
    if (!eventDB) {
      throw new NotFoundException("The event does not exist!");
    }
    return new EventDto(eventDB);

  };

  async findAll(): Promise<EventDto[]> {
    const eventsDB = await this.eventRepository.find({
      relations: ['area', 'coordinator'],
    });

    const eventsDto = eventsDB
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map((eventDB: EventEntity) => new EventDto(eventDB));
    return eventsDto;
  };

  async getLastEvents(): Promise<EventDto[]> {
    const events = await this.findAll();

    return events
      // .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
      .slice(0, 10);
  }

  async createEvent(event: CreateEventDto): Promise<EventDto> {
    const alreadyExistEvent = await this.eventRepository.findOneBy({ eventName: event.name });
    if (alreadyExistEvent) {
      throw new BadRequestException("The event already exists!");
    }
    const coordinator = await this.coordinatorRepository.findOneBy({ codeCoordinator: event.coordCode });
    const area = await this.areaRepository.findOneBy({ codeArea: event.area });
    const areaEntity: AreaEntity = {
      codeArea: area.codeArea,
      name: area.name,
      description: area.description
    };
    let newEvent: EventEntity = {
      eventName: event.name,
      area: areaEntity,
      coordinator: coordinator,
      description: event.description,
      startDate: boliviaDateToJSDate(event.initDate),
      endDate: boliviaDateToJSDate(event.endDate),
      needsEnroll: event.needsEnroll,
      participations: [],
      createdAt: new Date(),
      photoUrl: null,
    };
    newEvent = await this.eventRepository.save(newEvent);
    newEvent.eventCode = genCode("EVE", 10, newEvent.id);
    newEvent = await this.eventRepository.save(newEvent);
    return new EventDto(newEvent);
  };

  async deleteEvent(codEvent: string): Promise<void> {
    const eventExist = await this.eventRepository.findOneBy({ eventCode: codEvent });
    if (!eventExist) {
      throw new NotFoundException("Event does not exist!");
    }
    await this.eventRepository.delete(codEvent);
  };
}
