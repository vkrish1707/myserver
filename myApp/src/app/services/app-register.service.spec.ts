import { TestBed, inject } from '@angular/core/testing';

import { AppRegisterService } from './app-register.service';

describe('AppRegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppRegisterService]
    });
  });

  it('should be created', inject([AppRegisterService], (service: AppRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
