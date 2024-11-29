import { Component } from '@angular/core';
import { RejestracjaComponent } from "../rejestracja/rejestracja.component";

@Component({
  selector: 'app-glowna',
  standalone: true,
  imports: [RejestracjaComponent],
  templateUrl: './glowna.component.html',
  styleUrl: './glowna.component.css'
})
export class GlownaComponent {
  rejestracja = false;
  rejestracjaToggle(){
    this.rejestracja = !this.rejestracja
  }
}
