import { Component } from '@angular/core';
import { Search } from './components/search/search';
import { HeroesList } from './components/heroes-list/heroes-list';

@Component({
  selector: 'riu-heroes',
  imports: [Search, HeroesList],
  templateUrl: './heroes.html',
  styleUrl: './heroes.scss',
  providers: [],
})
export class Heroes {}
