import { Component, inject, input, Input, OnInit, output, ViewChild } from '@angular/core';
import { Wiadomosc } from '../../_modele/wiadomosc';
import { WiadomoscService } from '../../_uslugi/wiadomosc.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-wiadomosci-uzytkownika',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './wiadomosci-uzytkownika.component.html',
  styleUrl: './wiadomosci-uzytkownika.component.css'
})
export class WiadomosciUzytkownikaComponent implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm;
  private messageService = inject(WiadomoscService);
  username = input.required<string>();
  messages: Wiadomosc[]=[];
  messages1 = input.required<Wiadomosc[]>()
  messageContent = '';
  updateMessages = output<Wiadomosc>();

  formatMessageDate(date: Date | null) {
    if (!date) return '';

    const currentTime = new Date();
    const timeDifference = Math.abs(currentTime.getTime() - new Date(date).getTime());
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));

    if (hoursAgo < 1) return 'Mniej niż godzinę temu';
    else if (hoursAgo === 1) return 'Godzinę temu';
    else return `${hoursAgo} godzin temu`;
  }

  ngOnInit(): void {
    this.loadMessages();
  }
  loadMessages(){
    this.messageService.getMessageThread(this.username()).subscribe({
      next: messages => this.messages=messages
    })
  }

  sendMessage(){
    this.messageService.sentMessage(this.username(), this.messageContent).subscribe({
      next: message1=>{
        this.updateMessages.emit(message1);
        this.messageForm?.reset();
      }
    })
  }
}
