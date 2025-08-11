import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

import { HeroFormService } from './hero-form';

describe('HeroFormService', () => {
  let service: HeroFormService;

  beforeEach(() => {
    const fakeGroup = new FormGroup({
      superhero: new FormControl('', { nonNullable: true }),
      id: new FormControl(''),
    }) as any;

    spyOn(HeroFormService.prototype as any, 'buildForm').and.returnValue(
      fakeGroup
    );

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [HeroFormService],
    });

    service = TestBed.inject(HeroFormService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should expose a form with superhero and id controls', () => {
    expect(service.form.contains('superhero')).toBeTrue();
    expect(service.form.contains('id')).toBeTrue();
  });

  it('should isValid mark as touched and return validity', () => {
    const markSpy = spyOn(service.form, 'markAllAsTouched').and.callThrough();
    const updSpy = spyOn(
      service.form,
      'updateValueAndValidity'
    ).and.callThrough();
    const result = service.isValid();
    expect(markSpy).toHaveBeenCalled();
    expect(updSpy).toHaveBeenCalled();
    expect(typeof result).toBe('boolean');
  });

  it('should markAsDuplicated set duplicated error on superhero', () => {
    const ctrl = service.form.get('superhero')!;
    expect(ctrl.errors).toBeNull();
    service.markAsDuplicated();
    expect(ctrl.hasError('duplicated')).toBeTrue();
    expect(service.form.invalid).toBeTrue();
  });
});
