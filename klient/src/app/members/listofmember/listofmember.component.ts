import { Component, inject, OnInit } from '@angular/core';
import { UzytkownicyService } from '../../_uslugi/uzytkownicy.service';
import { Subscriber } from 'rxjs';
import { Uzytkownik } from '../../_modele/uzytkownik';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-listofmember',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './listofmember.component.html',
  styleUrl: './listofmember.component.css'
})
export class ListofmemberComponent implements OnInit {
  memberService = inject(UzytkownicyService);


  ngOnInit(): void {
    if(this.memberService.uzytkownicy().length === 0) this.loadMembers();
  }
  loadMembers(){
    this.memberService.getMembers()
  }
}
