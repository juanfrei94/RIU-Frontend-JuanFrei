import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { Search } from './search';
import { HeroesService } from '../../infrastructure';

describe('Search', () => {
  let component: Search;
  let fixture: ComponentFixture<Search>;
  let service: { filter: { set: jasmine.Spy } };

  beforeEach(async () => {
    service = { filter: { set: jasmine.createSpy('set') } };

    await TestBed.configureTestingModule({
      imports: [Search],
      providers: [{ provide: HeroesService, useValue: service }],
    })
      .overrideComponent(Search, { set: { template: '' } })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Search);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should debounce and set filter after 450ms', fakeAsync(() => {
    service.filter.set.calls.reset();
    component.searchInput.setValue('bat');
    expect(service.filter.set).not.toHaveBeenCalled();
    tick(449);
    expect(service.filter.set).not.toHaveBeenCalled();
    tick(1);
    expect(service.filter.set).toHaveBeenCalledOnceWith('bat');
  }));

  it('should not emit when value does not change (distinctUntilChanged)', fakeAsync(() => {
    service.filter.set.calls.reset();
    component.searchInput.setValue('flash');
    tick(450);
    component.searchInput.setValue('flash');
    tick(450);
    expect(service.filter.set).toHaveBeenCalledTimes(1);
    expect(service.filter.set).toHaveBeenCalledWith('flash');
  }));

  it('should convert nullish values to empty string', fakeAsync(() => {
    service.filter.set.calls.reset();
    component.searchInput.setValue(null as any);
    tick(450);
    expect(service.filter.set).toHaveBeenCalledOnceWith('');
  }));

  it('should emit for different consecutive values', fakeAsync(() => {
    service.filter.set.calls.reset();
    component.searchInput.setValue('a');
    tick(450);
    component.searchInput.setValue('ab');
    tick(450);
    component.searchInput.setValue('abc');
    tick(450);
    expect(service.filter.set.calls.allArgs()).toEqual([
      ['a'],
      ['ab'],
      ['abc'],
    ]);
  }));
});
