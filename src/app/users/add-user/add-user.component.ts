// import { Component, OnInit } from '@angular/core';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { User } from './user';
// import { AddUserService } from './add-user.service';
// import { MatSnackBar } from '@angular/material';
// import { stringify } from '@angular/core/src/util';
// import { Router } from '@angular/router';
// import { UserService } from 'app/users/user.service';

// @Component({
//   selector: 'app-add-user',
//   templateUrl: './add-user.component.html',
//   styleUrls: ['./add-user.component.scss']
// })
// export class AddUserComponent implements OnInit {
//   submitted = false;
//   public id: string;
//   constructor(
//     private addUserService: AddUserService,
//     private userService: UserService,
//     public snackBar: MatSnackBar,
//     private router: Router
//   ) {}

//   // public options= ["optionone","optiontwo","optionthree"] ;
//   userModel = new User('', '', '', '', '', null, '');
//   ngOnInit() {
//     if (this.router.url !== '/addUser') {
//       // this.userService.currentData.subscribe((response: any) => {
//       //   console.log('currentdata::::' + response);
//       //   this.id = response;
//       console.log('helllooo', this.userService.rowObj);
//       const data: any = this.userService.rowObj;
//       console.log('hiii', data.password);
//       this.userModel = data;
//       var _id = data._id;
//       console.log('id*****', _id);
//       //  this.userService.editUser(_id,this.userModel).subscribe((data: any) => {
//       //     console.log('success !', data);
//       //   if (data.status == 500) {
//       //     this.openSnackBar(data.message, '');
//       //   } else {
//       //     this.openSnackBar(data.message, '');
//       //   }
//       // },
//       // error => console.log(' error !', error)
//       //   })
//       // });
//     }
//   }
//   onSubmit() {
//     // console.log(this.userModel)

//     // this.userModel=new User(
//     //   "","","","","",null,""
//     //    );
//     //    this.submitted=false;
//     if (this.router.url === '/addUser') {
//       this.submitted = true;
//       this.addUserService.adduser(this.userModel).subscribe(
//         (data: any) => {
//           console.log('success !', data);
//           if (data.status == 422) {
//             this.openSnackBar(data.message, '');
//           } else {
//             this.openSnackBar(data.message, '');
//           }
//         },
//         error => console.log(' error !', error)
//       );
//     } else {
//       this.addUserService.updateUser(this.id, this.userModel).subscribe(
//         (data: any) => {
//           console.log('success !', data);
//           if (data.status == 422) {
//             this.openSnackBar(data.message, '');
//           } else {
//             this.openSnackBar(data.message, '');
//           }
//         },
//         error => console.log(' error !', error)
//       );
//     }
//   }
//   openSnackBar(action: string, message?: string) {
//     this.snackBar.open(action, message, {
//       duration: 3000
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from './user';
import { AddUserService } from './add-user.service';
import { MatSnackBar } from '@angular/material';
import { stringify } from '@angular/core/src/util';
import { Router } from '@angular/router';
import { UserService } from 'app/users/user.service';
import { getMatScrollStrategyAlreadyAttachedError } from '@angular/cdk/overlay/typings/scroll/scroll-strategy';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  submitted = false;
  public id: string;
  constructor(
    private addUserService: AddUserService,
    private userService: UserService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}
  role: string;
  roles: any = [];
  // public options= ["optionone","optiontwo","optionthree"] ;
  userModel = new User('', '', '', '', '', null, '');
  ngOnInit() {
    if (this.router.url !== '/addUser') {
      // this.userService.currentData.subscribe((response: any) => {
      // console.log('currentdata::::' + response);
      // this.id = response;
      console.log('helllooo', this.userService.rowObj);
      const data: any = this.userService.rowObj;
      console.log('hiii', data.password);
      this.userModel = data;
      var _id = data._id;
      console.log('id*****', _id);
      // this.userService.editUser(_id,this.userModel).subscribe((data: any) => {
      // console.log('success !', data);
      // if (data.status == 500) {
      // this.openSnackBar(data.message, '');
      // } else {
      // this.openSnackBar(data.message, '');
      // }
      // },
      // error => console.log(' error !', error)
      // })
      // });
    }
    this.addUserService.getRolesData().subscribe((e: any) => {
      this.roles = e;
      // console.log(this.roles);
      console.log('this.roles:::', this.roles);
    });
  }

  selectedRole(event: any) {
    console.log('event+++++', event.value);
    this.userModel.roles = event.value;
  }
  onSubmit() {
    console.log(this.role);
    // console.log(this.userModel)

    // this.userModel=new User(
    // "","","","","",null,""
    // );
    // this.submitted=false;
    if (this.router.url === '/addUser') {
      this.submitted = true;
      this.addUserService.adduser(this.userModel).subscribe(
        (data: any) => {
          console.log('success !', data);
          if (data.status == 422) {
            this.openSnackBar(data.message, '');
          } else {
            this.openSnackBar(data.message, '');
          }
        },
        error => console.log(' error !', error)
      );
    } else {
      this.addUserService.updateUser(this.userModel).subscribe(
        (data: any) => {
          console.log('success !', data);
          if (data.status == 422) {
            this.openSnackBar(data.message, '');
          } else {
            this.openSnackBar(data.message, '');
          }
        },
        error => console.log(' error !', error)
      );
    }
  }
  openSnackBar(action: string, message?: string) {
    this.snackBar.open(action, message, {
      duration: 3000
    });
  }
}
