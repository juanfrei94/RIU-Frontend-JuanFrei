import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Hero } from '../../../modules/heroes/entities';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'riu-dialog',
  imports: [MatButton, MatDialogModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
})
export class Dialog {
  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: Hero
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
