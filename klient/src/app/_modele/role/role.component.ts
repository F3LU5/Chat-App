import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {
  bsModalRef = inject(BsModalRef);
  username = '';
  title = '';
  availableRoles: string[] = [];
  selectedRoles: string[] = [];
  rolesUpdated = false;

  updateChecked(checkedValue: string){
    if(this.selectedRoles.includes(checkedValue)){
      this.selectedRoles = this.selectedRoles.filter(r => r !== checkedValue)
    }else{
      this.selectedRoles.push(checkedValue);
    }
  }

  onSelectRoles(){
    this.rolesUpdated = true;
    this.bsModalRef.hide();
  }
}
