import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadCenterComponent } from './file-upload-center.component';

describe('FileUploadCenterComponent', () => {
  let component: FileUploadCenterComponent;
  let fixture: ComponentFixture<FileUploadCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
