import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstRegisterComponent } from './inst-register.component';

describe('InstRegisterComponent', () => {
  let component: InstRegisterComponent;
  let fixture: ComponentFixture<InstRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
