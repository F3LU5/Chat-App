import { Component } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UserManagementComponent } from "../user-management/user-management.component";
import { PosiadaroleDirective } from '../../dyrektywy/posiadarole.directive';
import { PhotoManagementComponent } from "../photo-management/photo-management.component";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [TabsModule, UserManagementComponent, PosiadaroleDirective, PhotoManagementComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

}
