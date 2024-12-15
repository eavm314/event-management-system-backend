import { AreaEntity } from "../../entities/area.entity";

export class AreaDTO {
  codeArea: string;
  name: string;
  description: string;

  constructor(area: AreaEntity) {
    this.codeArea = area.codeArea;
    this.name = area.name;
    this.description = area.description;
  }
}