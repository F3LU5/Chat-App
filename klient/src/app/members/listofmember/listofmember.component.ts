import { Component, inject, OnInit } from '@angular/core';
import { UzytkownicyService } from '../../_uslugi/uzytkownicy.service';
import { Subscriber } from 'rxjs';
import { Uzytkownik } from '../../_modele/uzytkownik';
import { MemberCardComponent } from "../member-card/member-card.component";
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-listofmember',
  standalone: true,
  imports: [MemberCardComponent, PaginationModule],
  templateUrl: './listofmember.component.html',
  styleUrl: './listofmember.component.css'
})
export class ListofmemberComponent implements OnInit {
  memberService = inject(UzytkownicyService);
  pageNumber = 1;
  pageSize = 5;


  ngOnInit(): void {
    if(!this.memberService.paginatedResult()) this.loadMembers();
  }
  loadMembers(){
    this.memberService.getMembers(this.pageNumber, this.pageSize)
  }
  zmianaStrony(event: any){
    if(this.pageNumber !== event.page){
      this.pageNumber = event.page;
      this.loadMembers();
    }
  }
}
