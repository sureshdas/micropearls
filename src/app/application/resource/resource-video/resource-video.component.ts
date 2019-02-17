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
  selector: 'app-resource-video',
  templateUrl: './resource-video.component.html',
  styleUrls: ['./resource-video.component.scss']
})
export class ResourceVideoComponent implements OnInit {
  @ViewChildren('resourceVideoFileRef') resourceVideoFileRef: QueryList<ElementRef>;
  videoObj: any = [];
  hideSaveBtn : Boolean;
  updateMedia: Boolean;
  Obj: any = {
    applicationDetailId: '',
    data: this.videoObj
  };
  files: any[] = [{ filePath: 'assets/no-image.png' }];
  isAdd: Boolean = false;
  isEdit: Boolean;
  isSave: Boolean;
  addMedia: Boolean;
  deleteDefaultImg: Boolean = true;
  title = '';
  selectedInputRef: ElementRef;
  uniqueId: string;
  index: number;
  resourceType = 'Video';
  selectedVideoLib: any;
  i = 0;

  constructor(
    public resourceService: ResourceService,
    private mediaService: MediaService,
    private homeService: HomeService,
    private router: Router,
    public snackBar: MatSnackBar,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    if (this.router.url !== '/addApplication') {
      this.getResources();
    }
  }

  getResources() {
    this.homeService.currentData.pipe(take(1)).subscribe((message: any) => {
      if (message) {
        this.isSave = false;
        this.Obj.applicationDetailId = message.uniqueId;
        this.resourceService
          .getResourceData(`${message.uniqueId}_Video`)
          .subscribe((e: any) => {
           console.log('video lib res ::', e);
           if (e.data.length == 0) {
            this.isSave = true;
          } else {
            this.isSave = false;
            this.videoObj = e.data;
            for (let i = 0; i < this.videoObj.length; i++) {
              this.videoObj[i].media.unshift({
                filePath: 'assets/no-image.png'
              });
            }
            
            for (let i = 0; i < this.videoObj.length; i++) {
              this.videoObj[i].index = i;
            }
            this.i = this.videoObj.length;
          } 
        });
      }
    });
  }

  addVideoLib() {
    this.hideSaveBtn = true;
    this.isAdd = true;
    this.addMedia = true;
    this.title = '';
    this.files = [{ filePath: 'assets/no-image.png' }];
  }

  addVideoFiles() {
    const queryResult: ElementRef[] = this.resourceVideoFileRef['_results'];
    this.selectedInputRef = queryResult[0];
    this.selectedInputRef.nativeElement.click();
  }

  uploadTechFile(file: any) {
    const queryResult: ElementRef[] = this.resourceVideoFileRef['_results'];

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
  }
  
