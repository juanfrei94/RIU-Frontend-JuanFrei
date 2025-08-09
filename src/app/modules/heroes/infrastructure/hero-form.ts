import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { formFields } from '../components/hero-form/hero-form-fields';
import { FormField } from '../entities/base-form-field';
import { formFieldBuilder } from '../utils/formFieldBuilder';

type HeroFormType = { [key: string]: FormControl<string> };

@Injectable()
export class HeroFormService {
  private _heroForm = this.buildForm(formFields);

  private buildForm(formFields: FormField[]): FormGroup {
    const group = formFieldBuilder(formFields);
    group['id'] = new FormControl('');
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

  public markAsDuplicated() {
    this.form.get('superhero')?.setErrors({ duplicated: true });
    this.form.updateValueAndValidity();
  }
}
