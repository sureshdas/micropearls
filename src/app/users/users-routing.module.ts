import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { UsersComponent } from '@app/users/users.component';
import { AddApplicationComponent } from '@app/application/add-application/add-application.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'about',
      component: UsersComponent,
      data: { title: extract('Home/User') }
    },
    { path: 'addUser', component: AddUserComponent },
    { path: 'editUser', component: AddUserComponent }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AboutRoutingModule {}
