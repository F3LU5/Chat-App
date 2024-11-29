import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_uslugi/account.service';
import { GlownaComponent } from "./glowna/glowna.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, GlownaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  http = inject(HttpClient);
  private uslugaservisu = inject(AccountService);
  title = 'Chat internetowy';
  users: any;

  ngOnInit(): void {
    this.getUsers();
    this.setAktualnyUzytkownik();
  }

  setAktualnyUzytkownik(){
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.uslugaservisu.aktualnyUzytkownik.set(user);
  }

  getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: Response => this.users = Response,
      error: () => console.log(Error),
      complete: () => console.log('zadanie zostalo zakonczone')
    })
  }
}
