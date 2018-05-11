import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadCenterComponent } from './file-upload-center/file-upload-center.component';
import { FileUploadComponent } from './pages/file-upload/file-upload.component';
import { FileVisualizeComponent } from './pages/file-visualize/file-visualize.component';

const fileRoutes: Routes = [
  { path:'', component: FileUploadCenterComponent, children: [
    { path:'', component: FileUploadComponent },
    { path:'visualize', component: FileVisualizeComponent },
    
  ] },
  
]

@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(fileRoutes),
  ],
  declarations: []
})
export class FileUploadRoutingModule { }
