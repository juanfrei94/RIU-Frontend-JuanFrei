import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const yearRange =
  (): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const value = Number(control.value);
    const min = 1930;
    const max = new Date().getFullYear();
    if (!Number.isInteger(value)) return { year: 'notInteger' };
    return value >= min && value <= max ? null : { yearRange: { min, max } };
  };

export const commaList =
  (): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const raw = String(control.value ?? '').trim();

    const values = raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (values.length < 1) return { minItems: true };
    if (values.length > 10) return { maxItems: true };

    const invalid = values.find(
      (v) => v.length < 2 || v.length > 50 || /\s{2,}/.test(v)
    );
    return invalid ? { listItemInvalid: invalid } : null;
  };

export const specialValidators = {
  commaList: commaList,
  yearRange: yearRange,
};

export type SpecialValidatorKey = keyof typeof specialValidators;
