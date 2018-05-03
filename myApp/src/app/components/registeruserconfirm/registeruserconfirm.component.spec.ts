import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteruserconfirmComponent } from './registeruserconfirm.component';

describe('RegisteruserconfirmComponent', () => {
  let component: RegisteruserconfirmComponent;
  let fixture: ComponentFixture<RegisteruserconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteruserconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteruserconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
