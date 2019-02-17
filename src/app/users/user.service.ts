import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from './users';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public rowObj: Object;
  userDetailId: string;
  _url = 'user';
  headers = new HttpHeaders({
    'Content-Type': 'users/json'
  });

  // private editUserData = new BehaviorSubject('Default data');

  // public currentData: Observable<any>;

  constructor(public http: HttpClient) {
    // this.currentData = this.editUserData.asObservable();
  }
  // updateData(data: User) {
  //   return this.rowObj = data;
  //   // this.editUserData.next(data);
  //   // console.log("hii")
  //   // console.log('data::' + data);
  // }
  getUsers(): Observable<IUser[]> {
    return this.http.get(this._url, { headers: this.headers }).pipe(
      map((response: any) => {
        // debugger;
        console.log(response);
        return response.data;
      })
    );
  }
  // editUser(id: any): Observable<IUser[]> {
  //   return this.http
  //     .get(`${this.editUser}/${id}`, { headers: this.headers })
  //     .pipe(
  //       map((response: any) => {
  //         // debugger;
  //         console.log(response);
  //         return response.data;
  //       })
  //     );
  // }
  deleteUser(id: any): Observable<IUser[]> {
    return this.http
      .get(`${this.deleteUser}/${id}`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          // debugger;
          console.log(response);
          return response.data;
        })
      );
  }

  //   this.currentData = this.editUserData.asObservable();
  // }

  // changeMessage(message: string) {
  //   this.editUserData.next(message);
  //   console.log('changemsg' + message);
  // }
  // getAllUser() {
  //   return this.http.get(this.postUser, { headers: this.headers }).pipe(
  //     map((response: any) => {
  //       debugger;

  //       return response.data;
  //     })
  //   );
  //   // return new Promise((resolve, reject) => {
  //   //   this.http.get(this.postUser, { headers: this.headers }).subscribe(
  //   //     (res: Response) => {
  //   //       resolve(res);
  //   //     },
  //   //     err => {
  //   //       reject(err);
  //   //     }
  //   //   );
  //   // });
  // }
  // editUsers(id: any) {
  //   this.userDetailId = id;
  //   const reqObj = {
  //     userDetailId: id
  //   };
  //   return this.http.get(`${this._url}/${id}`, { headers: this.headers }).pipe(
  //     map((response: any) => {
  //       console.log('Edit Msg' + JSON.stringify(response));
  //       let responseObj = JSON.stringify(response);
  //       return responseObj;
  //       // return response.data;
  //     })
  //   );
  // }
  //   // return new Promise((resolve, reject) => {
  //   //   this.http
  //   //     .get(`${this.editUsr}/${id}`, { headers: this.headers })
  //   //     .subscribe(
  //   //       (res: Response) => {
  //   //         resolve(res);
  //   //       },
  //   //       err => {
  //   //         reject(err);
  //   //       }
  //   //     );
  //   // });
  // }
  // deleteUser(data: any) {
  //   return this.http.post(this.deleteUsr, data, { headers: this.headers }).pipe(
  //     map((response: any) => {
  //       if (response.status === 1) {
  //         return response.data;
  //       }
  //     })
  //   );
  //   // return new Promise((resolve, reject) => {
  //   //   this.http
  //   //     .post(this.deleteUsr, data, { headers: this.headers })
  //   //     .subscribe(
  //   //       (res: Response) => {
  //   //         resolve(res);
  //   //       },
  //   //       err => {
  //   //         reject(err);
  //   //       }
  //   //     );
  //   // });
  // }
}
