import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccountService } from './account.service';
import { PresenceService } from './presence.service';
import { of } from 'rxjs';
import { User } from '../_modele/user';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;
  let mockPresenceService: jasmine.SpyObj<PresenceService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PresenceService', ['createHubConnectrion', 'stopHubConnection']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importujemy moduł do testowania HttpClient
      providers: [
        AccountService,
        { provide: PresenceService, useValue: spy } // Używamy mocka dla PresenceService
      ]
    });

    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
    mockPresenceService = TestBed.inject(PresenceService) as jasmine.SpyObj<PresenceService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('powinien zostać utworzony', () => {
    expect(service).toBeTruthy();
  });

  it('powinien się zalogować i ustawić bieżącego użytkownika', () => {
    const mockUser: User = {
      username: 'testuser',
      token: 'some.jwt.token',
      roles: ['user']  // Zaktualizowana struktura użytkownika
    };

    service.login({ username: 'testuser', password: 'password' }).subscribe();

    const req = httpMock.expectOne(`${service.bazoweURL}account/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);

    expect(service.aktualnyUzytkownik()).toEqual(mockUser);
    expect(mockPresenceService.createHubConnectrion).toHaveBeenCalledWith(mockUser);
  });

  it('powinien zarejestrować i ustawić bieżącego użytkownika', () => {
    const mockUser: User = {
      username: 'testuser',
      token: 'some.jwt.token',
      roles: ['user']  // Zaktualizowana struktura użytkownika
    };

    service.register({ username: 'testuser', password: 'password' }).subscribe();

    const req = httpMock.expectOne(`${service.bazoweURL}account/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);

    expect(service.aktualnyUzytkownik()).toEqual(mockUser);
    expect(mockPresenceService.createHubConnectrion).toHaveBeenCalledWith(mockUser);
  });

  it('powinien wylogować i wyczyścić bieżącego użytkownika', () => {
    service.wyloguj();
    expect(service.aktualnyUzytkownik()).toBeNull();
    expect(mockPresenceService.stopHubConnection).toHaveBeenCalled();
  });
});
