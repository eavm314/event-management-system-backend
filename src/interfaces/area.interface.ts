import { AreaDTO } from '../dtos/response/area.dto';

export interface AreaInterface {
  findAreaByCode(areaCode: string): Promise<AreaDTO | null>;
  findAllAreas(): Promise<AreaDTO[] | null>;
}