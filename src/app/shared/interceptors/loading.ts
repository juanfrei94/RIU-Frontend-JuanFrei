import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services';

export function LoadingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const loadingService = inject(LoadingService);
  loadingService.showLoader();
  return next(req).pipe(finalize(() => loadingService.hideLoader()));
}
