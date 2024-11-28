import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_uslugi/account.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  private ObslugaKonta = inject(AccountService)
  zalogowany = false;
  model: any = {};

  login() {
    this.ObslugaKonta.login(this.model).subscribe({
      next: odpowiedz => {
        console.log(odpowiedz);
        this.zalogowany = true
      },
      error: error => console.log(error)
    })
  }

  wyloguj(){
    this.zalogowany = false;
  }
}
