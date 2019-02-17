import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

import { AppHeaderComponent } from './app-header.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'app-header', component: AppHeaderComponent }])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppHeaderRoutingModule {}
