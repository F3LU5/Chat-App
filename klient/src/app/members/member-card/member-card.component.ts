import { Component, computed, inject, input} from '@angular/core';
import { Uzytkownik } from '../../_modele/uzytkownik';
import { RouterLink } from '@angular/router';
import { PresenceService } from '../../_uslugi/presence.service';

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
  member = input.required<Uzytkownik>();
  isOnline = computed(()=> this.presenceService.onlineUsers().includes(this.member().username));
}
