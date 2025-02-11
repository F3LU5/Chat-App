import { Component, HostListener, Inject, inject, OnInit, ViewChild } from '@angular/core';



import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileImagesComponent } from "../profileimages/profileimages-edit.component";
import { DatePipe } from '@angular/common';
import { TimeagoModule } from 'ngx-timeago';
import { Member } from '../../_models/member';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';

@Component({
  selector: 'app-memberedit',
  standalone: true,
  imports: [TabsModule, FormsModule, ProfileImagesComponent, DatePipe, TimeagoModule],
  templateUrl: './memberedit.component.html',
  styleUrl: './memberedit.component.css'
})
export class MembereditComponent implements OnInit{
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event:any){
    if (this.editForm?.dirty){
      $event.returnValue = true
    }
  }

  member?: Member;
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private toastr = inject(ToastrService)

  ngOnInit(): void {
    this.loadMember();
  }
  loadMember(){
    const user = this.accountService.currentUser();
    if (!user) return;
    this.memberService.getMember(user.username).subscribe({
      next: member => this.member = member
    })
  }


  updateMember(){
    if (!this.member) return;
    this.memberService.updateMember(this.member).subscribe({
      next: _ => {
        this.toastr.success('Profil został pomyślnie zaktualizowany');
        this.editForm?.reset(this.member); 
      },
      error: err => {
        this.toastr.error('Wystąpił błąd podczas zapisywania danych');
        console.error(err); 
      }
    });
  }
  onMemberChange(event: Member){
    this.member = event;
  }
  
}

