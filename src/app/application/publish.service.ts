import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PublishService {
  publishPostApi = 'version/publish/s3';
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(public http: HttpClient) {}
  publishApplication() {
    return this.http.post(this.publishPostApi, { headers: this.headers }).pipe(
      map((response: any) => {
        console.log('response of publish application', response);
        return response;
      })
    );
  }
}
