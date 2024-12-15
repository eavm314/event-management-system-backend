import * as moment from "moment";

export const boliviaDateToJSDate = (date?: string): Date => {
  return date? moment(date, "DD/MM/YYYY").toDate() : null;
};
