import { FormControl, ValidatorFn } from '@angular/forms';

import { specialValidators } from './heroFormValidations';

describe('specialValidators.commaList', () => {
  let validator: ValidatorFn;

  const run = (value: any) => {
    const control = new FormControl(value);
    return validator(control);
  };

  beforeEach(() => {
    validator = specialValidators.commaList();
  });

  it('should return {minItems:true} when there are no items', () => {
    expect(run(null)).toEqual({ minItems: true });
    expect(run(undefined)).toEqual({ minItems: true });
    expect(run('')).toEqual({ minItems: true });
    expect(run('   ')).toEqual({ minItems: true });

    expect(run(',, , ,')).toEqual({ minItems: true });
  });

  it('should accept a simple valid list', () => {
    expect(run('ab')).toBeNull();
    expect(run('ab,cd')).toBeNull();
    expect(run(' ab ,  cd , ef ')).toBeNull();
  });

  it('should trim and filter empty items between commas', () => {
    expect(run(',,ab, ,cd,,')).toBeNull();
  });

  it('should mark an item as invalid if length < 2', () => {
    const res = run('a, bc');
    expect(res).toEqual({ listItemInvalid: 'a' });
  });

  it('should mark an item as invalid if length > 50', () => {
    const long = 'x'.repeat(51);
    const res = run(`ok, ${long}, fine`);
    expect(res).toEqual({ listItemInvalid: long });
  });

  it('should mark an item as invalid if it contains double spaces (\\s{2,})', () => {
    const bad = 'foo  bar';

    const res = run(`ok, ${bad}, fine`);
    expect(res).toEqual({ listItemInvalid: bad });
  });

  it('should return the first invalid item found', () => {
    const bad1 = 'a';
    const bad2 = 'y'.repeat(51);
    const res = run(` ${bad1} , ok , ${bad2}`);
    expect(res).toEqual({ listItemInvalid: bad1 });
  });

  it('should accept exactly 10 items', () => {
    const ten = Array.from({ length: 10 }, (_, i) => `aa${i}`).join(',');
    expect(run(ten)).toBeNull();
  });

  it('should return {maxItems:true} when there are more than 10 items', () => {
    const eleven = Array.from({ length: 11 }, (_, i) => `aa${i}`).join(',');
    expect(run(eleven)).toEqual({ maxItems: true });
  });

  it('should handle non-string values by converting them to strings and trimming', () => {
    expect(run(123)).toBeNull();
    expect(run(['ab', 'cd'].toString())).toBeNull();
  });

  it('should be idempotent for the same value', () => {
    const value = 'ab,cd,ef';
    const r1 = run(value);
    const r2 = run(value);
    expect(r1).toEqual(r2);
  });
});
