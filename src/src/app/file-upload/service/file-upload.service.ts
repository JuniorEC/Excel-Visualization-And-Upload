import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';

@Injectable()
export class FileUploadService {
  
  public API = '/api/file';
  public UPLOAD_API = this.API + '/upload';
  public DOWNLOAD_API = this.API + '/download';

  constructor(private http:HttpClient) { }

  downloadFile(file:String){
    var body = {filename:file};
    return this.http.post(this.DOWNLOAD_API,body,{
        responseType : 'blob',
        headers:new HttpHeaders().append('Content-Type','application/json')
    });
}

  uploadFile(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
 
    formdata.append('file', file);
 
    const req = new HttpRequest('POST', this.UPLOAD_API, formdata, {reportProgress: true, responseType: 'text'})
 
    return this.http.request(req);
  }
  
}
