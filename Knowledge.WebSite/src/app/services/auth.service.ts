import {Injectable} from '@angular/core';
import {LoginDto} from '../models/requests/loginDto';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {RegisterDto} from '../models/requests/registerDto';
import {enviroment} from '../enviroment';

@Injectable()
export class AuthService {

  private apiUrl = enviroment.apiUrl + 'auth/';

  constructor(private http: HttpClient) {
  }

  login(loginDto: LoginDto): Observable<any> {
    return this.http.post(this.apiUrl + 'login', loginDto, {responseType: 'text'});
  }

  register(registerDto: RegisterDto): Observable<any> {
    return this.http.post(this.apiUrl + 'register', registerDto);
  }

  isLogged(): boolean {
    const jwt = localStorage.getItem('jwt');
    return !!jwt; // just js things
  }
}
