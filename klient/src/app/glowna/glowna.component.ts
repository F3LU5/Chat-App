import { Component, inject, OnInit } from '@angular/core';
import { RejestracjaComponent } from "../rejestracja/rejestracja.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-glowna',
  standalone: true,
  imports: [RejestracjaComponent],
  templateUrl: './glowna.component.html',
  styleUrl: './glowna.component.css'
})
export class GlownaComponent implements OnInit {
  http = inject(HttpClient);
  rejestracja = false;
  users: any;

  ngOnInit(): void {
    this.getUsers();
  }

  rejestracjaToggle(){
    this.rejestracja = !this.rejestracja
  }

  anulujRejestracjeOpcja(event: boolean){
    this.rejestracja =event;
  }

  getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: Response => this.users = Response,
      error: () => console.log(Error),
      complete: () => console.log('zadanie zostalo zakonczone')
    })
  }
}
