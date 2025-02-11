import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HasroleDirective } from './hasrole.directive';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { AdminPanelComponent } from '../administrator/admin-panel/admin-panel.component';
import { AccountService } from '../_services/account.service';
import { AdminService } from '../_services/admin.service';

describe('AdminPanelComponent', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;
  let accountService: jasmine.SpyObj<AccountService>;
  let adminService: jasmine.SpyObj<AdminService>;

  beforeEach(() => {
    const spyAccountService = jasmine.createSpyObj('AccountService', ['roles']);
    const spyAdminService = jasmine.createSpyObj('AdminService', ['getUserWithRoles', 'updateUserRoles', 'deleteUser']);

    spyAdminService.getUserWithRoles.and.returnValue(of([{ username: 'testuser', roles: ['Admin'] }]));

    TestBed.configureTestingModule({
      imports: [
        AdminPanelComponent,
        HasroleDirective,
        HttpClientTestingModule,
        ModalModule.forRoot()
      ],
      providers: [
        { provide: AccountService, useValue: spyAccountService },
        { provide: AdminService, useValue: spyAdminService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService) as jasmine.SpyObj<AccountService>;
    adminService = TestBed.inject(AdminService) as jasmine.SpyObj<AdminService>;
  });

  it('powinien wyświetlać zakładkę „Zarządzanie użytkownikami”, gdy użytkownik ma rolę "Admin', () => {
    accountService.roles.and.returnValue(['Admin']);
    fixture.detectChanges();
    const tab = fixture.nativeElement.querySelector('tab[heading="Zarządzanie użytkownikami"]');
    expect(tab).toBeTruthy();
  });

  it('nie powinien wyświetlać zakładki „Zarządzanie użytkownikami”, gdy użytkownik nie ma roli „Admin”', () => {
    accountService.roles.and.returnValue(['User']);
    fixture.detectChanges();
    const tab = fixture.nativeElement.querySelector('tab[heading="Zarządzanie użytkownikami"]');
    expect(tab).toBeFalsy();
  });

  it('powinien wyświetlać zakładkę „Zarządzanie Zdjęciami”, gdy użytkownik ma rolę „Moderatora”', () => {
    accountService.roles.and.returnValue(['Moderator']);
    fixture.detectChanges();
    const tab = fixture.nativeElement.querySelector('tab[heading="Zarządzanie Zdjęciami"]');
    expect(tab).toBeTruthy();
  });

  it('nie powinien wyświetlać zakładki „Zarządzanie Zdjęciami”, gdy użytkownik nie ma wymaganej roli', () => {
    accountService.roles.and.returnValue(['User']);
    fixture.detectChanges();
    const tab = fixture.nativeElement.querySelector('tab[heading="Zarządzanie Zdjęciami"]');
    expect(tab).toBeFalsy();
  });
});
