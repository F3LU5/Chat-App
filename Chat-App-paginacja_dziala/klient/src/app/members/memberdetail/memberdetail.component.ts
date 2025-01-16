import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UzytkownicyService } from '../../_uslugi/uzytkownicy.service';
import { ActivatedRoute } from '@angular/router';
import { Uzytkownik } from '../../_modele/uzytkownik';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { WiadomosciUzytkownikaComponent } from "../wiadomosci-uzytkownika/wiadomosci-uzytkownika.component";
import { Wiadomosc } from '../../_modele/wiadomosc';
import { WiadomoscService } from '../../_uslugi/wiadomosc.service';

@Component({
  selector: 'app-memberdetail',
  standalone: true,
  imports: [TabsModule, WiadomosciUzytkownikaComponent],
  templateUrl: './memberdetail.component.html',
  styleUrl: './memberdetail.component.css'
})
export class MemberdetailComponent implements OnInit{
  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;
  private messageService = inject(WiadomoscService);
  private uzytkownikService = inject(UzytkownicyService);
  private route = inject(ActivatedRoute);
  member: Uzytkownik = {} as Uzytkownik;
  messages: Wiadomosc[] = [];
  activeTab?: TabDirective;

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => {
        this.member = data['member'];
      }
    })
    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })
  }

  selectTab(heading: string){
    if(this.memberTabs){
      const messageTab = this.memberTabs.tabs.find(x => x.heading === heading);
      if(messageTab) messageTab.active = true;
    }
  }

  onTabActivated(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === 'Wiadomości' && this.messages.length === 0 && this.member){
      this.messageService.getMessageThread(this.member.username).subscribe({
        next: messages => this.messages = messages
      })
    }
  }

  onUpdateMessages(event: Wiadomosc){
    this.messages.push(event);
  }
  
  // loadMember(){
  //   const username = this.route.snapshot.paramMap.get('username');
  //   if(!username) return;
  //   this.uzytkownikService.getMember(username).subscribe({
  //     next: member => this.member = member
  //   })
  // }
}