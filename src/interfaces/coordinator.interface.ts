import { CoordinatorDTO } from '../dtos/response/coordinator.dto';

export interface CoordinatorInterface {
  findById(codeCoord: string): Promise<CoordinatorDTO | null>;
  findTeam(): Promise<CoordinatorDTO[] | null>;
}