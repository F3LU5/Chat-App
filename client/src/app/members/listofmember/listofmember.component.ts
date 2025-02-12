import { Component, inject, OnInit } from '@angular/core';
import { MemberCardComponent } from "../member-card/member-card.component";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MembersService } from '../../_services/members.service';

interface ChangeSide{
  itemsPerPage: number;
  page: number;
}

@Component({
  selector: 'app-listofmember',
  standalone: true,
  imports: [MemberCardComponent, PaginationModule],
  templateUrl: './listofmember.component.html',
  styleUrl: './listofmember.component.css'
})
export class ListofmemberComponent implements OnInit {
  memberService = inject(MembersService);
  pageNumber = 1;
  pageSize = 5;


  ngOnInit(): void {
    if(!this.memberService.paginatedResult()) this.loadMembers();
  }
  
  loadMembers(): void{
    this.memberService.getMembers(this.pageNumber, this.pageSize)
  }

  changePage(changeSide: ChangeSide){
    if(this.pageNumber !== changeSide.page){
      this.pageNumber = changeSide.page;
      this.loadMembers();
    }
  }
}
