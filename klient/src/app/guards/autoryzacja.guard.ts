import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

export const authorisationGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  if(accountService.currentUser())
  {
    return true;
  } 
  else 
  {
    toastr.error("Bez logowania ani rusz!");
    return false;
    
  }

};
