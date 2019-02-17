import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
// import { EditorComponent } from '/editor.component';
import { NgxEditorModule } from 'ngx-editor';
import { HomeService } from '../application.service';
import { Router } from '@angular/router';
// import ApplicationModel from './applicationModel';

@Component({
  selector: 'add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.scss']
})
export class AddApplicationComponent implements OnInit {
  image: any;
  logo: any;
  isEdit: Boolean;
  imageData: any;
  message: string;
  logoData: any;
  applicationDetail: any = {
    description: '',
    applicationImage: '',
    applicationLogo: '',
    applicationName: ''
  };

  constructor(public homeService: HomeService, private router: Router) {}

  ngOnInit() {
    if (this.router.url !== '/addApplication') {
      this.isEdit = true;
    }
  }

  saveApplication() {
    this.homeService
      .saveApplication(this.applicationDetail)
      .pipe(take(1))
      .subscribe((e: any) => {
        // console.log('res ::', e);
        this.applicationDetail.applicationImage = e.applicationImagePath;
        // this.router.navigate(['/home']);
      });
  }

  updateApplication() {
    const temp = this.applicationDetail;
    temp.applicationImage = this.applicationDetail.applicationImage.filepath;
    temp.applicationLogo = this.applicationDetail.applicationLogo.filepath;
    this.homeService
      .updateApplication(this.applicationDetail)
      .pipe(take(1))
      .subscribe((e: any) => {
        console.log('res ::', e);
        this.applicationDetail.applicationImage = e.applicationImagePath;
        // this.router.navigate(['/home']);
      });
  }

  handleFileImageUpload(e: any) {
    // console.log('image', e);
    const files = e.target.files;
    const f = files[0];
    const reader = new FileReader();
    reader.onload = (file => {
      return (res: any) => {
        this.applicationDetail.applicationImage = res.currentTarget.result;
        if (res.currentTarget.result) {
          this.imageData = true;
        } else {
          this.imageData = false;
        }
        // console.log('result image ::', this.applicationDetail.applicationImage);
      };
    })(f);
    reader.readAsDataURL(f);
  }

  handleFileLogoUpload(e: any) {
    // console.log('logo', e);
    const files = e.target.files;
    const f = files[0];
    const reader = new FileReader();
    reader.onload = (file => {
      return (res: any) => {
        this.applicationDetail.applicationLogo = res.currentTarget.result;
        if (res.currentTarget.result) {
          this.logoData = true;
        } else {
          this.logoData = false;
        }
        // console.log('result logo ::', this.applicationDetail.applicationLogo);
      };
    })(f);
    reader.readAsDataURL(f);
  }
}
