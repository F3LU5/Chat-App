import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UzytkownicyService } from '../_uslugi/uzytkownicy.service';
import { Uzytkownik } from '../_modele/uzytkownik';

export const memberdetaleResolver: ResolveFn<Uzytkownik | null> = (route, state) => {
  const memberService = inject(UzytkownicyService);
  const username = route.paramMap.get('username');
  if(!username) return null;
  return memberService.getMember(username);
};
