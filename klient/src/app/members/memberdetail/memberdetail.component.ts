import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { MemberMessagesComponent } from "../member-messages/membermessages.component";

import { TimeagoModule } from 'ngx-timeago';
import { DatePipe } from '@angular/common';
import { HubConnectionState } from '@microsoft/signalr';
import { MessageService } from '../../_services/message.service';
import { AccountService } from '../../_services/account.service';
import { PresenceService } from '../../_services/presence.service';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-memberdetail',
  standalone: true,
  imports: [TabsModule, MemberMessagesComponent , TimeagoModule, DatePipe],
  templateUrl: './memberdetail.component.html',
  styleUrl: './memberdetail.component.css'
})
export class MemberdetailComponent implements OnInit, OnDestroy{
  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;
  private messageService = inject(MessageService);
  private accountService = inject(AccountService);
  presenceService = inject(PresenceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  member: Member = {} as Member;

  activeTab?: TabDirective;

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => {
        this.member = data['member'];
      }
    })

    this.route.paramMap.subscribe({
      next: _ => this.onRouteParamsChange()
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

  onRouteParamsChange(){
    const user = this.accountService.currentUser();
    if(!user) return;
    if(this.messageService.hubConnection?.state === HubConnectionState.Connected && this.activeTab?.heading === 'Wiadomości') {
      this.messageService.hubConnection.stop().then(() => {
        this.messageService.createHubConnection(user, this.member.username);
      })
    }
  }

  onTabActivated(data: TabDirective){
    this.activeTab = data;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {tab: this.activeTab.heading},
      queryParamsHandling: 'merge'
    })
    if(this.activeTab.heading === 'Wiadomości' && this.member){
      const user = this.accountService.currentUser();
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