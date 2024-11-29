import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_uslugi/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  ObslugaKonta = inject(AccountService)
  model: any = {};

  login() {
    this.ObslugaKonta.login(this.model).subscribe({
      next: odpowiedz => {
        console.log(odpowiedz);
      },
      error: error => console.log(error)
    })
  }

  wyloguj(){
    this.ObslugaKonta.wyloguj();
  }
}
