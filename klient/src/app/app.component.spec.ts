import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AccountService } from './_uslugi/account.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let accountService: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()  // Dodajemy ToastrModule
      ],
      providers: [
        AccountService,
        { provide: ToastrService, useValue: jasmine.createSpyObj('ToastrService', ['success', 'error']) }, // Mockowanie ToastrService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService);
  });

  it('powinien wywołać accountService.aktualnyUzytkownik.set gdy użytkownik jest w localStorage', () => {
    const mockUser = { 
      username: 'testuser', 
      roles: ['Admin'], 
      token: 'fake-jwt-token'
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser)); 
    const setSpy = spyOn(accountService.aktualnyUzytkownik, 'set');  

    component.setAktualnyUzytkownik();

    expect(setSpy).toHaveBeenCalledWith(mockUser);
  });

  it('nie powinien wywoływać accountService.aktualnyUzytkownik.set gdy użytkownik nie jest w localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); 
    const setSpy = spyOn(accountService.aktualnyUzytkownik, 'set');  

    component.setAktualnyUzytkownik();

    expect(setSpy).not.toHaveBeenCalled();
  });
});
