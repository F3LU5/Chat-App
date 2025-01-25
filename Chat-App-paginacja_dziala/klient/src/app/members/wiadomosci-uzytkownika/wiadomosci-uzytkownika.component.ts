import { Component, inject, input, OnInit, ViewChild } from '@angular/core';
import { WiadomoscService } from '../../_uslugi/wiadomosc.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpeechToTextComponent } from '../../wiadomosci-uzytkownika/speech-to-text/speech-to-text.component';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-wiadomosci-uzytkownika',
  standalone: true,
  imports: [FormsModule, CommonModule, SpeechToTextComponent, TimeagoModule],
  templateUrl: './wiadomosci-uzytkownika.component.html',
  styleUrls: ['./wiadomosci-uzytkownika.component.css']
})
export class WiadomosciUzytkownikaComponent implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm;
  messageService = inject(WiadomoscService);
  username = input.required<string>();
  messageContent = '';

  ngOnInit(): void {

  }


  sendMessage() {
    this.messageService.sentMessage(this.username(), this.messageContent).then(() => {
      this.messageForm?.reset();
    })
  }
}
