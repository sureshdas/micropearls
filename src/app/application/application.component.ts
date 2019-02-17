import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { HomeService } from '@app/application/application.service';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { SharedService } from '@app/shared/shared.service';
import {
  // MatDialog,
  // MatDialogRef,
  // MAT_DIALOG_DATA,
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatTableModule
} from '@angular/material';
import { QuoteService } from './quote.service';
import { PublishService } from './publish.service';
@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  quote: string;
  isDelete: Boolean;
  isLoading: boolean;
  applicationData : any = [];
  dataSource = new MatTableDataSource();
  displayedColumns: any = ['name', 'desc', 'tips', 'active', 'Actions'];
  animal: string;
  name: string;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private quoteService: QuoteService,
    private homeService: HomeService,
    private router: Router,
    public dialog: MatDialog,
    private publishService: PublishService,
    public snackBar: MatSnackBar,
    public sharedService: SharedService
  ) {}

  //   openDialog(): void {
  //     const dialogRef = this.dialog.open(HomeComponent);

  // }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.getAllApplicationData();
    this.isDelete = true;
  }
  getAllApplicationData() {
    this.sharedService.showLoader = true;
    console.log('inside get all application');
    
    this.homeService
      .getAllApplication()
      .pipe(take(1))
      .subscribe((response: any) => {
        console.log('response ::', response);
        this.sharedService.showLoader = false;
    // for(let i = 0; i< response.length; i++){
    //   this.applicationData.push(response[i]);
    //   console.log('application data:: ', this.applicationData);
      
    //   console.log('---->', this.applicationData[i]);
    //     let html = response[i].description;
    //     var oParser = new DOMParser();
    //     var oDOM = oParser.parseFromString(html, 'text/html');
    //     var text = oDOM.body.innerText;
    //     response[i].uniqueId = response[i].uniqueiId;
    //     response[i].description = text;
    //     console.log('text', text);
    //   }
         this.dataSource.data = response;
      }, error => {
        this.sharedService.showLoader = false;
        console.log(error);
      });
  }

  editApplication(rowData: any) {
    console.log('rowData ::', rowData);
    // for(let i=0; i< this.applicationData.length; i++) {
    //   if(this.applicationData[i]._id === rowData._id){
    //     console.log('selected application ::', this.applicationData[i]);
        
    //     this.homeService.changeMessage(this.applicationData[i]);  
    //     this.router.navigate(['/editApplication']);
    //   }
    // }

    this.homeService.changeMessage(rowData);
    // console.log('change data' , rowData.uniqueId);
    this.router.navigate(['/editApplication']);
  }

  editpearls(rowData: any) {
    this.homeService.changeMessage(rowData);

    this.router.navigate(['/editpearls']);
  }

  deleteApplication(rowData: any) {
    // console.log('application data ::', rowData);

    const reqObj = {
      uniqueId: rowData.uniqueId
    };
    this.homeService.deleteApplication(reqObj).subscribe((res: any) => {
      // console.log('delete res ::', res);

      this.getAllApplicationData();
    });
  }

  getStatus(status: boolean) {
    if (status) {
      return 'ACTIVE';
    } else {
      return 'INACTIVE';
    }
  }

  openSnackBar(action: string, message?: string) {
    this.snackBar.open(action, message, { duration: 3000 });
  }


  publish() {
    this.publishService.publishApplication().subscribe((e: any) => {
      this.openSnackBar('Version Updated');
    });
  }
}
