import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TryMeComponent } from './tryme.component';

describe('TestComponent', () => {
  let component: TryMeComponent;
  let fixture: ComponentFixture<TryMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TryMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TryMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
