import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  ViewChildren,
  QueryList
} from '@angular/core';
import { ResourceService } from '../resource.service';
import { take } from 'rxjs/operators';
import { MediaService } from '@app/media.service';
import { HomeService } from '@app/application/application.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'app-resource-image',
  templateUrl: './resource-image.component.html',
  styleUrls: ['./resource-image.component.scss']
})
export class ResourceImageComponent implements OnInit {
  @ViewChildren('techniqueFileRef') techniqueFileRef: QueryList<ElementRef>;
  files: any[] = [{ filePath: 'assets/no-image.png' }];
  isAdd: Boolean = false;
  isEdit: Boolean = false;
  addMedia: Boolean;
  resourceType = 'Image';
  editTechniqueOnHover: Boolean = false;
  deleteDefaultImg: Boolean = true;
  selectedInputRef: ElementRef;
  uniqueId: string;
  applicationId = '';
  selectedImgLib: any;
  isSave: Boolean = false;
  imageObj: any = [];
  i = 0;
  title = '';
  imageData: Boolean;
  index: number;
  Obj: any = {
    applicationDetailId: '',
    data: this.imageObj
  };
  constructor(
    public resourceService: ResourceService,
    private mediaService: MediaService,
    private homeService: HomeService,
    private router: Router,
    public snackBar: MatSnackBar,
    public sharedService: SharedService
  ) { }

  ngOnInit() {
    if (this.router.url !== '/addApplication') {
      this.getResources();
    }
  }

  showImgs(imageData: any) {
    this.isAdd = true;
    this.addMedia = false;
    if(imageData.media && imageData.media[0].filePath !== 'assets/no-image.png') {
      imageData.media.unshift({
        filePath: 'assets/no-image.png'
      });
   }
    this.files = imageData.media;
    this.selectedImgLib = imageData.index;
  }

  addResourceImages() {
    this.isAdd = true;
    this.addMedia = true;
    this.title = '';
    this.files = [{ filePath: 'assets/no-image.png' }];
  }

  saveImage(name?: string) {
    this.isAdd = false;
    this.addMedia = false;
    this.imageObj.push({
      status: false,
      title: this.title,
      index: this.i,
      resourceType: this.resourceType,
      media: this.files
    });
    this.i++;
  }

  editTitle(name: string, index: number) {
    this.isAdd = true;
    this.isEdit = true;
    this.index = index;
    this.title = name;
    this.files = this.imageObj[index].media;
  }

  saveResource() {
    this.sharedService.showLoader = true;
    this.homeService.currentData.pipe(take(1)).subscribe((message: any) => {
      if (message) {
        this.Obj.applicationDetailId = message.uniqueId;
      }
    });
    let obj = [...this.imageObj];
    if(obj[0].media && obj[0].media[0].filePath === 'assets/no-image.png') {
    obj = obj.map((el: any) => {
      el.media.shift();
      return {
        ...el
      }
    });
  }
    this.Obj.data = obj;
    this.Obj.applicationDetailId = this.Obj.applicationDetailId;
    this.resourceService
      .saveResourceData(this.Obj)
      .pipe(take(1))
      .subscribe((e: any) => {
        this.homeService.changeMessage({ uniqueId: e.applicationUniqueId });
        this.sharedService.showLoader = false;
        this.openSnackBar('Image Library Saved');
      }, (error: any) =>{
        console.log(error);
      this.sharedService.showLoader = false;
      });
  }


  openSnackBar(action: string, message?: string) {
    this.snackBar.open(action, message, { duration: 3000 });
  }

  updateResource() {
    this.sharedService.showLoader = true;
    this.homeService.currentData.pipe(take(1)).subscribe((message: any) => {
      if (message) {
        this.Obj.applicationDetailId = message.uniqueId;
        console.log('uniqueid ::', this.Obj.applicationUniqueId);
      }
    });
    this.addMedia = false;
    let obj1 = [...this.imageObj];
    if(obj1[0].media && obj1[0].media[0].filePath === 'assets/no-image.png') {
      obj1 = obj1.map((el: any) => {
        el.media.shift();
        return {
          ...el
        }
      });
   }

   const obj = {
    applicationDetailId:this.Obj.applicationDetailId,
    data: obj1
  }
    // this.Obj.data = obj;
    this.Obj.applicationDetailId = this.Obj.applicationDetailId;
    this.resourceService
      .updataResourceData(obj)
      .pipe(take(1))
      .subscribe((e: any) => {
        this.homeService.changeMessage({ uniqueId: e.applicationUniqueId });
        this.sharedService.showLoader = false;
        this.openSnackBar('Image Library Updated');
      },
      (error: any) =>{
        console.log(error);
      this.sharedService.showLoader = false;
      });
      // if(obj[0].media && obj[0].media[0].filePath !== 'assets/no-image.png') {
      //   for (let i = 0; i < this.imageObj.length; i++) {
      //     this.imageObj[i].media.unshift({
      //       filePath: 'assets/no-image.png'
      //     });
      //   }
      //  }
      this.isAdd = false;
      this.addMedia = false;
  }


  addTechFile() {
    const queryResult: ElementRef[] = this.techniqueFileRef['_results'];
    this.selectedInputRef = queryResult[0];
    this.selectedInputRef.nativeElement.click();
  }

  uploadTechFile(file: any) {
    const queryResult: ElementRef[] = this.techniqueFileRef['_results'];

    for (let i = 0; i < queryResult.length; i++) {
      if (queryResult[i].nativeElement.name === file.uniqueId) {
        this.selectedInputRef = queryResult[i];
        this.selectedInputRef.nativeElement.click();
        break;
      }
    }
  }

