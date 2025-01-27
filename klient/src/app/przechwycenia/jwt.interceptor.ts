import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../_uslugi/account.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const accountService = inject(AccountService);

  if(accountService.aktualnyUzytkownik()){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accountService.aktualnyUzytkownik()?.token}`
      }
    })
  }
  return next(req);
};
