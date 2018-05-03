import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomewithsessionComponent } from './homewithsession.component';

describe('HomewithsessionComponent', () => {
  let component: HomewithsessionComponent;
  let fixture: ComponentFixture<HomewithsessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomewithsessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomewithsessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
