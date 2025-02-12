import { Component, computed, inject, input} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PresenceService } from '../../_services/presence.service';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
})
export class MemberCardComponent {
  [x: string]: any;
  private presenceService = inject(PresenceService);
  member = input.required<Member>();
  isOnline = computed(()=> this.presenceService.onlineUsers().includes(this.member().username));
}
