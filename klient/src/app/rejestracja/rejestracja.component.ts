import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rejestracja',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './rejestracja.component.html',
  styleUrl: './rejestracja.component.css'
})
export class RejestracjaComponent {
  model: any = {}

  rejestracja(){
    console.log(this.model);
  }
  anuluj(){
    console.log('anulowano');
  }
}
