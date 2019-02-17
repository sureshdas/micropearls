import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MediaDialogComponent } from '../app/media-dialog/media-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(public http: HttpClient, private dialog: MatDialog) {}

  addMedia = 'file_upload';

  uploadMedia(mediaObj: any) {
    // post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
    return this.http.post(this.addMedia, mediaObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateMedia(mediaObj: any, id: any) {
    return this.http.put(`${this.addMedia}/${id}`, mediaObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  removeTechFiles(id: any) {
    return this.http.delete(`${this.addMedia}/${id}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  mediaDialog(data: any) {
    return this.dialog
      .open(MediaDialogComponent, {
        width: '800px',
        data: data
      })
      .afterClosed();
  }
}
