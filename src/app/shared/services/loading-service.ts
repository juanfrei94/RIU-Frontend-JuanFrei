import { effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly _router = inject(Router);
  private _showLoading = signal<boolean>(false);

  constructor() {
    effect(() =>
      this._router.navigate(
        [{ outlets: { loading: this._showLoading() ? 'loading' : null } }],
        {
          replaceUrl: true,
        }
      )
    );
  }

  public showLoader() {
    this._showLoading.set(true);
  }

  public hideLoader() {
    this._showLoading.set(false);
  }
}
