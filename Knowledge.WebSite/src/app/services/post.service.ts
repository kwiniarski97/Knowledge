import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AddRequest} from '../models/requests/addRequest';
import {PostDetails} from '../models/post-details';
import { enviroment } from '../enviroment';

@Injectable()
export class PostService {

  private routeApiUrl = enviroment.apiUrl + 'post/';

  constructor(private http: HttpClient) {
  }

  add(request: AddRequest): Observable<any> {
    return this.http.post(this.routeApiUrl + 'add', request);
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
