import { Component, inject } from '@angular/core';
import { HeroesService } from '../../infrastructure';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HeroForm } from '../../components/hero-form/hero-form';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'riu-hero-form-page',
  imports: [AsyncPipe, HeroForm, MatProgressSpinnerModule],
  templateUrl: './hero-form-page.html',
  styleUrl: './hero-form-page.scss',
})
export class HeroFormPage {
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _heroService = inject(HeroesService);

  public readonly hero$ = this._activatedRoute.params.pipe(
    switchMap(({ id }) => (!id ? of(id) : this._heroService.getById(id))),
    takeUntilDestroyed()
  );

  public submit() {
    
  }
}
