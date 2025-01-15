import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_modele/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  bazoweURL = environment.apiUrl;
  aktualnyUzytkownik = signal<User | null>(null);

  login(model: any) {
    return this.http.post<User>(this.bazoweURL + 'account/login', model).pipe(map(user => {
      if (user) {
        this.ustawAktualnegoUzytkownika(user);
      }
    }))

  }

  register(model: any) {
    console.log(model);
    return this.http.post<User>(this.bazoweURL + 'account/register', model).pipe(map(user => {
      if (user) {
        this.ustawAktualnegoUzytkownika(user);
      }
      return user;
    }))

  }

  ustawAktualnegoUzytkownika(user: User){
    localStorage.setItem('user', JSON.stringify(user))
      this.aktualnyUzytkownik.set(user);
  }

  wyloguj(){
    localStorage.removeItem('user');
    this.aktualnyUzytkownik.set(null);
  }

}
