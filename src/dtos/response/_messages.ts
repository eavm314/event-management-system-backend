export interface MessageTypes {
    [key: string]: string;
};

export interface ErrorMessage {
    errorMessage: string;
}

export interface InfoMessage<Dto> {
    message: string,
    data?: Dto,
}
