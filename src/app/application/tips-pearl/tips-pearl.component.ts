import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  ViewChildren,
  QueryList,
  Input
} from '@angular/core';
import { take } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { SharedService} from '@app/shared/shared.service';
import { MediaService } from '@app/media.service';
import { HomeService } from '../application.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { editorConfig } from '@app/utils/utils';

@Component({
  selector: 'app-tips-pearl',
  templateUrl: './tips-pearl.component.html',
  styleUrls: ['./tips-pearl.component.scss']
})
export class TipsPearlComponent implements OnInit {
  @ViewChild('tipsPearlsImageRef') tipsPearlsImageRef: ElementRef;
  @ViewChildren('techniqueFileRef') techniqueFileRef: QueryList<ElementRef>;
  @Input()
 MatExpansionPanelState = 'expanded';
 EXPANSION_PANEL_ANIMATION_TIMING: "225ms cubic-bezier(0.4,0.0,0.2,1)";
 panelOpenState = true;
  // declare a property called fileuploader and assign it to an instance
  // of a new fileUploader.
  // pass in the url to be uploaded to, and pass the itemAlias,
  // which would be the name of file input when sending the post request
  public uploader: FileUploader = new FileUploader({
    url: '',
    itemAlias: 'pic'
  });
 
  isSave: Boolean;
  openTipsCard: Boolean = false;
  selectedTechnique: Number = 0;
  selectedInputRef: ElementRef;
  techName: string;
  addTechniqueExp: Boolean;
  editTechniqueOnHover: Boolean = false;
  // for capturing selected uniqueId for updating and removing files
  uniqueId: string;
  selectedTechniqueObj: any;
  fileObj: any = {
    fileId: '',
    tipsPearlsImage: ''
  };
  techniqueObj: any = {
    applicationDetailId: '',
    tipsPearlsName: '',
    tipsPearlsImage: { filePath: 'assets/no-image.png' },
    description: '',
    techniques: [
      {
        status: true,
        index: 0,
        techniqueName: '',
        description: '',
        order: '',
        files: [
          {
            filePath: 'assets/no-image.png',
            mediaType: 'img',
            title: ''
          }
        ]
      }
    ]
  };
  i = 0;
  techNamePlaceholder: 'Enter technique name';
  status: Boolean;
  tipsPearlImageId: any;
  // keep this object always at start of the array.
  files: any[] = [{ filePath: 'assets/no-image.png', mediaType: 'img' }];
  // for assigning newFiles value to files by making a copy of it to avoid mutability of newFiles
  newFiles: any[] = [{ filePath: 'assets/no-image.png', mediaType: 'img' }];
  techniquesDescription: string = '';
  saveOneTechnique: Boolean;
  editorConfig: any = editorConfig;

  // for checking technique edit mode
  shouldTechniqueEdit: Boolean = false;

  // to hide technique list on save

  constructor(
    private homeService: HomeService,
    private router: Router,
    // is used in the html template
    private sanitizer: DomSanitizer,
    public snackBar: MatSnackBar,
    private renderer: Renderer2,
    private mediaService: MediaService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    // override the onAfterAddingFile property of the uploader so it
    // doesn't authenticate with credentials.
    this.uploader.onAfterAddingFile = file => (file.withCredentials = false);
    // override the onCompleteItem property of the uploader so we are
    // able to deal with the server response.
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {};

    // this.techniqueObj.techniques[0].description = this.techName;
    // this.techniqueObj.techniques[0].techniqueName = this.techniquesDescription;
    this.homeService.currentData.pipe(take(1)).subscribe((message: any) => {
      // console.log('message', message);
      if (message) {
        this.techniqueObj.applicationDetailId = message.uniqueId;
      }
      if (this.router.url !== '/addApplication') {
        this.isSave = true;
        this.getTipsPearls();
      }
    });
  }

  addTechnique() {
    // for showing done and cancel options
    this.editTechniqueOnHover = true;
    this.addTechniqueExp = true;
    // check the length of techniques and assign value to i
    this.i = this.techniqueObj.techniques.length - 1;
    this.i++;
    this.selectedTechnique = this.i;
    for (let i = 0; i < this.techniqueObj.techniques.length; i++) {
      this.techniqueObj.techniques[i].status = false;
    }
    // reset techiniqueDescription and files
    // this.techniquesDescription = '';
    // this.techName = '';

    // keep this object always at start of the array.
    this.files = [...this.newFiles];

    this.techniqueObj.techniques.push({
      index: this.i,
      // techniqueName: this.techName,
      techniqueName: this.techniqueObj.techniques.techName,
      status: true,
      // description: this.techniquesDescription,
      description: this.techniqueObj.techniques.description,
      files: this.files
    });
  }

