import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { Hero } from '../../entities';
import { MatButtonModule } from '@angular/material/button';
import { HeroFormService } from '../../infrastructure';
import { formFields } from './hero-form-fields';

@Component({
  selector: 'riu-hero-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelect,
    FormsModule,
    MatOption,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.scss',
  providers: [HeroFormService],
})
export class HeroForm implements OnInit {
  public readonly heroFormService = inject(HeroFormService);
  public readonly formFields = formFields;

  public readonly hero = input<Hero | null>();
  public submit = output<void>();

  public ngOnInit(): void {
    const hero = this.hero();
    if (!hero) return;

    this.heroFormService.form.patchValue(hero as any);
  }

  public onSubmit() {
    this.submit.emit();
  }

  getError(controlName: string, error: string): boolean {
    const control = this.heroFormService.form.get(controlName);
    return !!(control && control.hasError(error));
  }
}
