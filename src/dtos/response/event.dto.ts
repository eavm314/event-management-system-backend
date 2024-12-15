import { EventEntity } from "../../entities/event.entity";
import { ParticipationEntity } from "../../entities/participation.entity";
import { AreaDTO } from "./area.dto";
import { CoordinatorDTO } from "./coordinator.dto";

export class EventDto {
  codEvent: string;
  name: string;
  description: string;
  canEnroll: number;
  startDate: Date;
  endDate: Date;
  area: string;
  coordinator: CoordinatorDTO;
  image: string;

  score?: number;
  enrollDate?: Date

  constructor(event: EventEntity) {
    this.codEvent = event.eventCode;
    this.name = event.eventName;
    this.description = event.description;
    this.canEnroll = event.needsEnroll ? 1 : 0;
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.area = event.area?.name;
    this.coordinator = event.coordinator ? new CoordinatorDTO(event.coordinator) : null;
    this.image = event.photoUrl;
  }

  public static fromParticipation(participation: ParticipationEntity): EventDto {
    const eventDto = new EventDto(participation.event);
    eventDto.enrollDate = participation.enrollDate;
    eventDto.score = participation.score;
    return eventDto;
  }
}
