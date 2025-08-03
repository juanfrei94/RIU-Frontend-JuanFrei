import { Component, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Actions, Hero } from '../../entities';
import { getColumnLabel } from '../../utils';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const COLUMNS = [
  'superhero',
  'publisher',
  'alter_ego',
  'first_appearance',
  'characters',
  'actions',
];

@Component({
  selector: 'riu-heroes-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './heroes-list.html',
  styleUrl: './heroes-list.scss',
})
export class HeroesList {
  public readonly columnsToDisplay = COLUMNS;
  public readonly list = input.required<Hero[]>();
  public readonly buttonAction = output<Actions>();
  public readonly getColumnLabel = getColumnLabel;

  public readonly listButtons = [
    { name: 'edit', action: Actions.Edit },
    { name: 'delete', action: Actions.Delete },
  ];

  public actionButton(action: Actions) {
    this.buttonAction.emit(action);
  }
}
