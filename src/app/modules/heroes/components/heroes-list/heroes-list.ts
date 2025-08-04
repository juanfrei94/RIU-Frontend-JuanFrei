import { Component, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Actions, Hero } from '../../entities';
import { getColumnLabel } from '../../utils';

const COLUMNS = [
  'superhero',
  'publisher',
  'alter_ego',
  'first_appearance',
  'characters',
  'actions',
];

interface ButtonAction {
  action: Actions;
  hero: Hero | null;
}

@Component({
  selector: 'riu-heroes-list',
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule],
  templateUrl: './heroes-list.html',
  styleUrl: './heroes-list.scss',
})
export class HeroesList {
  public readonly columnsToDisplay = COLUMNS;
  public readonly list = input.required<Hero[]>();
  public readonly buttonAction = output<ButtonAction>();
  public readonly getColumnLabel = getColumnLabel;
  public readonly actions = Actions;

  public readonly listButtons = [
    { name: 'edit', action: this.actions.Edit },
    { name: 'delete', action: this.actions.Delete },
  ];

  public actionButton(action: Actions, hero?: Hero) {
    this.buttonAction.emit({ action, hero: hero ?? null });
  }
}
