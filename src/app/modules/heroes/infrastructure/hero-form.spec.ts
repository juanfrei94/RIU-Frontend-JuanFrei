import { TestBed } from '@angular/core/testing';
import { HeroForm } from '../components/hero-form/hero-form';

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
