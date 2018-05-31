export class Jwt {

    public expireDate: Date;

    public token: string;

    constructor(expireDate: Date, token: string) {
        this.expireDate = expireDate;
        this.token = token;
    }
}
