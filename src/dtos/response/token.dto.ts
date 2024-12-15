export class TokenDto {
    userCode: string;
    jwt: string;

    constructor(userCode: string, token: string) {
        this.userCode = userCode;
        this.jwt = token;
    }
}