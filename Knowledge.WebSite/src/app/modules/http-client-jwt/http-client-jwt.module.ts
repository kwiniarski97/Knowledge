import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class HttpClientJwtModule {

  constructor(private http: HttpClient) {

  }

  post(url: string, body?: any, headers?: HttpHeaders): Observable<any> {
    headers = this.createHeaders(headers);
    return this.http.post(url, body, { headers: headers });
  }

  get(url: string, headers?: HttpHeaders): Observable<any> {
    headers = this.createHeaders(headers);
    return this.http.get(url, { headers: headers });
  }

  put(url: string, body?: any, headers?: HttpHeaders): Observable<any> {
    headers = this.createHeaders(headers);
    return this.http.put(url, body, { headers: headers });
  }

  delete(url: string, headers?: HttpHeaders): Observable<any> {
    headers = this.createHeaders(headers);
    return this.delete(url, headers);
  }

  private createHeaders(headers: HttpHeaders): HttpHeaders {
    if (headers == null) {
      headers = new HttpHeaders();
    }
    headers.append('Authorization', `Bearer ${this.getJwt()}`);
    return headers;
  }

  private getJwt(): string | null {
    return localStorage.getItem('jwt');
  }

}
