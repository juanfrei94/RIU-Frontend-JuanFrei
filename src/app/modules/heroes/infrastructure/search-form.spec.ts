import { TestBed } from '@angular/core/testing';

import { SearchForm } from './search-form';

describe('SearchForm', () => {
  let service: SearchForm;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchForm);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
