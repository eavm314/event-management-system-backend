import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PageDto } from "src/dtos/response/page.dto";
import { PageEntity } from "src/entities/page.entity";
import { UserEntity } from "src/entities/user.entity";

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(PageEntity)
    private pagesRepository: Repository<PageEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async getPublicPages(): Promise<PageDto[]> {
    const pages = await this.pagesRepository.findBy({ authRequired: false });
    return pages.map(page => new PageDto(page));
  }
  
  async getProtectedPages(userCode: string): Promise<PageDto[]> {
    const user = await this.userRepository.findOneBy({ userCode });
    const pages = await this.pagesRepository.find();

    return pages
      .filter(p => !p.roleRequired || p.roleRequired.roleCode === user.role?.roleCode)
      .map(page => new PageDto(page));
  }
}