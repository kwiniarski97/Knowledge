import { Injectable } from '@angular/core';
import { Jwt } from '../models/jwt';

@Injectable()
export class JwtService {

  constructor() { }

  public getJwtIfValid(): string {
    const jwtStore = (JSON.parse(localStorage.getItem('jwt')) as Jwt);
    const now = new Date();
    if (!jwtStore) {
      return '';
    }

    if (jwtStore.expireDate > now) {
      this.removeJwt();
    }

    return jwtStore.token;
  }

  public removeJwt(): void {
    localStorage.removeItem('jwt');
  }

  public setJwt(jwt: Jwt): void{
    localStorage.setItem('jwt', JSON.stringify(jwt));
  }

}
