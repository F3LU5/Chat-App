import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_uslugi/account.service';

@Component({
  selector: 'app-rejestracja',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './rejestracja.component.html',
  styleUrl: './rejestracja.component.css'
})
export class RejestracjaComponent {
  private accountService = inject(AccountService);
  @Output() anulujRejestracje = new EventEmitter();
  model: any = {}

  rejestracja(){
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.anuluj();
      },
      error: error => console.log(error)
    })
  }
  anuluj(){
    this.anulujRejestracje.emit(false);
  }
}
