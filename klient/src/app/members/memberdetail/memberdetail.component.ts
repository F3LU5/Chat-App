import { Component, inject, OnInit } from '@angular/core';
import { UzytkownicyService } from '../../_uslugi/uzytkownicy.service';
import { ActivatedRoute } from '@angular/router';
import { Uzytkownik } from '../../_modele/uzytkownik';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { WiadomosciUzytkownikaComponent } from "../wiadomosci-uzytkownika/wiadomosci-uzytkownika.component";

@Component({
  selector: 'app-memberdetail',
  standalone: true,
  imports: [TabsModule, WiadomosciUzytkownikaComponent],
  templateUrl: './memberdetail.component.html',
  styleUrl: './memberdetail.component.css'
})
export class MemberdetailComponent implements OnInit{
  private uzytkownikService = inject(UzytkownicyService);
  private route = inject(ActivatedRoute);
  member?: Uzytkownik;

  ngOnInit(): void {
    this.loadMember()
  }

  
  loadMember(){
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.uzytkownikService.getMember(username).subscribe({
      next: member => this.member = member
    })
  }
}