  getTipsPearls() {
   this.addTechniqueExp = true;
    this.homeService
      .getTipsPearls(this.techniqueObj.applicationDetailId)
      .pipe(take(1))
      .subscribe(res => {
        console.log('tips pearl data ::', res);
        if (!res) {
          // for the template to handle save and edit mode
          this.isSave = false;
          // when no tips pearls data, display icons for adding new technique
          this.editTechniqueOnHover = true;
        }

        if (res) {
          // if data in response then shouldTechniqueEdit should be true in the template to show edit icon for each technique
          this.shouldTechniqueEdit = true;
          if (res.tipsPearlsImage.uniqueId) {
            this.tipsPearlImageId = res.tipsPearlsImage.uniqueId;
          }
          res.techniques = res.techniques.map((el: any, index: number) => {
            return {
              ...el,
              status: false,
              editMode: index === 0 ? true : false,
              index
            };
          });
          this.techniqueObj = res;
          // adding index to use it at the time of updating and removing each image
          res.techniques.forEach((technique: any) => {
            technique.files.unshift({
              ...this.files[0]
            })
            technique.files = technique.files.map((el: any, i: number) => {
              return {
                ...el,
                index: i
              };
            });
          });
          // this.files = this.files.concat(res.techniques[0].files);
        }
      });
  }

 //editing tips and pearls image
  handleTipsPearlsImageUpload(e: any) {
    this.upload('tipsPearls');
  }

  saveTips() {
    this.sharedService.showLoader = true;
    this.homeService.currentData.pipe(take(1)).subscribe((message: any) => {
      this.techniqueObj.applicationDetailId = message.uniqueId;
      this.techniqueObj.techniques = this.techniqueObj.techniques.filter(
        (el: any) => el.techniqueName !== ''
      );
      for (let i = 0; i < this.techniqueObj.techniques.length; i++) {
        this.techniqueObj.techniques[i].order = i+1;
      }
      this.homeService
        .saveTipsPearls(this.techniqueObj)
        .pipe(take(1))
        .subscribe((e: any) => {
          this.sharedService.showLoader = false;
          this.openSnackBar('Tips and Pearls Saved.');
          this.homeService.changeMessage({ uniqueId: e.applicationUniqueId });
        },
        (error: any) =>{
          console.log(error);
        this.sharedService.showLoader = false;
        });
    });
  }

  editpearls(rowData: any) {
    this.homeService.changeMessage(rowData);
    this.router.navigate(['/editpearls']);
  }

  updateTips() {
    let technique;
    for (let i = 0; i < this.techniqueObj.techniques.length; i++) {
      if (this.techniqueObj.techniques[i].index === this.selectedTechnique) {
        technique = this.techniqueObj.techniques[i];
      }
    }
    for (let i = 0; i < this.techniqueObj.techniques.length; i++) {
      this.techniqueObj.techniques[i].order = i+1;
    }
    if (technique.techniqueName === '') {
      this.openSnackBar('Technique name required.');
      return;
    }
    if (technique.description === '') {
      this.openSnackBar('Technique description required.');
      return;
    }

    if (!this.shouldTechniqueEdit) {
      for (let i = 0; i < this.techniqueObj.techniques.length; i++) {
        if (this.techniqueObj.techniques[i].files.length === 0) {
          this.openSnackBar('Atleast one media file required per technique.');
          return;
        }
        for (let j = 0; j < this.techniqueObj.techniques[i].files.length; j++) {
          if (this.techniqueObj.techniques[i].files[0].filePath === '') {
            this.openSnackBar('Atleast one media file required per technique.');
            return;
          }
        }
      }

      for (let i = 0; i < this.techniqueObj.techniques.length; i++) {
        this.techniqueObj.techniques[i].status = false;
        this.updateTipsPearls();
      }
    
    } else {
      // status to be set to false to hide input element
      for (let i = 0; i < this.techniqueObj.techniques.length; i++) {
        this.techniqueObj.techniques[i].status = false;
        this.updateTipsPearls();
      }
    }
    // should be set if passes all the condition
    this.editTechniqueOnHover = false;
    this.saveOneTechnique = false;
  }

  updateTipsPearls() {
    this.sharedService.showLoader = true;
    this.homeService.currentData.pipe(take(1)).subscribe((message: any) => {
      if (message) {
        this.techniqueObj.applicationDetailId = message.uniqueId;
      }
    });
    this.editTechniqueOnHover = false;
    this.homeService
      .updateTipsPearlsData(this.techniqueObj)
      .pipe(take(1))
      .subscribe((e: any) => {
        this.sharedService.showLoader = false;
        this.openSnackBar('Tips and Pearls Updated');
        this.homeService.changeMessage({ uniqueId: e.applicationUniqueId });
      },
      (error: any) =>{
        console.log(error);
      this.sharedService.showLoader = false;
      });
  }

