import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { ApplicationModule } from './application/application.module';
import { ShellModule } from './shell/shell.module';
import { AboutModule } from '@app/users/users.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TableModule } from './table/table.module';
import { AppHeaderModule } from './app-header/app-header.module';
import { DropModule } from './drop/drop.module';
import { DialogComponent } from './shared/dialog/dialog.component';
import { AppCommonModule } from './common/common-module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MediaDialogComponent } from './media-dialog/media-dialog.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

// import FileHoverDirective from './common/file-directive';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppHeaderModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    ShellModule,
    ApplicationModule,
    AboutModule,
    LoginModule,
    TableModule,
    DropModule,
    AppRoutingModule,
    AppCommonModule,
    PdfViewerModule
        // must be imported as the last module as it contains the fallback route
  ],
  entryComponents: [DialogComponent, MediaDialogComponent],
  declarations: [AppComponent],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
