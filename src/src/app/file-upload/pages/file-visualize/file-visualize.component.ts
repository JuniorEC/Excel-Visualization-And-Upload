import { Component, OnInit, EventEmitter, Output, OnDestroy, Input, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Subscription, Subject, Observable } from 'rxjs';
import { UploadResult } from '../file-util/file-util.component';

import * as XLSX from 'xlsx';
import {read, WorkBook} from "xlsx";
import { FileUploader } from 'ng2-file-upload';
import * as canvasDatagrid from 'canvas-datagrid';
const URL = 'http://localhost:4200/visualize';

var myGrid = canvasDatagrid({
  parentNode: document.getElementById('grid'),
  data: []
});

@Component({
  selector: 'app-file-visualize',
  templateUrl: './file-visualize.component.html',
  styleUrls: ['./file-visualize.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileVisualizeComponent implements OnInit, OnDestroy {

  public uploaderContent: BehaviorSubject<string> = new BehaviorSubject('Adicione um arquivo');
  public uploader: FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  private subscription: Subscription;
  private filesSubject: Subject<File>;
  private _uploadedXls: Observable<{ result: string, payload: any }>;

  @Output()
  public uploadedXls: EventEmitter<UploadResult> = new EventEmitter();

  constructor(private rootElement: ViewContainerRef) {
    this.filesSubject = new Subject();
    this._uploadedXls = this.filesSubject.asObservable()
      .switchMap((file: File) => {
        return new Observable<any>((observer) => {
          let reader: FileReader = new FileReader();
          reader.onload = (e) => {
            observer.next((e.target as any).result);
          };

          reader.readAsBinaryString(file);
          console.log(reader);
          
          return () => {
            reader.abort();
          };
        })
        .map((value: string) => {
          return read(value, {type: 'binary'});
        }).map((wb: XLSX.WorkBook) => {
          return wb.SheetNames.map((sheetName: string) => {
            let sheet: XLSX.WorkSheet = wb.Sheets[sheetName];
            console.log(sheet);
            this.doDataGrid(sheet);
            console.log(myGrid);
            
            return sheet;
          });
        }).map((results: Array<any>) => {
          console.log(results);
          return {result: 'success', payload: results};
        })
        .catch(e => Observable.of({result: 'failure', payload: e}));
      });
  }

  ngOnInit() {
    this.subscription = this._uploadedXls.subscribe(this.uploadedXls);
  }

  ngOnDestroy() {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

  public doDataGrid(sheet: XLSX.WorkSheet) {
    var data = XLSX.utils.sheet_to_json(sheet, {header:1});
    console.log(data);
    
    var cDg;
    if(!cDg) cDg = canvasDatagrid({ parentNode:'grid', data:data });
    cDg.style.height = '100%';
		cDg.style.width = '100%';
    cDg.data = data;
    console.log(cDg);
    
    var range = XLSX.utils.decode_range(sheet['!href']);
    for(var i = range.s.c; i <= range.e.c; ++i) cDg.schema[i - range.s.c].title = XLSX.utils.encode_col(i);
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  public fileDropped(files: FileList): void {
    for ( let i = 0 ; i < files.length ; i ++ ) {
      this.filesSubject.next(files[i]);
    }
  }

}
