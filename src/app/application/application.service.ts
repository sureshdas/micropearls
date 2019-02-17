import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { JsonPipe } from '@angular/common';
import { DialogComponent } from '@app/shared/dialog/dialog.component';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  applicationDetailId: any;
  updateTipsFileAppli = 'tips_and_pearls/tips_file';
  updateFileAppli = 'tips_and_pearls/technique_file';
  postAppli = 'application_detail';
  editAppli = 'application_detail/get_app_detail';
  updateapi = 'application_detail/app_detail_update';
  deleteAppli = 'application_detail/app_detail_set_status';
  saveTipsPears = 'tips_and_pearls';
  updateTipsPearls = 'tips_and_pearls';
  deleteTechnique = 'tips_and_pearls';
  addTechFile = '';
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  public tech: Observable<any>;
  public currentData: Observable<any>;
  private edittech = new BehaviorSubject('message');

  private editApplicationData = new BehaviorSubject('Default Message');
 
  constructor(public http: HttpClient, private dialog: MatDialog) {
    this.currentData = this.editApplicationData.asObservable();
    this.tech = this.edittech.asObservable();
  }

  changeMessage(message: any) {
    this.editApplicationData.next(message);
  }
  editmsg(msg: any) {
    this.edittech.next(msg);
  }

  saveApplication(data: any) {
    return this.http.post(this.postAppli, data, { headers: this.headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getAllApplication() {
    return this.http.get(this.postAppli, { headers: this.headers }).pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }

  updateApplication(appObj: any) {
    return this.http
      .put(this.postAppli, appObj, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  
  upadateTipsFile(obj: any) {
    return this.http
      .put(`${this.updateTipsFileAppli}`, obj, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  showDialog() {
    return this.dialog.open(DialogComponent, {}).afterClosed();
  }

  editApplication(id: any) {
    this.applicationDetailId = id;
    const reqObj = {
      applicationDetailId: id
    };
    return this.http
      .get(`${this.editAppli}/${id}`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          let responseObj = JSON.stringify(response);
          return responseObj;
          // return response.data;
        })
      );
  }

  deleteApplication(data: any) {
    return this.http
      .put(this.deleteAppli + '/' + data.uniqueId, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  // Tips & Pearls apis

  saveTipsPearls(data: any) {
    return this.http
      .post(this.saveTipsPears, data, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getTipsPearls(applicationId: any) {
    if (applicationId) {
      return this.http
        .get(`${this.saveTipsPears}/${applicationId}`, {
          headers: this.headers
        })
        .pipe(
          map((response: any) => {
            return response.data;
          })
        );
    }
  }
  updateTipsPearlsData(obj: any) {
    return this.http
      .put(`${this.updateTipsPearls}`, obj, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  addTechFiles(obj: any) {
    return this.http
      .post(`${this.addTechFile}`, obj, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  deleteTipsTechnique(techId: any) {
    return this.http
      .delete(`${this.deleteTechnique}/${techId}`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
