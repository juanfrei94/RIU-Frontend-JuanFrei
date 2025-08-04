import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';

import { HeroesService } from '../../infrastructure';
import { Search } from '../../components/search/search';
import { HeroesList } from '../../components/heroes-list/heroes-list';
import { Actions, Hero } from '../../entities';
import { Dialog } from '../../../../shared/components';

@Component({
  selector: 'riu-heroes-page',
  imports: [HeroesList, Search, MatDivider, AsyncPipe],
  templateUrl: './heroes-page.html',
  styleUrl: './heroes-page.scss',
})
export class HeroesPage {
  private readonly _router = inject(Router);
  private readonly _dialog = inject(MatDialog);
  public readonly heroService = inject(HeroesService);

  public readonly heroes$ = this.heroService.getAll();

  public trigger(value: { action: Actions; hero?: Hero | null }) {
    const { action, hero } = value;

    switch (action) {
      case Actions.Create:
        this._router.navigate(['heroes', 'new']);
        break;
      case Actions.Edit:
        if (!hero?.id) return;
        this._router.navigate(['heroes', hero.id]);
        break;

      case Actions.Delete:
        if (!hero) return;
        this.removeHeroById(hero);
        break;

      default:
        break;
    }
  }

  private removeHeroById(hero: Hero) {
    const dialogRef = this._dialog.open(Dialog, {
      data: hero,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.heroService.removeById(hero.id)),
        filter((wasDeleted: boolean) => wasDeleted),
        switchMap(() => this.heroService.getAll())
      )
      .subscribe();
  }
}
