import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../service/file-upload.service';
import { FileUploader } from 'ng2-file-upload';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {saveAs} from 'file-saver';
import { NgClass, NgStyle} from '@angular/common';

const uri = 'https://localhost:4200/api/file/upload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [FileUploadService]
})
export class FileUploadComponent implements OnInit {
  
  uploader:FileUploader = new FileUploader({url:uri});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  attachmentList:any = [];

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private fileService: FileUploadService) {
      this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
        console.log(item);
        console.log(response);
        console.log(this.fileService);
        this.attachmentList.push(JSON.parse(response));
      }
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  download(index){
      var filename = this.attachmentList[index].uploadname;

      this.fileService.downloadFile(filename)
      .subscribe(
          data => saveAs(data, filename),
          error => console.error(error)
      );
  }

  upload() {
    this.progress.percentage = 0;
 
    this.currentFileUpload = this.selectedFiles.item(0)
    this.fileService.uploadFile(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
    this.selectedFiles = undefined;
    }

  ngOnInit() {
  }

  public fileOverBase(e:any):void {
    console.log(e);
    
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    console.log(e);
    this.hasAnotherDropZoneOver = e;
  }

}
