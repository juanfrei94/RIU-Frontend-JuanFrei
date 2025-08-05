import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'riu-loading',
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {}
