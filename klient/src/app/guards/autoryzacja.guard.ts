import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_uslugi/account.service';
import { ToastrService } from 'ngx-toastr';

export const autoryzacjaGuard: CanActivateFn = (route, state) => {
  const ObslugaKonta = inject(AccountService);
  const toastr = inject(ToastrService);

  if(ObslugaKonta.aktualnyUzytkownik()){
    return true;
  } else {
    toastr.error("Bez logowania ani rusz!");
    return false;
    
  }

};
