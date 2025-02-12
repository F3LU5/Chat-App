import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-speech-to-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.css',]
})
export class SpeechToTextComponent {
  transcript: string = '';
  recognition: any;
  isListening: boolean = false;

  @Output() textCaptured = new EventEmitter<string>();

  constructor() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'pl-PL';

    this.recognition.onresult = (event: any) => {
      this.transcript = event.results[0][0].transcript;
      this.textCaptured.emit(this.transcript);
    };

    this.recognition.onerror = (event: any) => {
      console.error('Błąd podczas rozpoznawania mowy:', event.error);
    };
  }

  toggleListening() {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }

  startListening() {
    this.recognition.start();
    this.isListening = true;
  }

  stopListening() {
    this.recognition.stop();
    this.isListening = false;
  }
}
