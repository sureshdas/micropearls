import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userLogin = 'user/signin';
  public currentData: Observable<any>;
  private loginData = new BehaviorSubject('Default Message');

  constructor(public http: HttpClient) {
    this.currentData = this.loginData.asObservable();
  }

  changeMessage(message: any) {
    this.loginData.next(message);
  }
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });


  login(credentials: any) {
    console.log('cred:: ', credentials);
   return this.http
      .post( this.userLogin, credentials , { headers: this.headers })
      .pipe(
        map((response: any) => {
          let responseObj = JSON.stringify(response);
          return responseObj;
          // return response.data;
        })
      );
  }
}
