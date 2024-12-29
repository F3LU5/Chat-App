import { HttpClient} from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Uzytkownik } from '../_modele/uzytkownik';
import { of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UzytkownicyService {
  private http = inject(HttpClient);

  bazoweUrl = environment.apiUrl;
  uzytkownicy = signal<Uzytkownik[]>([])

  getMembers(){
    return this.http.get<Uzytkownik[]>(this.bazoweUrl + 'users').subscribe({
      next: uzytkownicy => this.uzytkownicy.set(uzytkownicy)
    })
  }

  getMember(username: string){
    const uzytkownik =  this.uzytkownicy().find(a => a.username === username);
    if(uzytkownik !== undefined) return of(uzytkownik);
    return this.http.get<Uzytkownik>(this.bazoweUrl + 'users/' + username);
  }
  updateMember(member: Uzytkownik) {
    return this.http.put(this.bazoweUrl + 'users', member).pipe(
      tap(() => {
        this.uzytkownicy.update(uzytkownicy => uzytkownicy.map(b => b.username === member.username ? member: b))
      })
    )
  }
}
