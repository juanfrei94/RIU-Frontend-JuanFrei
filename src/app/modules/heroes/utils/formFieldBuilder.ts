import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { BaseFormField, FormField } from '../entities/base-form-field';
import { SpecialValidatorKey, specialValidators } from '../validators';

export const formFieldBuilder = (formFields: FormField[]) => {
  const group: { [key: string]: FormControl<string | null> } = {};

  formFields.forEach((field: BaseFormField) => {
    const validators: ValidatorFn[] = [];
    if (field.validations.length) {
      const { validations } = field;
      validations.forEach((validation) => {
        switch (validation.type) {
          case 'required':
            validators.push(Validators.required);
            break;
          case 'pattern':
            validators.push(Validators.pattern(validation.pattern || ''));
            break;
          case 'special':
            const special =
              specialValidators[validation.validator as SpecialValidatorKey];
            validators.push(special());
            break;
        }
      });
    }

    group[field.name] = new FormControl('', {
      validators,
      nonNullable: true,
    });
  });

  return group;
};
