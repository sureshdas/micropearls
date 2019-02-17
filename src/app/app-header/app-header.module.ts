import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppHeaderRoutingModule } from './app-header-routing.module';
import { AppHeaderComponent } from './app-header.component';

@NgModule({
  declarations: [AppHeaderComponent],
  imports: [CommonModule, AppHeaderRoutingModule]
})
export class AppHeaderModule {}
