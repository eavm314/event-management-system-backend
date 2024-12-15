import { BadRequestException, Injectable, NestMiddleware, Post } from '@nestjs/common';
import { NextFunction, Request, Response, } from "express";
import * as moment from 'moment';

@Injectable()
export class EventMiddleware implements NestMiddleware {
  @Post()
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body) {
      const boliviaDateForm: string = 'DD/MM/YYYY';
      const { initDate, endDate } = req.body;
      const initDayValid = moment(initDate, boliviaDateForm, true).isValid();
      const endDayValid = endDate === undefined || moment(endDate, boliviaDateForm, true).isValid();
      if (!initDayValid || !endDayValid) {
        throw new BadRequestException("Dates must be in the format of DD/MM/YYYY");
      }
    } else {
      throw new BadRequestException("The is no data in the body!");
    }
    next();
  }

}

