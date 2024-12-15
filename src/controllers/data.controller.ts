import { Controller, Get, Param, Req } from "@nestjs/common";
import { AreaDTO } from "../dtos/response/area.dto";
import { DataService } from "../services/area.service";
import { Public } from "src/decorators/public.decorator";
import { PagesService } from "src/services/pages.service";
import { InfoMessage } from "src/dtos/response/_messages";
import { PageDto } from "src/dtos/response/page.dto";
import { CourseTypeDto } from "src/dtos/response/courseType.dto";
import { CoordinatorDTO } from "src/dtos/response/coordinator.dto";
import { CoordinatorService } from "src/services/coordinator.service";

@Public()
@Controller()
export class DataController {
  constructor(
    private readonly dataService: DataService,
    private readonly pagesService: PagesService,
    private readonly coordinatorService: CoordinatorService,
  ) { }

  @Get("pages")
  async getPages(@Req() req): Promise<InfoMessage<PageDto[]>> {
    let pageDtos = [];
    if (req.user) {
      const { userCode } = req.user;
      pageDtos = await this.pagesService.getProtectedPages(userCode);
    } else {
      pageDtos = await this.pagesService.getPublicPages();
    }
    return {
      message: "Pages Retrieved Successfully",
      data: pageDtos,
    }
  }

  @Get("areas")
  async getAllAreas(): Promise<InfoMessage<AreaDTO[]>> {
    const areas = await this.dataService.findAllAreas();
    return {
      message: "Areas retrieved successfully",
      data: areas
    }
  }

  @Get("areas/:code")
  async getAreaByCode(@Param("code") code: string): Promise<InfoMessage<AreaDTO>> {
    const area = await this.dataService.findAreaByCode(code);
    return {
      message: "Area retrieved successfully",
      data: area
    }
  }
  
  @Get("types")
  async getAllCourseTypes(): Promise<InfoMessage<CourseTypeDto[]>> {
    const types = await this.dataService.findAllTypes();
    return {
      message: "Course types retrieved successfully",
      data: types
    }
  }

  @Get("types/:code")
  async getTypeByCode(@Param("code") code: string): Promise<InfoMessage<CourseTypeDto>> {
    const type = await this.dataService.findTypeByCode(code);
    return {
      message: "Course type retrieved successfully",
      data: type
    }
  }

  @Get("team")
  async getTeam(): Promise<InfoMessage<CoordinatorDTO[]>> {
    const team = await this.coordinatorService.findTeam();
    return {
      message: "Team info retrieved successfully",
      data: team
    }
  }

}