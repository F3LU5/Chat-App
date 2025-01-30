import { Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from '../_uslugi/account.service';

@Directive({
  selector: '[appPosiadarole]', //*appPosiadaRole
  standalone: true
})
export class PosiadaroleDirective implements OnInit {
  @Input() appPosiadarole: string[] = [];
  private accountService = inject(AccountService);
  private viewContainerRef = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef);

  ngOnInit(): void {
    if(this.accountService.roles()?.some((r: string) => this.appPosiadarole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }
    else
    {
      this.viewContainerRef.clear();
    }
  }
}
