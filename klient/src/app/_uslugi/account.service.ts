import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../_modele/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  private obecnieService = inject(PresenceService);
  bazoweURL = environment.apiUrl;
  aktualnyUzytkownik = signal<User | null>(null);
  roles = computed(() => {
    const user = this.aktualnyUzytkownik();
    if(user && user.token) {
      const role = JSON.parse(atob(user.token.split('.')[1])).role
      return Array.isArray(role) ? role : [role];
    }
    return [];
  })

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
      this.obecnieService.createHubConnectrion(user)
  }

  wyloguj(){
    localStorage.removeItem('user');
    this.aktualnyUzytkownik.set(null);
    this.obecnieService.stopHubConnection();
  }

}
