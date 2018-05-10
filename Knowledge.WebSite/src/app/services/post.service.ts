import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../models/post';
import {Config} from '../config';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PostService {

  private routeApiUrl = Config.apiUrl + 'post/';

  constructor(private http: HttpClient) {
  }

  add(post: Post): Observable<any> {
    return this.http.post(this.routeApiUrl + 'add', post);
  }

  search(query: string, currentPage: number): Observable<any> {
    return this.http.get(this.routeApiUrl + `search/${currentPage}/${query}`);
  }

  getNumberOfPostsInSearchQuery(query: string): Observable<any> {
    return this.http.get(this.routeApiUrl + `count/${query}`);
  }
}
