import { Component, inject, input, OnInit, ViewChild } from '@angular/core';
import { WiadomoscService } from '../../_uslugi/wiadomosc.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpeechToTextComponent } from '../../wiadomosci-uzytkownika/speech-to-text/speech-to-text.component';

@Component({
  selector: 'app-wiadomosci-uzytkownika',
  standalone: true,
  imports: [FormsModule, CommonModule, SpeechToTextComponent],
  templateUrl: './wiadomosci-uzytkownika.component.html',
  styleUrls: ['./wiadomosci-uzytkownika.component.css']
})
export class WiadomosciUzytkownikaComponent implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm;
  messageService = inject(WiadomoscService);
  username = input.required<string>();
  messageContent = '';

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

  }


  sendMessage() {
    this.messageService.sentMessage(this.username(), this.messageContent).then(() => {
      this.messageForm?.reset();
    })
  }
}
