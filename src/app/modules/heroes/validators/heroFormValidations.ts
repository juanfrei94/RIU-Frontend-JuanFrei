import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const commaList =
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
};

export type SpecialValidatorKey = keyof typeof specialValidators;
