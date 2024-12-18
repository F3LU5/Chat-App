import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Uzytkownik } from '../_modele/uzytkownik';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UzytkownicyService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  bazoweUrl = environment.apiUrl;

  getMembers(){
    return this.http.get<Uzytkownik[]>(this.bazoweUrl + 'users', this.getHttpOpcje());
  }

  getMember(username: string){
    return this.http.get<Uzytkownik>(this.bazoweUrl + 'users/' + username, this.getHttpOpcje());
  }

  getHttpOpcje(){
    return{
      headers: new HttpHeaders({
        Autoryzacja: `Bearer ${this.accountService.aktualnyUzytkownik()?.token}`
      })
    }
  }
}
