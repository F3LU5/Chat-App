import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PresenceService } from './presence.service';
import { User } from '../_models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

interface RegisterForm {
  dateOfBirth: string;
  gender: string;
  initials: string;
  phoneNumber: string;
  proffession: string;
  confirmPassword: string;
  password: string;
  username: string;
}

interface LoginForm {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  private presenceService = inject(PresenceService);
  private jwtHelper = new JwtHelperService();
  baseURL = environment.apiUrl;
  currentUser = signal<User | null>(null);

  roles = computed(() => {
    const user = this.currentUser();
    if (user?.token) {
      const decodedToken = this.jwtHelper.decodeToken(user.token);
      return Array.isArray(decodedToken.role) ? decodedToken.role : [decodedToken.role];
    }
    return [];
  });

  login(loginForm: LoginForm): Observable<void> {
    return this.http.post<User>(this.baseURL + 'account/login', loginForm).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(registerData: RegisterForm): Observable<User> {
    return this.http.post<User>(this.baseURL + 'account/register', registerData).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
    this.presenceService.createHubConnectrion(user);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.presenceService.stopHubConnection();
  }
}
