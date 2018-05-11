import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUtilComponent } from './file-util.component';

describe('FileUtilComponent', () => {
  let component: FileUtilComponent;
  let fixture: ComponentFixture<FileUtilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUtilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUtilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
