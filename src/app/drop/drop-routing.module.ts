import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { DropComponent } from './drop.component';
const routes: Routes = [
  Shell.childRoutes([{ path: 'drop', component: DropComponent }])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DropRoutingModule {}
