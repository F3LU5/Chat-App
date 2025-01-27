import { HttpInterceptorFn } from '@angular/common/http';
import { LadowanieService } from '../_uslugi/ladowanie.service';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const ladowanieService = inject(LadowanieService);
  ladowanieService.ladowanie();
  return next(req).pipe(
    delay(1000),
    finalize(() => {
      ladowanieService.idle()
    })
  )
};
