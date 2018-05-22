import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TryMeComponent } from './tryme.component';

<<<<<<< HEAD:myApp/src/app/components/tryme/tryme.component.spec.ts
describe('TryMeComponent', () => {
=======
describe('TestComponent', () => {
>>>>>>> fc37d39866fa6606092d269db0ce7115c7ef946c:myApp/src/app/components/tryme/tryme.component.spec.ts
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
