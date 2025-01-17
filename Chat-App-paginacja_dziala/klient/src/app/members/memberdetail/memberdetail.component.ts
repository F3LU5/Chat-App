import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Uzytkownik } from '../../_modele/uzytkownik';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { WiadomosciUzytkownikaComponent } from "../wiadomosci-uzytkownika/wiadomosci-uzytkownika.component";
import { Wiadomosc } from '../../_modele/wiadomosc';
import { WiadomoscService } from '../../_uslugi/wiadomosc.service';
import { AccountService } from '../../_uslugi/account.service';
import { PresenceService } from '../../_uslugi/presence.service';

@Component({
  selector: 'app-memberdetail',
  standalone: true,
  imports: [TabsModule, WiadomosciUzytkownikaComponent],
  templateUrl: './memberdetail.component.html',
  styleUrl: './memberdetail.component.css'
})
export class MemberdetailComponent implements OnInit, OnDestroy{
  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;
  private messageService = inject(WiadomoscService);
  private accountService = inject(AccountService);
  presenceService = inject(PresenceService);
  private route = inject(ActivatedRoute);
  member: Uzytkownik = {} as Uzytkownik;

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
    if(this.activeTab.heading === 'Wiadomości' && this.member){
      const user = this.accountService.aktualnyUzytkownik();
      if (!user) return;
      this.messageService.createHubConnection(user, this.member.username);
    } else{
      this.messageService.stopHubConnection();
    }
  }

  
ngOnDestroy(): void {
  this.messageService.stopHubConnection();
}
}