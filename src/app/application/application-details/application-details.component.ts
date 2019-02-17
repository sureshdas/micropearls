import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import { take } from 'rxjs/operators';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http } from '@angular/http';
import { HomeService } from '../application.service';
import { Router } from '@angular/router';
import { editorConfig } from '@app/utils/utils';
import { MediaService } from '@app/media.service';
import { MatSnackBar } from '@angular/material';
import { SharedService } from '@app/shared/shared.service';

const url = 'file_upload';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {
  @ViewChild('applicationImageRef') applicationImageRef: ElementRef;
  @ViewChild('applicationLogoRef') applicationLogoRef: ElementRef;

  // declare a property called fileuploader and assign it to an instance
  // of a new fileUploader.
  // pass in the url to be uploaded to, and pass the itemAlias,
  // which would be the name of file input when sending the post request
  public uploader: FileUploader = new FileUploader({ url, itemAlias: 'pic' });

  updateFiles: boolean = false;
  isEdit: Boolean;
  isEditButton: boolean;
  editid: any;
  applicationId: any;
  imageUniqueId: any;
  logoUniqueId: any;
  applicationDetail: any = {
    description: '',
    applicationImage: { filePath: 'assets/no-image.png' },
    applicationLogo: { filePath: 'assets/no-image.png' },
    applicationName: ''
  };
  editorConfig: any = editorConfig;
  applicationImageId: any;
  applicationLogoId: any;

  constructor(
    public homeService: HomeService,
    private router: Router,
    private renderer: Renderer2,
    private mediaService: MediaService,
    private http: Http,
    public snackBar: MatSnackBar,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    // override the onAfterAddingFile property of the uploader so it
    // doesn't authenticate with credentials.
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };
    // override the onCompleteItem property of the uploader so we are
    // able to deal with the server response.
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      console.log('imageUploaded', item, status, response);
    };

    if (this.router.url !== '/addApplication') {
      this.sharedService.showLoader = true ;
      this.isEditButton = true;
      this.isEdit = true;
      this.homeService.currentData.pipe(take(1)).subscribe((message: any) => {
        this.editid = message.uniqueId;
        if (message.data) {
          this.applicationDetail = message.data;
        }
        this.homeService
          .editApplication(message.uniqueId)
          .pipe(take(1))
          .subscribe(res => {
            this.isEdit = true;
            const responseData = JSON.parse(res);
            console.log('edit application data ::', responseData);
            if (responseData.data) {
              this.applicationId = responseData.data._id;
              this.applicationDetail = responseData.data;
              this.applicationImageId =
                responseData.data.applicationImage.uniqueId;
              this.applicationLogoId =
                responseData.data.applicationLogo.uniqueId;
            }
            this.sharedService.showLoader = false ;
          },
          (error: any) =>{
            console.log(error);
          this.sharedService.showLoader = false;
          });
      });
    }
  }

  saveApplication() {
    this.sharedService.showLoader = true;
    this.homeService
      .saveApplication(this.applicationDetail)
      .pipe(take(1))
      .subscribe((e: any) => {
        this.sharedService.showLoader = false;
        this.homeService.changeMessage({ uniqueId: e.applicationUniqueId });
        this.openSnackBar('Application Saved');
        this.router.navigate(['/home']);
      },
      (error: any) =>{
        console.log(error);
      this.sharedService.showLoader = false;
      });
  }

  openSnackBar(action: string, message?: string) {
    this.snackBar.open(action, message, { duration: 3000 });
  }


  updateApplication() {
    this.sharedService.showLoader = true;
    this.applicationDetail.uniqueId = this.editid;
    this.homeService
      .updateApplication(this.applicationDetail)
      .pipe(take(1))
      .subscribe((e: any) => {
        console.log('uniqueid ::', e.applicationUniqueId);
        this.sharedService.showLoader = false;
        this.homeService.changeMessage({ uniqueId: e.applicationUniqueId });
        this.openSnackBar('Application Updated');
      },
      (error: any) =>{
        console.log(error);
      this.sharedService.showLoader = false;
      });
  }

  handleApplicationImageUpload(e: any, img: any) {
    this.uploadImage('appImage');
  }

  handleApplicationLogoUpload(e: any, logo: any) {
    this.uploadLogo('appLogo');
  }

  fileUpload(type: string) {
    if (type === 'appImage') {
      this.applicationImageRef.nativeElement.click();
    } else {
      this.applicationLogoRef.nativeElement.click();
    }
  }

  removeFile(type: string) {
    if (type === 'appImage') {
      this.applicationDetail.applicationImage = 'assets/no-image.png';
    } else {
      this.applicationDetail.applicationLogo = 'assets/no-image.png';
    }
  }

  triggerAppImageUpload(event: any, img: any) {
    this.imageUniqueId = img;
    document
      .getElementById(this.applicationImageRef.nativeElement.id)
      .addEventListener('change', this.handleRendererChange);
  }

  handleRendererChange = (ev: any) => {
    this.handleApplicationImageUpload(ev, this.imageUniqueId);
  };

  triggerAppLogoUpload(event: any, logo: any) {
    this.logoUniqueId = logo;
    document
      .getElementById(this.applicationLogoRef.nativeElement.id)
      .addEventListener('change', this.handleLogoRendererChange);
  }
  handleLogoRendererChange = (ev: any) => {
    this.handleApplicationLogoUpload(ev, this.logoUniqueId);
  };
  getFileHoverEvent(event: any) {
    this.updateFiles = event.shouldAttach;
  }

  uploadImage(type: string) {
    this.sharedService.showLoader = true;
    // locate the file element meant for the file upload
    let inputElementRef;
    if (type === 'appImage') {
      inputElementRef = this.applicationImageRef.nativeElement;
    }
    // get the total amount of file attached to the file input
    const fileCount = inputElementRef.files.length;
    // console.log('fileCount', fileCount);
    // create a new formdata instance
    const formData = new FormData();
    // check if the filcount is greater than zero, to be
    // sure the file was selected
    if (fileCount > 0) {
      // append the key name 'photo' with the first file in the element
      formData.append('pic', inputElementRef.files.item(0));
      //call the angular http method

      if (type === 'appImage' && this.applicationImageId) {
        this.mediaService
          .updateMedia(formData, this.applicationImageId)
          .pipe(take(1))
          .subscribe(
            //map the success function and alert the response
            (response: any) => {
              this.sharedService.showLoader = false;
              this.applicationDetail.applicationImage = response;
              document
                .getElementById(this.applicationImageRef.nativeElement.id)
                .removeEventListener('change', this.handleRendererChange);
            },
            (error: any) =>{
              console.log(error);
            this.sharedService.showLoader = false;
            }
          );
      } else {
        if (type === 'appImage') {
          this.mediaService
            .uploadMedia(formData)
            .pipe(take(1))
            .subscribe(
              //map the success function and alert the response
              (response: any) => {
                this.sharedService.showLoader = false;
                this.applicationDetail.applicationImage = response;
                document
                  .getElementById(this.applicationImageRef.nativeElement.id)
                  .removeEventListener('change', this.handleRendererChange);
              },
              (error: any) =>{
                console.log(error);
              this.sharedService.showLoader = false;
              }
            );
        }
      }
    }
  }

  uploadLogo(type: string) {
    this.sharedService.showLoader = true;
    // locate the file element meant for the file upload
    let inputElementRef;
    if (type === 'appLogo') {
      inputElementRef = this.applicationLogoRef.nativeElement;
    }
    // get the total amount of file attached to the file input
    const fileCount = inputElementRef.files.length;
    // console.log('fileCount', fileCount);
    // create a new formdata instance
    const formData = new FormData();
    // check if the filcount is greater than zero, to be
    // sure the file was selected
    if (fileCount > 0) {
      // append the key name 'photo' with the first file in the element
      formData.append('pic', inputElementRef.files.item(0));
      //call the angular http method

      if (this.applicationLogoId) {
        this.mediaService
          .updateMedia(formData, this.applicationLogoId)
          .pipe(take(1))
          .subscribe(
            //map the success function and alert the response
            (response: any) => {
              this.sharedService.showLoader = false;
              this.applicationDetail.applicationLogo = response;
              document
                .getElementById(this.applicationLogoRef.nativeElement.id)
                .removeEventListener('change', this.handleLogoRendererChange);
            },
            (error: any) =>{
              console.log(error);
            this.sharedService.showLoader = false;
            }
          );
      } else {
        this.mediaService
          .uploadMedia(formData)
          .pipe(take(1))
          .subscribe(
            //map the success function and alert the response
            (response: any) => {
              this.sharedService.showLoader = false;
              this.applicationDetail.applicationLogo = response;
              document
                .getElementById(this.applicationLogoRef.nativeElement.id)
                .removeEventListener('change', this.handleLogoRendererChange);
            },
            (error: any) => {
              console.log(error);
            this.sharedService.showLoader = false;
            }
            
          );
      }
    }
  }

  imagePreview(img: any) {
    console.log('image preview clicked');
    if (img) {
      this.mediaService
        .mediaDialog(img)
        .pipe(take(1))
        .subscribe(
          (response: any) => {
            console.log('img preview res');
          },
          (error: any) => console.log(error)
        );
    }
  }
}
