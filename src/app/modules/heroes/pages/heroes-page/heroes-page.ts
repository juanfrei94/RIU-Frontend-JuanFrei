import { Component, inject, OnInit } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { Router } from '@angular/router';
import { HeroesService } from '../../infrastructure';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Search } from '../../components/search/search';
import { HeroesList } from '../../components/heroes-list/heroes-list';

@Component({
  selector: 'riu-heroes-page',
  imports: [HeroesList, Search, MatDivider, MatProgressSpinnerModule],
  templateUrl: './heroes-page.html',
  styleUrl: './heroes-page.scss',
})
export class HeroesPage implements OnInit {
  private readonly _heroService = inject(HeroesService);
  private readonly _router = inject(Router);

  public ngOnInit(): void {
    this._heroService.getAll().subscribe();
  }

  public get heroList() {
    return this._heroService.heroList();
  }

  public algo() {}
}
