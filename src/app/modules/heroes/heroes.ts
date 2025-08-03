import { Component, inject, OnInit } from '@angular/core';
import { Search } from './components/search/search';
import { HeroesList } from './components/heroes-list/heroes-list';
import { MatDivider } from '@angular/material/divider';
import { HeroesService } from './infrastructure';
import { Hero } from './entities';

@Component({
  selector: 'riu-heroes',
  imports: [Search, HeroesList, MatDivider],
  templateUrl: './heroes.html',
  styleUrl: './heroes.scss',
  providers: [HeroesService],
})
export class Heroes implements OnInit {
  public readonly heroService = inject(HeroesService);

  public ngOnInit(): void {
    this.heroService.getAll().subscribe();
  }
}