  openSnackBar(action: string, message?: string) {
    this.snackBar.open(action, message, { duration: 3000 });
  }

  removeTechnique(technique: any) {
    this.techniqueObj.techniques.splice(technique.index, 1);
    if (technique._id) {
      this.homeService
        .deleteTipsTechnique(technique.uniqueId)
        .pipe(take(1))
        .subscribe((res: any) => {
        });
    }
  }

   cancelEditTechnique() {
    this.editTechniqueOnHover = false;
    this.saveOneTechnique = false;
  }

  doneTechnique() {
    let technique;
    for (let i = 0; i < this.techniqueObj.techniques.length; i++) {
      if (this.techniqueObj.techniques[i].index === this.selectedTechnique) {
        technique = this.techniqueObj.techniques[i];
      }
    }
 
    if (technique.techniqueName === '') {
      this.openSnackBar('Technique name required.');
      return;
    }
    if (technique.description === '') {
      this.openSnackBar('Technique description required.');
      return;
    }

    if (!this.shouldTechniqueEdit) {
      for (let i = 0; i < this.techniqueObj.techniques.length; i++) {
        if (this.techniqueObj.techniques[i].files.length === 0) {
          this.openSnackBar('Atleast one media file required per technique.');
          return;
        }
        for (let j = 0; j < this.techniqueObj.techniques[i].files.length; j++) {
          if (this.techniqueObj.techniques[i].files[0].filePath === '') {
            this.openSnackBar('Atleast one media file required per technique.');
            return;
          }
        }
      }

      for (let i = 0; i < this.techniqueObj.techniques.length; i++) {
        this.techniqueObj.techniques[i].status = false;
      }
      // reset techiniqueDescription and files
      // this.techniquesDescription = '';
      // this.techName = '';
      // this.files = [...this.newFiles];
    } else {
      // status to be set to false to hide input element
      for (let i = 0; i < this.techniqueObj.techniques.length; i++) {
        this.techniqueObj.techniques[i].status = false;
      }
    }
    // should be set if passes all the condition
    this.editTechniqueOnHover = false;

    this.saveOneTechnique = false;
  }

  /** CALLS THE HIDDEN INPUT CLICK EVENT USING REF FOR TIPSANDPEARLS NAME */
  tipsPearlsfileUpload() {
    this.tipsPearlsImageRef.nativeElement.click();
  }

  tipsPearlsfileRemove() {
    if (this.techniqueObj.uniqueId) {
      this.mediaService
        .removeTechFiles(this.techniqueObj.tipsPearlsImage.uniqueId)
        .pipe(take(1))
        .subscribe((res: any) => {
          if (res) {
            this.techniqueObj.tipsPearlsImage = 'assets/no-image.png';
          }
        });
    }
  }

  triggerTipsPearlsImageUpload(event: any) {
    this.renderer.listen(
      this.tipsPearlsImageRef.nativeElement,
      'change',
      (ev: any) => {
        this.handleTipsPearlsImageUpload(ev);
      }
    );
  }

  /**RESPONSIBLE FOR ADDING NEW FILES */
  addTechFile() {
    const queryResult: ElementRef[] = this.techniqueFileRef['_results'];
    this.selectedInputRef = queryResult[0];
    this.selectedInputRef.nativeElement.click();
  }

  /**UPDATES A FILE/ */
  uploadTechFile(file: any) {
    const queryResult: ElementRef[] = this.techniqueFileRef['_results'];
    for (let i = 0; i < queryResult.length; i++) {
      console.log('queryResult', queryResult[i].nativeElement.title);
      if (queryResult[i].nativeElement.title === file.uniqueId) {
        this.selectedInputRef = queryResult[i];
        console.log('selected input ref ::', this.selectedInputRef);
        this.selectedInputRef.nativeElement.click();
        break;
      }
    }
  }

