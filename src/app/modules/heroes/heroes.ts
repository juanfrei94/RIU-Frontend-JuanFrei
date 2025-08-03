import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroesService } from './infrastructure';

@Component({
  selector: 'riu-heroes',
  imports: [RouterOutlet],
  styleUrl: './heroes.scss',
  templateUrl: './heroes.html',
  providers: [HeroesService]
})
export class Heroes {}
