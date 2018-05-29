import {Injectable} from '@angular/core';
import {LoginDto} from '../models/requests/loginDto';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Config} from '../config';
import {RegisterDto} from '../models/requests/registerDto';

@Injectable()
export class AuthService {

  private apiUrl = Config.apiUrl + '/auth/';

  constructor(private http: HttpClient) {
  }

  login(loginDto: LoginDto): Observable<any> {
    return this.http.post(this.apiUrl + 'login', loginDto);
  }

  register(registerDto: RegisterDto): Observable<any>{
    return this.http.post(this.apiUrl + 'register', registerDto);
  }
}
