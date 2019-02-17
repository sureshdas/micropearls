import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropRoutingModule } from './drop-routing.module';
import { DropComponent } from './drop.component';

@NgModule({
  declarations: [DropComponent],
  imports: [CommonModule, DropRoutingModule]
})
export class DropModule {}
