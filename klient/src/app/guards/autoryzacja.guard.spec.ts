import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { authorisationGuard } from './autoryzacja.guard';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';


describe('authorisationGuard', () => {
  let accountServiceSpy: jasmine.SpyObj<AccountService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authorisationGuard(...guardParameters));

  beforeEach(() => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['currentUser']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
      ]
    });
  });

  it('powinien zezwalać na dostęp, jeśli użytkownik jest zalogowany', () => {
    const mockUser: User = {
      username: 'testUser',
      token: 'mockToken123',
      imageUrl: 'https://example.com/avatar.jpg',
      roles: ['admin'],
    };

    accountServiceSpy.currentUser.and.returnValue(mockUser);

    const result = executeGuard(null as any, null as any);
    expect(result).toBeTrue();
  });

  it('powinien odmówić dostępu i wyświetlić błąd, jeśli użytkownik nie jest zalogowany', () => {
    accountServiceSpy.currentUser.and.returnValue(null);

    const result = executeGuard(null as any, null as any);
    expect(result).toBeFalse();
    expect(toastrServiceSpy.error).toHaveBeenCalledWith('Bez logowania ani rusz!');
  });
});
