import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_uslugi/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rejestracja',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './rejestracja.component.html',
  styleUrl: './rejestracja.component.css'
})
export class RejestracjaComponent {
  private accountService = inject(AccountService);
  private toaser = inject(ToastrService);
  @Output() anulujRejestracje = new EventEmitter();
  model: any = {}

  rejestracja(){
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.anuluj();
      },
      error: error => this.toaser.error(error.error)
    })
  }
  anuluj(){
    this.anulujRejestracje.emit(false);
  }
}
