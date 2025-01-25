import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WynikPaginacji } from '../_modele/paginacja';
import { Wiadomosc } from '../_modele/wiadomosc';
import { setPaginatedResponse, setPaginationHeaders } from './paginationHelper';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { User } from '../_modele/user';


@Injectable({
  providedIn: 'root'
})
export class WiadomoscService {
  bazoweUrl = environment.apiUrl;
  hubUrl = environment.hubsUrl;
  private http = inject(HttpClient);
  hubConnection?: HubConnection;
  wynikPaginacji = signal<WynikPaginacji<Wiadomosc[]> | null>(null);
  messageThread = signal<Wiadomosc[]>([]);

  createHubConnection(user: User, otherUsername: string){
    this.hubConnection = new HubConnectionBuilder().withUrl(this.hubUrl + 'message?user=' + otherUsername, {
      accessTokenFactory: ()=> user.token
    })
    .withAutomaticReconnect()
    .build();
    this.hubConnection.start().catch(error => console.log(error))

    this.hubConnection.on('ReceiveMessageThread', messages => {
      this.messageThread.set(messages)
    });

    this.hubConnection.on('NewMessages',message => {
      this.messageThread.update(messages => [...messages, message])
    })
    
  }

  stopHubConnection(){
    if(this.hubConnection?.state === HubConnectionState.Connected){
      this.hubConnection.stop().catch(error=>console.log(error))
    }
  }

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = setPaginationHeaders(pageNumber, pageSize);

    params = params.append('Container', container);
    console.log(container);
    return this.http.get<Wiadomosc[]>(this.bazoweUrl + 'messages', {observe: 'response', params})
      .subscribe({
        next: response => setPaginatedResponse(response, this.wynikPaginacji)
      })
  }

  getMessageThread(username: string){
    return this.http.get<Wiadomosc[]>(this.bazoweUrl + 'messages/thread/' + username);
  }
  async sentMessage(username: string, content: string){
    return this.hubConnection?.invoke('SendMessage', {recipientUsername: username, content})
  }

  deleteMessage(id: number){
    return this.http.delete(this.bazoweUrl + 'messages/' + id);
  }
}
