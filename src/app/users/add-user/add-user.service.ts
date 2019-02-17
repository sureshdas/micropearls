// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { User } from './user';
// @Injectable({
//   providedIn: 'root'
// })
// export class AddUserService {
//   _url = 'user';
//   constructor(public http: HttpClient) {}
//   adduser(user: User) {
//     console.log('------', user);
//     console.log('------', this._url);
//     return this.http.post<any>(this._url, user);
//   }
//   updateUser(id: string, user: User) {
//     const url = `${this._url}/${id}`;
//     return this.http.put<any>(url, user);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class AddUserService {
  _url = 'user';
  urlRoles = 'user/roles';
  constructor(public http: HttpClient) {}
  adduser(user: User) {
    console.log('------', user);
    console.log('------', this._url);
    return this.http.post<any>(this._url, user);
  }
  updateUser(user: User) {
    const url = `${this._url}`;
    return this.http.put<any>(this._url, user);
  }
  getRolesData() {
    return this.http.get(`${this.urlRoles}`).pipe(
      map((response: any) => {
        if (response.status == 200) {
          console.log(response.roles);
          return response.roles;
        }
      })
    );
  }
}
