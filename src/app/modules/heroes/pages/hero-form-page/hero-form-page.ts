import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, of, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';

import { HeroesService, HeroFormService } from '../../infrastructure';
import { HeroForm } from '../../components/hero-form/hero-form';
import { Hero } from '../../entities';

@Component({
  selector: 'riu-hero-form-page',
  imports: [AsyncPipe, HeroForm, MatButton],
  templateUrl: './hero-form-page.html',
  styleUrl: './hero-form-page.scss',
  providers: [HeroFormService],
})
export class HeroFormPage {
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _heroService = inject(HeroesService);
  private readonly _heroFormService = inject(HeroFormService);

  private isEdit: boolean = false;

  public readonly hero$ = this._activatedRoute.params.pipe(
    tap(({ id }) => (this.isEdit = Boolean(id))),
    switchMap(({ id }) => (!id ? of(id ?? []) : this._heroService.getById(id))),
    takeUntilDestroyed()
  );

  public submit() {
    if (!this._heroFormService.isValid) {
      return;
    }
    const hero = this._heroFormService.form.value as unknown as Hero;
    this._heroService[this.isEdit ? 'updateHero' : 'addHero'](hero).subscribe(
      () => this.back()
    );
  }

  public back() {
    this._router.navigate(['heroes']);
  }
}
