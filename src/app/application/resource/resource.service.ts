import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  postResource = 'resources';
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(public http: HttpClient) {}
  updataResourceData(data: any) {
    return this.http
      .put(this.postResource, data, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  saveResourceData(data: any) {
    return this.http
      .post(this.postResource, data, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  
  getResourceData(id: any) {
    return this.http
      .get(`${this.postResource}/${id}`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  deleteResourceData(id: any) {
    return this.http
      .delete(`${this.postResource}/${id}`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
