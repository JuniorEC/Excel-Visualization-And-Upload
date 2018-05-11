import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadCenterComponent } from './file-upload-center/file-upload-center.component';
import { FileUploadComponent } from './pages/file-upload/file-upload.component';
import { FileUploadRoutingModule } from './file-upload-routing.module';
import { FileUploadService } from './service/file-upload.service';
import { FileVisualizeComponent } from './pages/file-visualize/file-visualize.component';
import { FileUtilComponent } from './pages/file-util/file-util.component';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import { Ng2FileDropModule } from 'ng2-file-drop';
import {FileUploadModule} from "ng2-file-upload";
import * as XLSX from 'xlsx';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FileUploadRoutingModule,
    Ng2FileDropModule,
    FormsModule,
    HttpModule,
    FileUploadModule
  ],
  declarations: [
    FileUploadCenterComponent,
    FileUploadComponent,
    FileVisualizeComponent,
    FileUtilComponent
  ],
  providers: [FileUploadService,],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FileUploadsModule { }
