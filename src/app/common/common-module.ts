import { NgModule } from '@angular/core';
import { FileHoverDirective } from './file-directive';

@NgModule({
  exports: [FileHoverDirective],
  declarations: [FileHoverDirective]
})
export class AppCommonModule {}
