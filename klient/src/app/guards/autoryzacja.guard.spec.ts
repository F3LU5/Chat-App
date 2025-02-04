import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { autoryzacjaGuard } from './autoryzacja.guard';
import { AccountService } from '../_uslugi/account.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_modele/user'; // Import modelu użytkownika

describe('autoryzacjaGuard', () => {
  let accountServiceSpy: jasmine.SpyObj<AccountService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => autoryzacjaGuard(...guardParameters));

  beforeEach(() => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['aktualnyUzytkownik']);
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
      zdjecieUrl: 'https://example.com/avatar.jpg',
      roles: ['admin'],
    };

    accountServiceSpy.aktualnyUzytkownik.and.returnValue(mockUser);

    const result = executeGuard(null as any, null as any);
    expect(result).toBeTrue();
  });

  it('powinien odmówić dostępu i wyświetlić błąd, jeśli użytkownik nie jest zalogowany', () => {
    accountServiceSpy.aktualnyUzytkownik.and.returnValue(null);

    const result = executeGuard(null as any, null as any);
    expect(result).toBeFalse();
    expect(toastrServiceSpy.error).toHaveBeenCalledWith('Bez logowania ani rusz!');
  });
});
