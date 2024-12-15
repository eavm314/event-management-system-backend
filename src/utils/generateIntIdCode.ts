"use client";
import { randomBytes } from "crypto";
import { EventService } from "../services/event.service";

export const generateIncrementalValue = async (eventService: EventService) => {
  try {
    const values: any = await eventService.findAll();
    const { data } = values;
    let auxCode = 0;
    data.map(item => {
      if (item.intId > auxCode) {
        auxCode = item.intId;
      }
    });
    const intId = (auxCode ? auxCode : 0) + 1;

    const randomString = randomBytes(2).toString('hex');
    const Cod_evento = randomString + intId.toString();

    return Cod_evento;
  } catch (error) {
    console.error(error);
    return "";
  }
}
