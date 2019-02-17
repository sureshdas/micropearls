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
// import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
import { FileSelectDirective } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'app-resource-presentation',
  templateUrl: './resource-presentation.component.html',
  styleUrls: ['./resource-presentation.component.scss']
})
export class ResourcePresentationComponent implements OnInit {
  @ViewChildren('techniqueFileRef') techniqueFileRef: QueryList<ElementRef>;
  files: any[] = [{filePath:'assets/no-image.png' }];
  isAdd: Boolean = false;
  isEdit: Boolean = false;
  isSave: Boolean = false;
  resourceType = 'Presentation';
  editTechniqueOnHover: Boolean = false;
  selectedInputRef: ElementRef;
  uniqueId: string;
  applicationId = '';
  // url: SafeResourceUrl;
 

  constructor(
    public resourceService: ResourceService,
    private mediaService: MediaService,
    private homeService: HomeService,
    private router: Router,
   private sanitizer: DomSanitizer,
   public snackBar: MatSnackBar,
   public sharedService: SharedService)
   {
    //  for(let i=0;i<this.files.length;i++){
    // this.url= sanitizer.bypassSecurityTrustResourceUrl(this.files[i].filePath);
    //  }
    }
  presentationObj: any = {
    media:[],
    resourceType:this.resourceType,
  }
  i = 0;
  title = '';
  imageData: Boolean;
  index: number;
  Obj: any = {
    applicationDetailId: '',
    data: [],
  };

  ngOnInit() {

    if (this.router.url !== '/addApplication') {
      this.getResources();
    }
    // this.homeService.currentData.pipe(take(1)).subscribe((message: any) => {
    //   if (message) {
    //     this.Obj.applicationDetailId = message.uniqueId;
    //     this.resourceService
    //       .getResourceData(`${message.uniqueId}_Documents`)
    //       .subscribe((e: any) => {
    //         console.log("document:::",e)
    //         this.documentsObj=e.data;

    //           // this.videoObj = e.data;
    //         // for (let i = 0; i < this.videoObj.length; i++) {
    //           //   this.videoObj.obj[i].status = false;
    //           // }
    //          // console.log("videoObj of resource", this.videoObj);
    //       });
    //   }
    // });
  }
 
  getResources() {
    this.homeService.currentData.pipe(take(1)).subscribe((message: any) => {
      if (message) {
        this.isSave = false;
        this.Obj.applicationDetailId = message.uniqueId;
        this.resourceService
          .getResourceData(`${message.uniqueId}_Presentation`)
          .subscribe((e: any) => {
           console.log('presentation lib res ::', e);
           if (e.data.length == 0) {
            this.isSave = true;
          } else {
            this.isSave = false;
            console.log("data.media",e.data[0].media);
            this.presentationObj.media= e.data[0].media;
            console.log("data.resourceType",e.data[0].resourceType)
            this.presentationObj.resourceType=e.data[0].resourceType;
            console.log("getting presentationObj",this.presentationObj);
            this.presentationObj.media.unshift({
              filePath: 'assets/no-image.png'
            });
            this.files=this.presentationObj.media;
          } 
        });
      }
    });
  }
  // handleFileImageUpload(e: any) {
  //   console.log('image', e);
  //   const files = e.target.files;
  //   const f = files[0];
  //   const reader = new FileReader();
  //   reader.onload = (file => {
  //     return (res: any) => {
  //       this.mediaService
  //         .uploadMedia(res.currentTarget.result)
  //         .pipe(take(1))
  //         .subscribe((e: any) => {
  //           console.log('result of resource image  ::', e);
  //           // const arr = [];
  //           this.files.push(e);
  //           console.log('Array:::', this.files);
  //           this.documentsObj = this.files;
  //         });
  //       if (res.currentTarget.result) {
  //         this.imageData = true;
  //       } else {
  //         this.imageData = false;
  //       }
  //     };
  //   })(f);
  //   reader.readAsDataURL(f);
  // }


