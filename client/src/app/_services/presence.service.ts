import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubsUrl;
  private hubConnection?: HubConnection;
  private toastr = inject(ToastrService)
  private router = inject(Router);
  onlineUsers = signal<string[]>([]);

  createHubConnectrion(user: User){
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().then(() => console.log('Connected to PresenceHub')).catch(error => console.log(error));

    this.hubConnection.on('UserIsOnline', username => {

      this.onlineUsers.update(users => [...users, username]);
    });
    this.hubConnection.on('UserIsOffline', username => {

      this.onlineUsers.update(users => users.filter(x => x !== username));
    });

    this.hubConnection.on('GetOnlineUsers', usernames => {
      this.onlineUsers.set(usernames)
    })
    this.hubConnection.on('NewMessageReceived', ({username, initials}) => {

      this.toastr.info(initials + ' wysłał Ci nową wiadomość. Kliknij jeżeli chcesz zobaczyć wiadomość!')
      .onTap
      .pipe(take(1))
      .subscribe(() => this.router.navigateByUrl('/members/' + username + '?tab=Wiadomości'))
    })
  }
  stopHubConnection() {
    if(this.hubConnection?.state === HubConnectionState.Connected){
    }
  }
}
