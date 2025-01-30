import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_modele/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseurl = environment.apiUrl;
  private http = inject(HttpClient)

  getUserWithRoles(){
    return this.http.get<User[]>(this.baseurl + 'admin/users-with-roles');
  }

  updateUserRoles(username: string, roles: string[]){
    return this.http.post<string[]>(this.baseurl + 'admin/edit-roles/'
       + username + '?roles=' + roles, {});
  }
}
