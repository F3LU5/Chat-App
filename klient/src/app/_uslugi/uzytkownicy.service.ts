import { HttpClient, HttpParams} from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Uzytkownik } from '../_modele/uzytkownik';
import { of, tap } from 'rxjs';
import { zdjecia } from '../_modele/zdjecie';
import { WynikPaginacji } from '../_modele/paginacja';


@Injectable({
  providedIn: 'root'
})
export class UzytkownicyService {
  private http = inject(HttpClient);

  bazoweUrl = environment.apiUrl;
  // uzytkownicy = signal<Uzytkownik[]>([]);

  paginatedResult = signal<WynikPaginacji<Uzytkownik[]> | null>(null);

  getMembers(pageNumber?: number, pageSize?: number){
    console.log({
      pageNumber, pageSize
    })
    let params = new HttpParams();
    if(pageNumber && pageSize) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);  
    }
    return this.http.get<Uzytkownik[]>(this.bazoweUrl + 'users', {observe: 'response', params}).subscribe({
      next: response =>{
        this.paginatedResult.set({
          items: response.body as Uzytkownik[],
          pagination: JSON.parse(response.headers.get('Pagination')!)
        })
      }
    })
  }

  getMember(username: string){
    // const uzytkownik =  this.uzytkownicy().find(a => a.username === username);
    // if(uzytkownik !== undefined) return of(uzytkownik);
    return this.http.get<Uzytkownik>(this.bazoweUrl + 'users/' + username);
  }
  updateMember(member: Uzytkownik) {
    return this.http.put(this.bazoweUrl + 'users', member).pipe(
      // tap(() => {
      //   this.uzytkownicy.update(uzytkownicy => uzytkownicy.map(b => b.username === member.username ? member: b))
      // })
    )
  }

  ustawGlowneZdjecie(photo: zdjecia){
    return this.http.put(this.bazoweUrl + 'users/ustaw-glowne-zdjecie/' + photo.id, {}).pipe(
      // tap(() => {
      //   this.uzytkownicy.update(uzytkownicy => uzytkownicy.map(m => {
      //     if(m.zdjecia.includes(photo)) {
      //       m.zdjecieUrl = photo.url
      //     }
      //     return m;
      //   }))
      // })
    )
  }
  usunZdjecie(photoId: number){
    return this.http.delete(this.bazoweUrl + 'users/usun-zdjecie/' + photoId);
  }
}