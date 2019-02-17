import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { HomeComponent } from './application.component';
import { Shell } from '@app/shell/shell.service';
import { TipsPearlComponent } from './/tips-pearl/tips-pearl.component';
import { AddApplicationComponent } from './add-application/add-application.component';
const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/addApplication', pathMatch: 'full' },
    {
      path: 'home',
      component: HomeComponent,
      data: { title: extract('Home/Application') }
    },
    {
      path: 'addApplication',
      component: AddApplicationComponent,
      data: { title: extract('Add-Home/Application') }
    },
    {
      path: 'editApplication',
      component: AddApplicationComponent,
      data: { title: extract('Edit-Home/Application') }
    },
    {
      path: 'editpearls',
      component: TipsPearlComponent,
      data: { title: extract('Edit-Home/Application') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ApplicationRoutingModule {}


// { path: '', redirectTo: '/home', pathMatch: 'full' },
//     {
//       path: 'home',
//       component: HomeComponent,
//       data: { title: extract('Home/Application') }
//     },
//     {
//       path: 'addApplication',
//       component: AddApplicationComponent,
//       data: { title: extract('Add-Home/Application') }
//     },
//     {
//       path: 'editApplication',
//       component: AddApplicationComponent,
//       data: { title: extract('Edit-Home/Application') }
//     },
//     {
//       path: 'editpearls',
//       component: TipsPearlComponent,
//       data: { title: extract('Edit-Home/Application') }
//     }