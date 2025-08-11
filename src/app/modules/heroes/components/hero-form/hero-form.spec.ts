import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { HeroForm } from './hero-form';
import { HeroFormService } from '../../infrastructure';
import { Hero, Publisher } from '../../entities';
import { errorMaps } from '../../validators';

describe('HeroForm', () => {
  let component: HeroForm;
  let fixture: ComponentFixture<HeroForm>;
  let mockFormSvc: { form: FormGroup };

  const buildForm = () =>
    new FormGroup({
      id: new FormControl(''),
      superhero: new FormControl(''),
      publisher: new FormControl(''),
      alter_ego: new FormControl(''),
      first_appearance: new FormControl(''),
      characters: new FormControl(''),
    }) as any;

  const hero: Hero = {
    id: 'dc-batman',
    superhero: 'Batman',
    publisher: Publisher.dc,
    alter_ego: 'Bruce Wayne',
    first_appearance: 'Detective Comics #27',
    characters: 'Bruce Wayne',
  };

  beforeEach(async () => {
    mockFormSvc = { form: buildForm() };

    await TestBed.configureTestingModule({
      imports: [HeroForm],
      providers: [{ provide: HeroFormService, useValue: mockFormSvc }],
    })
      .overrideComponent(HeroForm, { set: { template: '' } })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch form on init when hero input is provided', () => {
    fixture.componentRef.setInput('hero', hero);
    component.ngOnInit();
    expect(mockFormSvc.form.value).toEqual(hero);
  });

  it('should not patch form on init when hero is null', () => {
    const spy = spyOn(mockFormSvc.form, 'patchValue').and.callThrough();
    fixture.componentRef.setInput('hero', null);
    component.ngOnInit();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should emit submit on onSubmit', (done) => {
    component.submit.subscribe(() => {
      expect(true).toBeTrue();
      done();
    });
    component.onSubmit();
  });

  it('getErrorMessage should return message for first error', () => {
    const ctrl = mockFormSvc.form.get('superhero')!;
    ctrl.setErrors({ duplicated: true, required: true });
    const msg = component.getErrorMessage('superhero');
    expect(msg).toBe(errorMaps['duplicated']);
  });
});
