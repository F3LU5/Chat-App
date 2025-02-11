import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  registerMode = false;

  registerToggle() : void {
    this.registerMode = !this.registerMode
  }

  cancelRegister(event: boolean) : void {
    this.registerMode = event;
  }
}
