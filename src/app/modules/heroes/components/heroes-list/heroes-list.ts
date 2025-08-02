import { Component, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Actions } from '../../entities';
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
  public readonly buttonAction = output<Actions>();
  public readonly getColumnLabel = getColumnLabel;

  public readonly buttons = [
    { name: 'Edit', action: Actions.Edit, color: 'primary' },
    { name: 'Delete', action: Actions.Delete, color: 'warn' },
  ];

  public actionButton(action: Actions) {
    this.buttonAction.emit(action);
  }
}
