import { CoordinatorEntity } from "../../entities/coordinator.entity";

export class CoordinatorDTO {
  fullName: string;
  position: string;
  description: string;
  email: string;
  phone: string;
  image: string;
  state: boolean;

  constructor(coordinator: CoordinatorEntity) {
    this.fullName = coordinator.nameTeam;
    this.email = coordinator.user?.email;
    this.phone = coordinator.user?.phoneNum;
    this.state = coordinator.state;
    this.image = coordinator.user?.profilePhoto;
    this.position = coordinator.position
    this.description = coordinator.description
  }
}