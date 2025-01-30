import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_uslugi/account.service';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  if(accountService.roles().includes('Admin') || accountService.roles().includes('Moderator')){
    return true;
  }
  else{
    toastr.error('Nie posiadasz uprawnień do tej zakładki');
    return false;
  }
};
