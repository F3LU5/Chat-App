import { HttpClient} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Uzytkownik } from '../_modele/uzytkownik';


@Injectable({
  providedIn: 'root'
})
export class UzytkownicyService {
  private http = inject(HttpClient);

  bazoweUrl = environment.apiUrl;

  getMembers(){
    return this.http.get<Uzytkownik[]>(this.bazoweUrl + 'users');
  }

  getMember(username: string){
    return this.http.get<Uzytkownik>(this.bazoweUrl + 'users/' + username);
  }

}