  /**REMOVES A FILE. */
  removeTechFile(file: any) {
    const newFiles = [...this.newFiles];
    let updatedFiles: any[] = [];
    for (let i = 0; i < this.techniqueObj.techniques.length; i++) {
      for (let j = 0; j < this.techniqueObj.techniques[i].files.length; j++) {
      if (file.index === this.techniqueObj.techniques[i].files[j].index) {
        if (
          this.techniqueObj.techniques[i].files[0].filePath ===
          'assets/no-image.png'
        ) {
          this.techniqueObj.techniques[i].files.splice(file.index , 1);
          updatedFiles = this.techniqueObj.techniques[i].files;
        } else {
          this.techniqueObj.techniques[i].files.splice(file.index, 1);
          updatedFiles = newFiles.concat(this.techniqueObj.techniques[i].files);
        }
        // update the index after removing file
        // First object will not get a index key, as it is only used for adding files
        updatedFiles = updatedFiles.map((el, index: number) => {
          return {
            ...el,
            index: index === 0 ? undefined : index - 1
          };
        });
        this.files = updatedFiles;
        if (file.uniqueId) {
          this.mediaService
            .removeTechFiles(file.uniqueId)
            .pipe(take(1))
            .subscribe((res: any) => {
              console.log('deleted files', res);
            });
        }
        break;
      }
    }
    }
  }

  /**TRIGGERS CLICK EVENT OF HIDDEN INPUT ELEMENT.*/
  // NOTE: CLICK EVENT IS CALLED ONCE, BUT NEED TO UNLISTEN THE RENDERER LISTEN FUNCTION
  triggerTechFileUpload(event: any, uniqueId: string) {
    console.log('upload success ::', uniqueId);
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

  // the function which handles the file upload without using a plugin
  upload(type: string, fileId?: string) {
    console.log('on upload ::', type , fileId);
    this.sharedService.showLoader = true;
    let inputElementRef;
    if (type === 'tipsPearls') {
      inputElementRef = this.tipsPearlsImageRef.nativeElement;
    } else {
      inputElementRef = this.selectedInputRef.nativeElement;
    }
    // get the total amount of file attached to the file input
    const fileCount = inputElementRef.files.length;
    // create a new formdata instance
    const formData = new FormData();
    // check if filecount is greater than 0, to be sure file was selected
    if (fileCount > 0) {
      formData.append('pic', inputElementRef.files.item(0));
      // to add tips & pearl media 
      if (type === 'tipsPearls') {
        if (this.tipsPearlImageId) {
          this.mediaService
            .updateMedia(formData, this.tipsPearlImageId)
            .pipe(take(1))
            .subscribe((res: any) => {
              this.sharedService.showLoader = false;
              this.techniqueObj.tipsPearlsImage = res;
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
              this.techniqueObj.tipsPearlsImage = res;
            },(error: any) =>{
              console.log(error);
            this.sharedService.showLoader = false;
            });
        }
      }
       else {
         // to add technique images
        if (fileId) {
          const newTechObj = { ...this.techniqueObj };
          this.mediaService
            .updateMedia(formData, fileId)
            .pipe(take(1))
            .subscribe((res: any) => {
              this.sharedService.showLoader = false;
              for (let i = 0; i < newTechObj.techniques.length; i++) {
                for (let j = 0; j < newTechObj.techniques[i].files.length; j++) {
                  if (newTechObj.techniques[i].files[j].uniqueId === fileId) {
                    newTechObj.techniques[i].files[j].filePath = res.filePath;
                    this.techniqueObj = newTechObj;
                    console.log('new Tech obj::', newTechObj);
                    console.log('technique obj updtaed ::', this.techniqueObj);
                    
                    break;
                  }
                }
              }

              for (let i = 0; i < this.files.length; i++) {
                if (this.files[i].uniqueId === fileId) {
                  this.files[i] = res;
                  break;
                }
              }
            }, (error: any) =>{
              console.log(error);
            this.sharedService.showLoader = false;
            });
        } else {
          console.log('technique upload');
          
          this.mediaService
            .uploadMedia(formData)
            .pipe(take(1))
            .subscribe((res: any) => {
              this.sharedService.showLoader = false;
              this.files.push({
                ...res,
                index: this.files.length // index will be used while updating or removing files
              });

              for (let i = 0; i < this.techniqueObj.techniques.length; i++) {
                if (
                  this.techniqueObj.techniques[i].index ===
                  this.selectedTechnique
                ) {
                  this.techniqueObj.techniques[i].files = this.files;
                  // this.techniqueObj.techniques[
                  //   i
                  // ].description = this.techniquesDescription;
                  // this.techniqueObj.techniques[i].techniqueName = this.techName;
                  break;
                }
              }
              // dispose the renderer change listener
              document
                .getElementById(this.selectedInputRef.nativeElement.id)
                .removeEventListener('change', this.handleRendererChange);
            }, (error: any) =>{
              console.log(error);
            this.sharedService.showLoader = false;
            });
        }
      }
    }
  }

  selectedTech(technique: any) {
    console.log( '::', technique);
    this.selectedTechnique = technique.index;
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

  


}
