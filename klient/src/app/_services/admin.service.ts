import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseurl = environment.apiUrl;
  private http = inject(HttpClient);

  getUserWithRoles() : Observable<User[]> {
    return this.http.get<User[]>(this.baseurl + 'admin/users-with-roles');
  }

  updateUserRoles(username: string, roles: string[]) : Observable<string[]> {
    return this.http.post<string[]>(this.baseurl + 'admin/edit-roles/' + username + '?roles=' + roles, {});
  }

  
  deleteUser(username: string): Observable<void> {
    return this.http.delete<void>(this.baseurl + 'admin/delete-user/' + username); 
  }
}