  handleRendererChange = (ev: any) => {
    // dispose the event after file upload is done
    if (!this.uniqueId) {
      this.upload('addVideoFile');
    } else {
      this.upload('editVideoFile', this.uniqueId);
    }
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
        const newvideoObj = { ...this.videoObj };

        this.mediaService
          .updateMedia(formData, fileId)
          .pipe(take(1))
          .subscribe((res: any) => {
            this.sharedService.showLoader = false;
            for (let i = 0; i < newvideoObj.length; i++) {
              if (newvideoObj.files[i].uniqueId === fileId) {
                newvideoObj.media[i].filePath = res.filePath;
                this.videoObj = newvideoObj;
                break;
              }
            }
            for (let i = 0; i < this.files.length; i++) {
              if (this.files[i].uniqueId === fileId) {
                console.log('match found');
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
            console.log('upload res ::',  this.files);

            for (let i = 0; i < this.videoObj.length; i++) {
              if (this.videoObj[i].index === this.index) {
                this.videoObj[i].media = this.files;
                this.videoObj[i].title = this.title;
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

  saveResource() {
    this.sharedService.showLoader = true;
    this.homeService.currentData.pipe(take(1)).subscribe((message: any) => {
      if (message) {
        this.Obj.applicationDetailId = message.uniqueId;
        console.log('messsage id ::',  this.Obj.applicationDetailId);
        
      }
    });
    let obj = [...this.videoObj];
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
    const reqObj = {
      applicationDetailId: this.Obj.applicationDetailId,
      data: obj
    }
    console.log('reqobj ::',  reqObj);
    this.resourceService
      .saveResourceData(reqObj)
      .pipe(take(1))
      .subscribe((e: any) => {
        this.homeService.changeMessage({ uniqueId: e.applicationUniqueId });
        this.sharedService.showLoader = false;
        this.openSnackBar('Video Library Saved');
      },(error: any) =>{
        console.log(error);
        if(obj[0].media && obj[0].media[0].filePath !== 'assets/no-image.png') {
          for (let i = 0; i < this.videoObj.length; i++) {
            this.videoObj[i].media.unshift({
              filePath: 'assets/no-image.png'
            });
          }
         }
      this.sharedService.showLoader = false;
      });
  }

  openSnackBar(action: string, message?: string) {
    this.snackBar.open(action, message, { duration: 3000 });
  }


  saveVideo(name: string) {
    this.hideSaveBtn = false;
    this.isAdd = false;
    this.addMedia = false;
    this.updateMedia = false;
    this.videoObj.push({
      status: false,
      title: this.title,
      index: this.i,
      resourceType: this.resourceType,
      media: this.files
    });
    this.i++;     
  }

  updateVideo(name: string) {
    this.updateMedia = false;
   
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


  showMedia(videoData: any) {
    console.log('card clicked ::', videoData);
    this.isAdd = true;
    this.updateMedia = true;
    this.hideSaveBtn = true;
    this.addMedia = false;
    if(videoData.media && videoData.media[0].filePath !== 'assets/no-image.png') {
        videoData.media.unshift({
          filePath: 'assets/no-image.png'
        });
     }
    this.files = videoData.media;
    this.selectedVideoLib = videoData.index;
  }

  editTitle(name: string, index: number) {
    this.isAdd = true;
    this.isEdit = true;
    this.index = index;
    this.title = name;
    this.files = this.videoObj[index].media;
  }

  removeTechFile(file: any) {
    const newFiles = [...this.files];
    let updatedFiles: any[] = [];
    if (this.videoObj[this.selectedVideoLib]) {
      if (this.videoObj[this.selectedVideoLib].media[0].filePath === 'assets/no-image.png') {
        for (let i = 1; i < this.videoObj[this.selectedVideoLib].media.length; i++) {
          if (this.videoObj[this.selectedVideoLib].media[i].uniqueId === file.uniqueId) {
            this.videoObj[this.selectedVideoLib].media.splice(i, 1);
            updatedFiles = this.videoObj[this.selectedVideoLib].media;
            this.Obj.data = updatedFiles;
          } 
          this.deleteVideo(file.uniqueId);
        }
      }
    }
  }

  deleteVideo(id: any) {
    this.sharedService.showLoader = true;
    if (id) {
      this.mediaService
        .removeTechFiles(id)
        .pipe(take(1))
        .subscribe((res: any) => {
          this.sharedService.showLoader = false;
        },(error: any) =>{
          console.log(error);
        this.sharedService.showLoader = false;
        });
    }
  }

  updateResource() {
    this.sharedService.showLoader = true;
    this.homeService.currentData.pipe(take(1)).subscribe((message: any) => {
      if (message) {
        this.Obj.applicationDetailId = message.uniqueId;
      }
    });
    this.addMedia = false;
    let obj = [...this.videoObj];
    if(obj[0].media && obj[0].media[0].filePath === 'assets/no-image.png') {
    obj = obj.map((el: any) => {
      el.media.shift();
      return {
        ...el
      }
    });
  }
    // this.Obj.data = obj;
    this.Obj.applicationDetailId = this.Obj.applicationDetailId;
    const reqObj = {
      applicationDetailId:this.Obj.applicationDetailId,
      data: obj
    }
    this.resourceService
      .updataResourceData(reqObj)
      .pipe(take(1))
      .subscribe((e: any) => {
        this.homeService.changeMessage({ uniqueId: e.applicationUniqueId });
        this.sharedService.showLoader = false;
        this.openSnackBar('Video Library Updated');
      },(error: any) =>{
        console.log(error);
      this.sharedService.showLoader = false;
      });
      this.isAdd = false;
      this.addMedia = false;
  }

  removeVideoLib(videoLib: any) {
    this.sharedService.showLoader = true;
    for(let i=0; i<this.videoObj.length ; i++){
      if(this.videoObj[i].uniqueId === videoLib.uniqueId){
        if(this.videoObj[i].media.length){
          for(let j=0; j<this.videoObj[i].media.length; j++){
            this.videoObj[i].media.splice(this.videoObj[i].media.length-1);
         }
       }
       this.videoObj.splice(i,1);
      }
    }
    this.deleteDefaultImg = false;
    const id = this.Obj.applicationDetailId+'_'+videoLib.uniqueId;
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