  triggerTechFileUpload(event: any, uniqueId: string) {
    this.uniqueId = uniqueId;
    document
      .getElementById(this.selectedInputRef.nativeElement.id)
      .addEventListener('change', this.handleRendererChange);
    // this.renderer.listen(this.selectedInputRef.nativeElement, 'change', this.handleRendererChange);
  }

  handleRendererChange = (ev: any) => {
    // dispose the event after file upload is done
    if (!this.uniqueId) {
      // this.handleTechFileUpload(ev);
      this.upload('addTechFile');
    } else {
      // this.updateTechFile(ev, this.uniqueId);
      this.upload('editTechFile', this.uniqueId);
    }
  };

  getResources() {
    this.homeService.currentData.pipe(take(1)).subscribe((message: any) => {
      if (message) {
        this.isSave = false;
        this.Obj.applicationDetailId = message.uniqueId;
        this.resourceService
          .getResourceData(`${message.uniqueId}_Image`)
          .subscribe((e: any) => {
            if (e.data.length == 0) {
              this.isSave = true;
            } else {
              this.isSave = false;
              this.imageObj = e.data;
              for (let i = 0; i < this.imageObj.length; i++) {
                this.imageObj[i].media.unshift({
                  filePath: 'assets/no-image.png'
                });
              }
              for (let i = 0; i < this.imageObj.length; i++) {
                this.imageObj[i].index = i;
              }
              this.i = this.imageObj.length;
            } 
          });
      }
    });
  }

  upload(type: string, fileId?: string) {
    this.sharedService.showLoader = true;
    let inputElementRef;
    inputElementRef = this.selectedInputRef.nativeElement;
    // get the total amount of file attached to the file input
    const fileCount = inputElementRef.files.length;
    // create a new formdata instance
    const formData = new FormData();
    // check if filecount is greater than 0, to be sure file was selected
    if (fileCount > 0) {
      formData.append('pic', inputElementRef.files.item(0));
      if (fileId) {
        const newImgObj = { ...this.imageObj };
        this.mediaService
          .updateMedia(formData, fileId)
          .pipe(take(1))
          .subscribe((res: any) => {
            this.sharedService.showLoader = false;
            for (let i = 0; i < newImgObj.length; i++) {
              if (newImgObj.files[i].uniqueId === fileId) {
                newImgObj.media[i].filePath = res.filePath;
                this.imageObj = newImgObj;
                break;
              }
            }
            for (let i = 0; i < this.files.length; i++) {
              if (this.files[i].uniqueId === fileId) {
                this.files[i] = res;
                break;
              }
            }
          },(error: any) =>{
            console.log(error);
          this.sharedService.showLoader = false;
          });
      } else {
        this.mediaService
          .uploadMedia(formData)
          .pipe(take(1))
          .subscribe((res: any) => {
            this.sharedService.showLoader = false;
            this.files.push({
              ...res,
              index: this.files.length // index will be used while updating or removing files
            });
            for (let i = 0; i < this.imageObj.length; i++) {
              if (this.imageObj[i].index === this.index) {
                this.imageObj[i].media = this.files;
                this.imageObj[i].title = this.title;
                break;
              }
            }
            // dispose the renderer change listener
            document
              .getElementById(this.selectedInputRef.nativeElement.id)
              .removeEventListener('change', this.handleRendererChange);
          },(error: any) =>{
            console.log(error);
          this.sharedService.showLoader = false;
          });
      }
    }
  }

  removeTechFile(file: any) {
    const newFiles = [...this.files];
    let updatedFiles: any[] = [];
    if (this.imageObj[this.selectedImgLib]) {
      if (this.imageObj[this.selectedImgLib].media[0].filePath === 'assets/no-image.png') {
        for (let i = 1; i < this.imageObj[this.selectedImgLib].media.length; i++) {
          if (this.imageObj[this.selectedImgLib].media[i].uniqueId === file.uniqueId) {
            this.imageObj[this.selectedImgLib].media.splice(i, 1);
            updatedFiles = this.imageObj[this.selectedImgLib].media;
            this.Obj.data = updatedFiles;
          } 
          this.deleteImg(file.uniqueId);
        }
      }
    }
  }

  deleteImg(id: any) {
    this.sharedService.showLoader = true;
    if (id) {
      this.mediaService
        .removeTechFiles(id)
        .pipe(take(1))
        .subscribe((res: any) => {
          this.sharedService.showLoader = false;
          this.openSnackBar('Image Successfully Deleted')
        },(error: any) =>{
          console.log(error);
        this.sharedService.showLoader = false;
        });
    }
  }

  imagePreview(img: any) {
    if (img) {
      this.mediaService
        .mediaDialog(img)
        .pipe(take(1))
        .subscribe(
          (response: any) => {
          },
          (error: any) => console.log(error)
        );
    }
  }

  removeImageLib(imageLib: any){
    this.sharedService.showLoader = true;
    for(let i=0; i<this.imageObj.length ; i++){
      if(this.imageObj[i].uniqueId === imageLib.uniqueId){
        if(this.imageObj[i].media.length){
          for(let j=0; j<this.imageObj[i].media.length; j++){
            this.imageObj[i].media.splice(this.imageObj[i].media.length-1);
         }
       }
       this.imageObj.splice(i,1);
      }
    }
    this.deleteDefaultImg = false;
    const id = this.Obj.applicationDetailId+'_'+imageLib.uniqueId;
    this.resourceService
    .deleteResourceData(id)
    .pipe(take(1))
    .subscribe((e: any) => {
      this.sharedService.showLoader = false;
      this.openSnackBar('Successfully Deleted');
    },(error: any) =>{
      console.log(error);
    this.sharedService.showLoader = false;
    });
  }
}
