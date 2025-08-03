import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { formFields } from '../components/hero-form/hero-form-fields';
import { FormField } from '../entities/base-form-field';

type HeroFormType = { [key: string]: FormControl<string> };

@Injectable()
export class HeroFormService {
  private _heroForm = this.buildForm(formFields);

  private buildForm(formFields: FormField[]): FormGroup {
    const group: { [key: string]: FormControl<any> } = {};

    formFields.forEach((field: any) => {
      const validators: ValidatorFn[] = [];

      if (field.validators?.required) {
        validators.push(Validators.required);
      }

      if (field.validators?.minlength) {
        validators.push(Validators.minLength(3));
      }

      group[field.name] = new FormControl('', {
        validators,
        nonNullable: true,
      });
    });

    return new FormGroup(group);
  }

  public get form(): FormGroup<HeroFormType> {
    return this._heroForm;
  }

  public isValid(): boolean {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    return this.form.valid;
  }
}
