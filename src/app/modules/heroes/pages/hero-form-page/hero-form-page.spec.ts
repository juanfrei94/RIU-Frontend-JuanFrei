import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroesService } from '../../infrastructure';
import { HeroFormService } from '../../infrastructure';
import { HeroFormPage } from './hero-form-page';
import { Hero, Publisher } from '../../entities';

describe('HeroFormPage', () => {
  let component: HeroFormPage;
  let fixture: ComponentFixture<HeroFormPage>;
  let router: jasmine.SpyObj<Router>;
  let heroes: jasmine.SpyObj<HeroesService>;
  let formSvc: jasmine.SpyObj<HeroFormService>;
  let params$: Subject<any>;

  const hero: Hero = {
    id: 'dc-batman',
    superhero: 'Batman',
    publisher: Publisher.dc,
    alter_ego: '',
    first_appearance: '',
    characters: '',
  };

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    heroes = jasmine.createSpyObj('HeroesService', ['getById', 'save']);
    formSvc = jasmine.createSpyObj('HeroFormService', [
      'isValid',
      'markAsDuplicated',
    ]);
    params$ = new Subject<any>();
    setFormValue({});

    await TestBed.configureTestingModule({
      imports: [HeroFormPage],
      providers: [
        { provide: Router, useValue: router },
        { provide: HeroesService, useValue: heroes },
        {
          provide: ActivatedRoute,
          useValue: { params: params$.asObservable() },
        },
      ],
    })
      .overrideComponent(HeroFormPage, {
        set: {
          template: '',
          providers: [{ provide: HeroFormService, useValue: formSvc }],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function setFormValue(value: Partial<Hero>) {
    const group = new FormGroup({
      id: new FormControl(value.id ?? ''),
      superhero: new FormControl(value.superhero ?? ''),
      publisher: new FormControl(value.publisher ?? ''),
      alter_ego: new FormControl(value.alter_ego ?? ''),
      first_appearance: new FormControl(value.first_appearance ?? ''),
      characters: new FormControl(value.characters ?? ''),
    }) as any;
    Object.defineProperty(formSvc, 'form', {
      get: () => group,
      configurable: true,
    });
    return group;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hero$ should call getById when id is present', () => {
    heroes.getById.and.returnValue(of(hero));
    let received: any;
    component.hero$.subscribe((v) => (received = v));
    params$.next({ id: hero.id });
    expect(heroes.getById).toHaveBeenCalledWith(hero.id);
    expect(received).toEqual(hero);
  });

  it('hero$ should not call getById when id is missing', () => {
    let received: any;
    component.hero$.subscribe((v) => (received = v));
    params$.next({});
    expect(heroes.getById).not.toHaveBeenCalled();
    expect(received).toEqual([]);
  });

  it('submit should not call save when form is invalid', () => {
    formSvc.isValid.and.returnValue(false);
    component.submit();
    expect(heroes.save).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('submit should call save with isEdit=false and navigate on success', () => {
    params$.next({});
    component.hero$.subscribe();
    const group = setFormValue(hero);
    formSvc.isValid.and.returnValue(true);
    heroes.save.and.returnValue(of(hero));
    component.submit();
    expect(heroes.save).toHaveBeenCalledWith(group.value as Hero, false);
    expect(router.navigate).toHaveBeenCalledWith(['heroes']);
  });

  it('submit should mark as duplicated on error and not navigate', () => {
    params$.next({});
    component.hero$.subscribe();
    setFormValue(hero);
    formSvc.isValid.and.returnValue(true);
    heroes.save.and.returnValue(throwError(() => new Error('dup')));
    component.submit();
    expect(formSvc.markAsDuplicated).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('submit should call save with isEdit=true when id is present', () => {
    heroes.getById.and.returnValue(of(hero));
    component.hero$.subscribe();
    params$.next({ id: hero.id });
    const group = setFormValue(hero);
    formSvc.isValid.and.returnValue(true);
    heroes.save.and.returnValue(of(hero));
    component.submit();
    expect(heroes.save).toHaveBeenCalledWith(group.value as Hero, true);
    expect(router.navigate).toHaveBeenCalledWith(['heroes']);
  });

  it('back should navigate to heroes', () => {
    component.back();
    expect(router.navigate).toHaveBeenCalledWith(['heroes']);
  });
});
