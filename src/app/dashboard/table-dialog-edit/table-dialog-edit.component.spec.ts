import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDialogEditComponent } from './table-dialog-edit.component';

describe('TableDialogEditComponent', () => {
  let component: TableDialogEditComponent;
  let fixture: ComponentFixture<TableDialogEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDialogEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDialogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
