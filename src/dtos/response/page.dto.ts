import { PageEntity } from "src/entities/page.entity";

export class PageDto {
  pageName: string;
  route: string;
  authRequired: boolean;
  roleRequired: string;
  navbarOrder: number;

  constructor(page: PageEntity) {
    this.pageName = page.pageName;
    this.route = page.route;
    this.authRequired = page.authRequired;
    this.roleRequired = page.roleRequired?.roleCode ?? null;
    this.navbarOrder = page.navbarOrder;
  }
}