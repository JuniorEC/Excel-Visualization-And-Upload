import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileVisualizeComponent } from './file-visualize.component';

describe('FileVisualizeComponent', () => {
  let component: FileVisualizeComponent;
  let fixture: ComponentFixture<FileVisualizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileVisualizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileVisualizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