  addFiles() {
    const queryResult: ElementRef[] = this.techniqueFileRef['_results'];
    this.selectedInputRef = queryResult[0];
    this.selectedInputRef.nativeElement.click();
  }
  uploadFiles(file: any) {
    console.log('file upload', file);
    const queryResult: ElementRef[] = this.techniqueFileRef['_results'];
console.log("queryResult",queryResult);
    for (let i = 0; i < queryResult.length; i++) {
      if (queryResult[i].nativeElement.title === file.uniqueId) {
        this.selectedInputRef = queryResult[i];
        console.log("this.selectedInputRef",this.selectedInputRef);
        this.selectedInputRef.nativeElement.click();
        break;
      }
    }
  }
  triggerTechFileUpload(event: any, uniqueId: string) {
    console.log('test', this.selectedInputRef.nativeElement.id);
    console.log('event', event);
    console.log("this.uniqueId",uniqueId);
    this.uniqueId = uniqueId;
    
    document
      .getElementById(this.selectedInputRef.nativeElement.id)
      // .addEventListener('change',  (evt) => this.handleRendererChange(evt));
     .addEventListener('change', this.handleRendererChange);
    // this.renderer.listen(this.selectedInputRef.nativeElement, 'change', this.handleRendererChange);
  }
  handleRendererChange = (ev: any) => {
    console.log('unique --->', this.uniqueId);
    // dispose the event after file upload is done
    if (!this.uniqueId) {
      // this.handleTechFileUpload(ev);
      this.upload('addPresentationFile');
    } else {
      // this.updateTechFile(ev, this.uniqueId);
      this.upload('editPresentationFile', this.uniqueId);
    }
  };
  upload(type: string, fileId?: string) {
    let inputElementRef;
console.log("file id",fileId);
    inputElementRef = this.selectedInputRef.nativeElement;
    console.log("inputElementRef ",inputElementRef );
    // get the total amount of file attached to the file input
    const fileCount = inputElementRef.files.length;
    // create a new formdata instance
    console.log("fileCount",fileCount);
    const formData = new FormData();
    // check if filecount is greater than 0, to be sure file was selected
    if (fileCount > 0) {
      formData.append('pic', inputElementRef.files.item(0));
      console.log("formData",formData);
      if (fileId) {
        const newPresentationObj = { ...this.presentationObj };
        this.mediaService
          .updateMedia(formData, fileId)
          .pipe(take(1))
          .subscribe((res: any) => {
            console.log("result",res);
            for (let i = 0; i < newPresentationObj.length; i++) {
              if (newPresentationObj.files[i].uniqueId === fileId) {
                newPresentationObj.media[i].filePath = res.filePath;
                this.presentationObj = newPresentationObj;
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
          });
      } else {
        this.mediaService
          .uploadMedia(formData)
          .pipe(take(1))
          .subscribe((res: any) => {
            // console.log('result of technique image  ::', res);
            this.files.push({
              ...res,
              index: this.files.length,
            // index will be used while updating or removing files
            });
            // this.presentationObj.media=[...this.files];
            
            // for(let i=0;i<this.files.length;i++){
            //   this.presentationObj.media[i]= this.files[i];
            // }
            // for (let i = 0; i < this.documentsObj.length; i++) {
            //   if (this.documentsObj[i].index === this.index) {
            //     this.documentsObj[i].media = this.files;
            //     // this.videoObj[i].title = this.title;
            //     break;
            //   }
            // }
            // dispose the renderer change listener
            document
              .getElementById(this.selectedInputRef.nativeElement.id)
              .removeEventListener('change', this.handleRendererChange);
          });
      }
    }
  }

  documentPreview(pdf: any) {
    console.log('doc preview clicked');
    console.log(pdf);
    this.sharedService.showLoader = true;
    if (pdf) {
      this.mediaService
        .mediaDialog(pdf)
        .pipe(take(1))
        .subscribe(
          (response: any) => {
            console.log('pdf preview res',response);
            this.sharedService.showLoader = false;
          },
          (error: any) => 
          {
            this.sharedService.showLoader = false;
            console.log("error::",error);
          }
        );
    }
  }
  updateResource() {
    this.sharedService.showLoader = true;
    console.log("files",this.files);
    let k=0;
    let array:any=[];
    for(let i=1;i<this.files.length;i++){
   array[k]=this.files[i];
   k++;
    }
    console.log("array",array);
    this.presentationObj.media=[...array];
    let obj = [{...this.presentationObj}];
    this.homeService.currentData.pipe(take(1)).subscribe((message: any) => {
      if (message) {
        this.Obj.applicationDetailId = message.uniqueId;
        console.log('uniqueid ::', this.Obj.applicationUniqueId);
      }
    });
    
    // if(obj[0].media && obj[0].media[0].filePath === 'assets/no-image.png') {
    //   obj = obj.map((el: any) => {
    //     el.media.shift();
    //     return {
    //       ...el
    //     }
    //   });
    // }
    this.Obj.data = obj;
    this.Obj.applicationDetailId = this.Obj.applicationDetailId;
    console.log('test:::', this.Obj);
    this.resourceService
      .updataResourceData(this.Obj)
      .pipe(take(1))
      .subscribe((e: any) => {
        this.homeService.changeMessage({ uniqueId: e.applicationUniqueId });
                console.log("application id",e.applicationUniqueId);
        this.sharedService.showLoader =false;
        this.openSnackBar('Presentation Library Updated'); 
      });
    
  }
  removeFiles(file: any) {
    const newFiles = [...this.files];
    let updatedFiles: any[] = [];
      if (this.presentationObj.media[0].filePath === 'assets/no-image.png') {
        for (let i = 1; i < this.presentationObj.media.length; i++) {
          if (this.presentationObj.media[i].uniqueId === file.uniqueId) {
            this.presentationObj.media.splice(i, 1);
            updatedFiles = this.presentationObj.media;
            this.Obj.data = updatedFiles;
          } 
        }
    }
  }

  saveResource() {
    this.sharedService.showLoader = true;
    let k=0;
    for(let i=1;i<this.files.length;i++){
      this.presentationObj.media[k]=this.files[i];
      k++;
    }
    this.homeService.currentData.pipe(take(1)).subscribe((message: any) => {
      if (message) {
        this.Obj.applicationDetailId = message.uniqueId;
      }
    });
    let obj:any=[{
        media:[],
        resourceType:'',
    }];
    obj[0].media=this.presentationObj.media;
    obj[0].resourceType=this.presentationObj.resourceType;
    console.log("this.presentationObj:::",this.presentationObj);
    // let obj =[{...this.presentationObj}];
    
    // if(obj[0].media && obj[0].media[0].filePath === 'assets/no-image.png') {
    //   obj = obj.map((el: any) => {
    //     el.media.shift();
    //     return {
    //       ...el
    //     }
    //   });
    // }
  
    // if(obj[0].media && obj[0].media[0].filePath !== 'assets/no-image.png') {
    //     this.documentsObj.media.unshift({
    //       filePath: 'assets/no-image.png'
    //     });
    //  }
   
    console.log("obj",obj);
    this.Obj.data =obj;

    console.log('test:::', this.Obj);
    // let responseObj = JSON.stringify(this.Obj);
    this.resourceService
      .saveResourceData(this.Obj)
      .pipe(take(1))
      .subscribe((e: any) => {
        this.homeService.changeMessage({ uniqueId: e.applicationUniqueId });
        console.log("application id",e.applicationUniqueId);
        this.sharedService.showLoader = false;
        console.log('result of resources ::', e);
        this.openSnackBar('presentation Library Saved');
      });
  }
  openSnackBar(action: string, message?: string) {
    this.snackBar.open(action, message, { duration: 3000 });
  }
}
