import { Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { Uzytkownik } from '../../_modele/uzytkownik';
import { AccountService } from '../../_uslugi/account.service';
import { UzytkownicyService } from '../../_uslugi/uzytkownicy.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-memberedit',
  standalone: true,
  imports: [TabsModule, FormsModule],
  templateUrl: './memberedit.component.html',
  styleUrl: './memberedit.component.css'
})
export class MembereditComponent implements OnInit{
  @ViewChild('editForm') editForm?: NgForm;
  member?: Uzytkownik;
  private accountService = inject(AccountService);
  private memberService = inject(UzytkownicyService);
  private toastr = inject(ToastrService)

  ngOnInit(): void {
    this.loadMember();
  }
  loadMember(){
    const user = this.accountService.aktualnyUzytkownik();
    if (!user) return;
    this.memberService.getMember(user.username).subscribe({
      next: member => this.member = member
    })
  }

  updateMember(){
    console.log(this.member);
    this.toastr.success('Profil został pomyślnie zaktualizowany')
    this.editForm?.reset(this.member);
  }
}

