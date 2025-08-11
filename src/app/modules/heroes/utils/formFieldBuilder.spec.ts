import { FormControl } from '@angular/forms';

import { SpecialValidatorKey } from '../validators';
import { formFieldBuilder } from './formFieldBuilder';

describe('formFieldBuilder', () => {
  it('should return empty group when no fields are provided', () => {
    const group = formFieldBuilder([]);
    expect(Object.keys(group)).toEqual([]);
  });

  it('should create a control for each field name', () => {
    const group = formFieldBuilder([
      { name: 'first', validations: [] } as any,
      { name: 'second', validations: [] } as any,
    ]);
    expect(Object.keys(group)).toEqual(['first', 'second']);
    expect(group['first']).toBeInstanceOf(FormControl);
    expect(group['second']).toBeInstanceOf(FormControl);
  });

  it('should apply required validator', () => {
    const group = formFieldBuilder([
      { name: 'title', validations: [{ type: 'required' }] } as any,
    ]);
    const ctrl = group['title'];
    expect(ctrl.value).toBe('');
    expect(ctrl.valid).toBeFalse();
    ctrl.setValue('ok');
    expect(ctrl.valid).toBeTrue();
  });

  it('should apply pattern validator', () => {
    const group = formFieldBuilder([
      {
        name: 'upper',
        validations: [{ type: 'pattern', pattern: '^[A-Z]+$' }],
      } as any,
    ]);
    const ctrl = group['upper'];
    ctrl.setValue('abc');
    expect(ctrl.valid).toBeFalse();
    ctrl.setValue('ABC');
    expect(ctrl.valid).toBeTrue();
  });

  it('should apply special validator (commaList)', () => {
    const group = formFieldBuilder([
      {
        name: 'tags',
        validations: [
          { type: 'special', validator: 'commaList' as SpecialValidatorKey },
        ],
      } as any,
    ]);
    const ctrl = group['tags'];
    ctrl.setValue('');
    expect(ctrl.valid).toBeFalse();
    ctrl.setValue('foo,bar');
    expect(ctrl.valid).toBeTrue();
  });

  it('should apply multiple validators in order', () => {
    const group = formFieldBuilder([
      {
        name: 'code',
        validations: [
          { type: 'required' },
          { type: 'pattern', pattern: '^[A-Z]{3}$' },
        ],
      } as any,
    ]);
    const ctrl = group['code'];
    expect(ctrl.valid).toBeFalse();
    ctrl.setValue('ab');
    expect(ctrl.valid).toBeFalse();
    ctrl.setValue('ABC');
    expect(ctrl.valid).toBeTrue();
  });

  it('should allow empty validations array', () => {
    const group = formFieldBuilder([{ name: 'free', validations: [] } as any]);
    const ctrl = group['free'];
    expect(ctrl.valid).toBeTrue();
    ctrl.setValue('anything');
    expect(ctrl.valid).toBeTrue();
  });

  it('should use empty pattern when pattern is missing', () => {
    const group = formFieldBuilder([
      { name: 'maybe', validations: [{ type: 'pattern' }] } as any,
    ]);
    const ctrl = group['maybe'];
    ctrl.setValue('any value');
    expect(ctrl.valid).toBeTrue();
  });
});
