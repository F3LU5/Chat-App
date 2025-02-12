import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserManagementComponent } from './user-management.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { User } from '../../_models/user';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let adminService: jasmine.SpyObj<AdminService>;
  let modalService: jasmine.SpyObj<BsModalService>;

  const usersMock: User[] = [
    { username: 'testuser', token: 'someToken', roles: ['admin'] },
    { username: 'user2', token: 'anotherToken', roles: ['user'] }
  ];

  beforeEach(() => {
    const spyModalService = jasmine.createSpyObj('BsModalService', ['show']);
    const spyAdminService = jasmine.createSpyObj('AdminService', ['getUserWithRoles', 'deleteUser']);

    TestBed.configureTestingModule({
      imports: [UserManagementComponent],
      providers: [
        { provide: BsModalService, useValue: spyModalService },
        { provide: AdminService, useValue: spyAdminService }
      ]
    });

    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(BsModalService) as jasmine.SpyObj<BsModalService>;
    adminService = TestBed.inject(AdminService) as jasmine.SpyObj<AdminService>;

    const mockModalRef: BsModalRef = jasmine.createSpyObj('BsModalRef', ['hide', 'setClass', 'onHide']);
    mockModalRef.onHide = new EventEmitter();

    modalService.show.and.returnValue(mockModalRef);

    adminService.getUserWithRoles.and.returnValue(of(usersMock));
  });

  it('powinien otworzyć okno dialogowe ról i zaktualizować role', () => {
    const userMock = usersMock[0];

    component.openRolesModal(userMock);

    expect(modalService.show).toHaveBeenCalled();
  });
});
