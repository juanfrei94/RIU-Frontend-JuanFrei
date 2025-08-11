import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { environments } from '../../../../environments/environments';
import { Hero, Publisher } from '../entities';
import { HeroesService } from './heroes';

describe('HeroesService', () => {
  let service: HeroesService;
  let http: HttpTestingController;
  const baseUrl = `${environments.baseUrl}/heroes`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService],
    });
    service = TestBed.inject(HeroesService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should not trigger a request on initial effect run', () => {
    http.expectNone(() => true);
    expect(service.heroList()).toEqual([]);
  });

  it('should getAll fetch heroes and update heroList', () => {
    const heroes: Hero[] = [
      {
        id: 'dc-batman',
        superhero: 'Batman',
        publisher: Publisher.dc,
        alter_ego: '',
        first_appearance: '',
        characters: '',
      },
    ];
    let emitted: Hero[] | undefined;
    service.getAll().subscribe((v) => (emitted = v));
    const req = http.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(heroes);
    expect(emitted).toEqual(heroes);
    expect(service.heroList()).toEqual(heroes);
  });

  it('should getAll return [] on error and set heroList to []', () => {
    let emitted: Hero[] | undefined;
    service.getAll().subscribe((v) => (emitted = v));
    const req = http.expectOne(baseUrl);
    req.flush('err', { status: 500, statusText: 'Server Error' });
    expect(emitted).toEqual([]);
    expect(service.heroList()).toEqual([]);
  });

  it('should getByFilter query by q and update heroList', () => {
    const filter = 'bat';
    const heroes: Hero[] = [
      {
        id: 'dc-batman',
        superhero: 'Batman',
        publisher: Publisher.dc,
        alter_ego: '',
        first_appearance: '',
        characters: '',
      },
    ];
    service.getByFilter(filter).subscribe();
    const req = http.expectOne(`${baseUrl}?q=${filter}`);
    expect(req.request.method).toBe('GET');
    req.flush(heroes);
    expect(service.heroList()).toEqual(heroes);
  });

  it('should getById return hero', () => {
    const hero: Hero = {
      id: 'dc-batman',
      superhero: 'Batman',
      publisher: Publisher.dc,
      alter_ego: '',
      first_appearance: '',
      characters: '',
    };
    let emitted: Hero | null | undefined;
    service.getById(hero.id).subscribe((v) => (emitted = v));
    const req = http.expectOne(`${baseUrl}/${hero.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(hero);
    expect(emitted).toEqual(hero);
  });

  it('should getById return null on error', () => {
    let emitted: Hero | null | undefined;
    service.getById('x').subscribe((v) => (emitted = v));
    const req = http.expectOne(`${baseUrl}/x`);
    req.flush('not found', { status: 404, statusText: 'Not Found' });
    expect(emitted).toBeNull();
  });

  it('should addHero post with computed id and return created hero', () => {
    const input: Hero = {
      id: '',
      superhero: 'Batman',
      publisher: Publisher.dc,
      alter_ego: '',
      first_appearance: '',
      characters: '',
    };
    let emitted: Hero | undefined;
    service.addHero(input).subscribe((v) => (emitted = v));
    const req = http.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.id).toBe('dc-batman');
    const created = { ...req.request.body };
    req.flush(created);
    expect(emitted).toEqual(created);
  });

  it('should addHero throw duplicated error when backend mentions duplicate', (done) => {
    const input: Hero = {
      id: '',
      superhero: 'Batman',
      publisher: Publisher.dc,
      alter_ego: '',
      first_appearance: '',
      characters: '',
    };
    service.addHero(input).subscribe({
      next: () => fail('should error'),
      error: (e) => {
        expect(e.duplicated).toBeTrue();
        expect(String(e.error)).toContain('duplicate');
        done();
      },
    });
    const req = http.expectOne(baseUrl);
    req.flush('duplicate key value', {
      status: 400,
      statusText: 'Bad Request',
    });
  });

  it('should addHero throw non-duplicated error when not duplicate', (done) => {
    const input: Hero = {
      id: '',
      superhero: 'Flash',
      publisher: Publisher.dc,
      alter_ego: '',
      first_appearance: '',
      characters: '',
    };
    service.addHero(input).subscribe({
      next: () => fail('should error'),
      error: (e) => {
        expect(e.duplicated).toBeFalse();
        expect(String(e.error)).toContain('other');
        done();
      },
    });
    const req = http.expectOne(baseUrl);
    req.flush('other error', { status: 500, statusText: 'Server Error' });
  });

  it('should updateHero patch and return updated hero', () => {
    const hero: Hero = {
      id: 'dc-batman',
      superhero: 'Batman',
      publisher: Publisher.dc,
      alter_ego: '',
      first_appearance: '',
      characters: '',
    };
    let emitted: Hero | undefined;
    service.updateHero(hero).subscribe((v) => (emitted = v));
    const req = http.expectOne(`${baseUrl}/${hero.id}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(hero);
    req.flush(hero);
    expect(emitted).toEqual(hero);
  });

  it('should removeById return true on success', () => {
    let emitted: boolean | undefined;
    service.removeById('dc-batman').subscribe((v) => (emitted = v));
    const req = http.expectOne(`${baseUrl}/dc-batman`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
    expect(emitted).toBeTrue();
  });

  it('should removeById return false on error', () => {
    let emitted: boolean | undefined;
    service.removeById('dc-batman').subscribe((v) => (emitted = v));
    const req = http.expectOne(`${baseUrl}/dc-batman`);
    req.flush('err', { status: 500, statusText: 'Server Error' });
    expect(emitted).toBeFalse();
  });

  it('should save call updateHero when isEdit is true', () => {
    const hero: Hero = {
      id: 'dc-batman',
      superhero: 'Batman',
      publisher: Publisher.dc,
      alter_ego: '',
      first_appearance: '',
      characters: '',
    };
    let emitted: Hero | undefined;
    service.save(hero, true).subscribe((v) => (emitted = v));
    const req = http.expectOne(`${baseUrl}/${hero.id}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(hero);
    expect(emitted).toEqual(hero);
  });

  it('should save call addHero when isEdit is false', () => {
    const hero: Hero = {
      id: '',
      superhero: 'Superman',
      publisher: Publisher.dc,
      alter_ego: '',
      first_appearance: '',
      characters: '',
    };
    let emitted: Hero | undefined;
    service.save(hero, false).subscribe((v) => (emitted = v));
    const req = http.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush({ ...req.request.body });
    expect(emitted).toEqual({ ...req.request.body });
  });
});
