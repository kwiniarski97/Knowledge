import {Injectable} from '@angular/core';
import {HttpClient, HttpClientJsonpModule} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AddRequest} from '../models/requests/addRequest';
import { enviroment } from '../enviroment';
import { HttpClientJwtModule } from '../modules/http-client-jwt/http-client-jwt.module';

@Injectable()
export class PostService {

  private routeApiUrl = enviroment.apiUrl + 'post/';

  constructor(private http: HttpClient, private httpJwt: HttpClientJwtModule) {
  }

  add(request: AddRequest): Observable<any> {
    return this.httpJwt.post(this.routeApiUrl + 'add', request);
  }

  search(query: string, currentPage: number): Observable<any> {
    return this.http.get(this.routeApiUrl + `search/${currentPage}/${query}`);
  }

  getNumberOfPostsInSearchQuery(query: string): Observable<any> {
    return this.http.get(this.routeApiUrl + `count/${query}`);
  }

  getPostById(id: string): Observable<any> {
    return this.http.get(this.routeApiUrl + id);
  }
}
