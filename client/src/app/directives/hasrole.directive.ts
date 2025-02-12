import { Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasrole]',
  standalone: true
})
export class HasroleDirective implements OnInit {
  @Input() appHasrole: string[] = [];
  private accountService = inject(AccountService);
  private viewContainerRef = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef);

  ngOnInit(): void {
    if(this.accountService.roles()?.some((r: string) => this.appHasrole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }
    else
    {
      this.viewContainerRef.clear();
    }
  }
}
