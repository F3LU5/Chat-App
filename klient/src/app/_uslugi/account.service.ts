import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_modele/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  bazoweURL = 'https://localhost:5001/api/';
  aktualnyUzytkownik = signal<User | null>(null);

  login(model: any) {
    return this.http.post<User>(this.bazoweURL + 'account/login', model).pipe(map(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        this.aktualnyUzytkownik.set(user);
      }
    }))

  }

  wyloguj(){
    localStorage.removeItem('user');
    this.aktualnyUzytkownik.set(null);
  }

}
