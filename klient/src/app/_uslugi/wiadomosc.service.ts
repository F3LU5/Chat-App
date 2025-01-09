import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WynikPaginacji } from '../_modele/paginacja';
import { Wiadomosc } from '../_modele/wiadomosc';
import { setPaginatedResponse, setPaginationHeaders } from './paginationHelper';


@Injectable({
  providedIn: 'root'
})
export class WiadomoscService {
  bazoweUrl = environment.apiUrl
  private http = inject(HttpClient);
  wynikPaginacji = signal<WynikPaginacji<Wiadomosc[]> | null>(null);
  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = setPaginationHeaders(pageNumber, pageSize);

    params = params.append('Container', container);
    console.log(container);
    return this.http.get<Wiadomosc[]>(this.bazoweUrl + 'messages', {observe: 'response', params})
      .subscribe({
        next: response => setPaginatedResponse(response, this.wynikPaginacji)
      })
  }
}
