import { Component, inject, OnInit } from '@angular/core';
import { WiadomoscService } from '../_uslugi/wiadomosc.service';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { Wiadomosc } from '../_modele/wiadomosc';
import { RouterLink } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgClass } from '@angular/common';
import { DatePipe } from '@angular/common';
import { TimeagoModule } from 'ngx-timeago';




@Component({
  selector: 'app-wiadomosci',
  standalone: true,
  imports: [NgClass, PaginationModule, ButtonsModule, FormsModule, RouterLink, TimeagoModule],
  templateUrl: './wiadomosci.component.html',
  styleUrl: './wiadomosci.component.css'
})
export class WiadomosciComponent implements OnInit{
  serviceWiadomosci = inject(WiadomoscService);
  container = 'Inbox';
  pageNumber = 1;
  pageSize = 5;
  datePipe = new DatePipe('en-US');
  isOutbox = this.container === 'Outbox';
  
  ngOnInit(): void {
    this.loadMessages();
  }
  loadMessages() {
    this.serviceWiadomosci.getMessages(this.pageNumber, this.pageSize, this.container);
  }
  getTrase(message: Wiadomosc){
    if(this.container==='Outbox') return `/members/${message.recipientUsername}`;
    else return `/members/${message.senderUsername}`;
  }

  deleteMessage(id: number){
    this.serviceWiadomosci.deleteMessage(id).subscribe({
      next:_ => {
        this.serviceWiadomosci.wynikPaginacji.update(prev => {
          if(prev && prev.items){
            prev.items.splice(prev.items.findIndex(m=>m.id===id),1);
            return prev;
          }
          return prev;
        })
      } 
    })
  }
  zmianaStrony(event:any){
    if(this.pageNumber !== event.page){
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }
  formatMessageDate(date: Date | null) {
    if (!date) return '';

    const currentTime = new Date();
    const timeDifference = Math.abs(currentTime.getTime() - new Date(date).getTime());
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));

    if (hoursAgo < 1) return 'Mniej niż godzinę temu';
    else if (hoursAgo === 1) return 'Godzinę temu';
    else return `${hoursAgo} godzin temu`;
  }
}
