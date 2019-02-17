import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-media-dialog',
  templateUrl: './media-dialog.component.html',
  styleUrls: ['./media-dialog.component.scss']
})
export class MediaDialogComponent implements OnInit {
//   showVideo: Boolean;
//   showImg: Boolean;
//   constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
//     console.log('media dialog box ::', data);
//     const mediaData = data.split('.');
//     console.log('mediaData::', mediaData.length - 1);
//     const d = mediaData[mediaData.length - 1];
//     if (d === 'png') {
//       this.showImg = true;
//     } else {
//       this.showImg = false;
//     }

//     if (d === 'mp4') {
//       this.showVideo = true;
//     } else {
//       this.showVideo = false;
//     }
//   }
//   ngOnInit() {}
// }

ngOnInit() {}

showPdf: Boolean;
showVideo: Boolean;
showImg: Boolean;
constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  const mediaData = data.split('.');
  const d = mediaData[mediaData.length - 1];
  console.log('d::', d);
  
  if (d === 'png') {
    this.showImg = true;
  } else {
    this.showImg = false;
  }

  if (d === 'mp4') {
    this.showVideo = true;
  } else {
    this.showVideo = false;
  }
  if(d==='pdf'){
    this.showPdf=true;
    }else{
      this.showPdf=false;
    }
 
}

}