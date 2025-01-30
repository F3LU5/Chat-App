import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_uslugi/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';
import { PosiadaroleDirective } from '../dyrektywy/posiadarole.directive';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, TitleCasePipe, PosiadaroleDirective],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  ObslugaKonta = inject(AccountService);
  private router = inject(Router);
  private toaser = inject(ToastrService);
  model: any = {};
  isSidebarOpen = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  login() {
    this.ObslugaKonta.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members');
      },
      error: error => this.toaser.error(error.error)
    });
  }

  wyloguj() {
    this.ObslugaKonta.wyloguj();
    this.router.navigateByUrl('/');
  }
}
