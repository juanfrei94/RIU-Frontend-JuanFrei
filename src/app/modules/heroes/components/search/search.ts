import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeroesService } from '../../infrastructure';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'riu-search',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  private readonly _heroService = inject(HeroesService);

  public searchInput = new FormControl('');

  public readonly filteredHeroes$ = this.searchInput.valueChanges
    .pipe(
      debounceTime(450),
      filter((value) => !!value),
      distinctUntilChanged(),
      switchMap((value) => this._heroService.getByFilter(value || ''))
    )
    .subscribe(console.log);
}
