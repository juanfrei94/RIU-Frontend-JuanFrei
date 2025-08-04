import { TestBed } from '@angular/core/testing';

import { HeroForm } from './hero-form';

describe('HeroForm', () => {
  let service: HeroForm;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroForm);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
