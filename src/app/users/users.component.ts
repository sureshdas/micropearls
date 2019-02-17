import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

import { MatTableDataSource } from '@angular/material';
import { UserService } from '@app/users/user.service';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { IUser } from './users';
import { SharedService } from '@app/shared/shared.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // selectedUser: User;
  // dataSource: UserDataSource;

  // public userData: any = [
  //   {
  //     "username": "1",
  //     "firstname": "krishna",
  //     "lastname": "H",
  //     "emailid": "krishna678.kh@gmail.com",
  //     "conphone": 9886315172,
  //     "role": "engineer",
  //     "status": "",
  //     "action": "move"
  //   },
  //   {
  //     "username": "2",
  //     "firstname": "krishna",
  //     "lastname": "H",
  //     "emailid": "krishna678.kh@gmail.com",
  //     "conphone": 9886315172,
  //     "role": "engineer",
  //     "status": "",
  //     "action": "move"
  //   }
  // ]
  dataSource = new MatTableDataSource();
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: any = [
    'userName',
    'firstName',
    'lastName',
    'email',
    'contact',
    'roles',
    'status',
    'action'
  ];
  constructor(private userService: UserService, private router: Router,public sharedService: SharedService) {}
  ngOnInit() {
    this.getAllUsers();
  
  }
  getAllUsers(){
    this.sharedService.showLoader = true;
    this.userService.getUsers().subscribe(data => {
      console.log(data);
      this.sharedService.showLoader = false;
      this.dataSource.data = data;
    });
  }
  editUser(rowData: any) {
    console.log(rowData);
    this.userService.rowObj = rowData;
    console.log(this.userService.rowObj);
    // this.selectedUser = rowData;
    this.router.navigate(['/editUser']);
  }
  // getAllUserData() {
  //   this.userService.getUsers().subscribe((response: any) => {
  //     // const newres = e.data.map(prop => {
  //     //   return {
  //     //     ...prop,
  //     //     name: prop.club_name
  //     //   };
  //     // });
  //     this.dataSource.data = response;
  //     console.log(this.dataSource.data);
  //   });
  //   // .catch((err: any) => {
  //   //   console.log(err);
  //   // });
  // }
  // editUser(rowData: any) {
  //   // this.homeService
  //   // .editApplication(rowData.uniqueId)
  //   // .subscribe((e: any) => {
  //   this.userService.changeMessage(rowData.uniqueId);
  //   console.log('change data' + rowData.uniqueId);

  //   this.router.navigate(['/editUser']);
  //   // })
  //   // .catch((err: any) => {
  //   //   console.log(err);
  //   // });
  // }


  
  // deleteUser(rowData: any) {
  //   console.log('delete user ::', rowData);

  //   this.userService.deleteUser(rowData._id).subscribe((e: any) => {});
  //   // .catch((err: any) => {
  //   //   console.log(err);
  //   // });
  // }
}
