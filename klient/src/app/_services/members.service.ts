import { HttpClient, HttpParams} from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { Member } from '../_models/member';
import { images } from '../_models/images';
import { Observable, Subscription } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);

  baseUrl = environment.apiUrl;

  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);

  getMembers(pageNumber?: number, pageSize?: number): Subscription
  {
    let params = new HttpParams();
    if(pageNumber && pageSize) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);  
    }
    return this.http.get<Member[]>(this.baseUrl + 'users', {observe: 'response', params}).subscribe({
      next: response =>{
        this.paginatedResult.set({
          items: response.body as Member[],
          pagination: JSON.parse(response.headers.get('Pagination')!)
        })
      }
    })
  }

  getMember(username: string): Observable<Member>
  {
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
  updateMember(member: Member): Observable<Object>
  {
    return this.http.put(this.baseUrl + 'users', member).pipe(
    )
  }

  setMainImage(photo: images): Observable<Object>
  {
    return this.http.put(this.baseUrl + 'users/ustaw-glowne-zdjecie/' + photo.id, {}).pipe()
  }
  
  deleteImage(photoId: number): Observable<Object>
  {
    return this.http.delete(this.baseUrl + 'users/usun-zdjecie/' + photoId);
  }
}