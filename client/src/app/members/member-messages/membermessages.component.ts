import { Component, inject, input, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../../_services/message.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TimeagoModule } from 'ngx-timeago';
import { SpeechToTextComponent } from '../../message-speech-to-text/speech-to-text/speech-to-text.component';

@Component({
  selector: 'app-membermessages',
  standalone: true,
  imports: [FormsModule, CommonModule, SpeechToTextComponent, TimeagoModule],
  templateUrl: './membermessages.component.html',
  styleUrls: ['./membermessages.component.css']
})
export class MemberMessagesComponent  implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm;
  messageService = inject(MessageService);
  username = input.required<string>();
  messageContent = '';

  ngOnInit(): void {

  }


  sendMessage() {
    this.messageService.sendMessage(this.username(), this.messageContent).then(() => {
      this.messageForm?.reset();
    })
  }
}
