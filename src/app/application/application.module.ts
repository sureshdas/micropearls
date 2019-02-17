import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
// import { FileSelectDirective } from 'ng2-file-upload';
import { HttpModule } from '@angular/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ApplicationRoutingModule } from './application-routing.module';
import { HomeComponent } from './application.component';
import { QuoteService } from './quote.service';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { TipsPearlComponent } from './tips-pearl/tips-pearl.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { ResourceComponent } from './resource/resource.component';
import { ResourceVideoComponent } from './resource/resource-video/resource-video.component';
import { ResourcePresentationComponent } from './resource/resource-presentation/resource-presentation.component';
import { ResourceImageComponent } from './resource/resource-image/resource-image.component';
import { ResourceDocumentComponent } from './resource/resource-document/resource-document.component';
import { ResourceClinicalComponent } from './resource/resource-clinical/resource-clinical.component';
import { AddApplicationComponent } from './add-application/add-application.component';
import { AppCommonModule } from '@app/common/common-module';
// import { AddTechniqueComponent } from '@app/application/tips-pearl/add-technique/add-technique.component';
import { MediaDialogComponent } from '../media-dialog/media-dialog.component';
import { editorConfig } from '@app/utils/utils';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    NgxEditorModule,
    ApplicationRoutingModule,
    FormsModule,
    AppCommonModule,
    HttpModule,
    PdfViewerModule,MatExpansionModule
  ],
  declarations: [
    HomeComponent,
    AddApplicationComponent,
    ApplicationDetailsComponent,
    TipsPearlComponent,
    ResourceComponent,
    ResourceVideoComponent,
    ResourcePresentationComponent,
    ResourceImageComponent,
    ResourceDocumentComponent,
    ResourceClinicalComponent,
    MediaDialogComponent,
    // FileSelectDirective
  ],
  providers: [QuoteService]
})
export class ApplicationModule {}
