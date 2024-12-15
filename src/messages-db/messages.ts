import { ErrorMessage, InfoMessage } from "../dtos/response/_messages";
import { statusMessages } from "./messagesTypes";

export const showError = (statusCode: number): ErrorMessage => {
  return {
    errorMessage: statusMessages[`${statusCode}`]
  };
};

export const showInfo = <Dto>(statusCode: number, data: Dto): InfoMessage<Dto> => {
  return {
    message: statusMessages[`${statusCode}`],
    data: data,
  };
};
