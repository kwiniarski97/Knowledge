import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  private _isLogged: boolean = false;

  get isLogged(): boolean {
    if (!this._isLogged) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        return true;
      }
      return false;
    }

    return this._isLogged;
  }

  private _userNickname: string;

  get userNickname(): string {
    if (!this._userNickname) {
      const nickName = localStorage.getItem('userNickname');
      if (nickName) {
        return nickName;
      }
      return '';
    }
    return this._userNickname;
  }

  constructor() {
  }

  userLogin(nickName, jwt) {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('userNickname', nickName);
    this._isLogged = true;
    this._userNickname = nickName;
  }

  userLogout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userNickname');
    this._userNickname = '';
    this._isLogged = false;
  }
}

