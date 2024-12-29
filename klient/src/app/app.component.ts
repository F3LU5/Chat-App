import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_uslugi/account.service';
import { GlownaComponent } from "./glowna/glowna.component";
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, GlownaComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private uslugaservisu = inject(AccountService);

  ngOnInit(): void {
    this.setAktualnyUzytkownik();
  }

  setAktualnyUzytkownik(){
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.uslugaservisu.aktualnyUzytkownik.set(user);
  }


}
