// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RejestracjaComponent } from './rejestracja.component';
// import { AccountService } from '../_uslugi/account.service';
// import { Router } from '@angular/router';
// import { ReactiveFormsModule } from '@angular/forms';
// import { throwError, of } from 'rxjs';

// // Importowanie interfejsu User, jeśli różni się od Uzytkownik
// import { User } from '../_modele/user'; 

// describe('RejestracjaComponent', () => {
//   let component: RejestracjaComponent;
//   let fixture: ComponentFixture<RejestracjaComponent>;
//   let accountService: jasmine.SpyObj<AccountService>;

//   beforeEach(async () => {
//     const accountServiceSpy = jasmine.createSpyObj('AccountService', ['register']);

//     await TestBed.configureTestingModule({
//       imports: [
//         ReactiveFormsModule,
//         RejestracjaComponent
//       ],
//       providers: [
//         { provide: AccountService, useValue: accountServiceSpy },
//         { provide: Router, useValue: {} }
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(RejestracjaComponent);
//     component = fixture.componentInstance;
//     accountService = TestBed.inject(AccountService) as jasmine.SpyObj<AccountService>;

//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call register method on submit', () => {
//     // Tworzymy obiekt tymczasowy typu User
//     const user: User = {
//       id: 1,
//       username: 'testuser',
//       wiek: 25,
//       zdjecieUrl: 'https://example.com/zdjecie.jpg',
//       onas: 'Test User Description',
//       stworzone: new Date(),
//       ostatniaAktywnosc: new Date(),
//       plec: 'mezczyzna',
//       wstep: 'Testowy wstęp',
//       miasto: 'Warszawa',
//       kraj: 'Polska',
//       zdjecia: [],
//       token: 'testToken',  // Dodane pole
//       roles: ['USER']  // Dodane pole
//     };

//     accountService.register.and.returnValue(of(user));

//     component.FormularzRejestracji.setValue({
//       username: 'testuser',
//       Onas: 'Test User',
//       Plec: 'mezczyzna',
//       Kraj: 'Polska',
//       Miasto: 'Warszawa',
//       DataUrodzenia: '2000-01-01',
//       password: 'password123',
//       confirmPassword: 'password123'
//     });

//     component.rejestracja();

//     expect(accountService.register).toHaveBeenCalled();
//   });

//   it('should handle registration error', () => {
//     accountService.register.and.returnValue(throwError(() => new Error('Rejestracja nieudana')));

//     component.FormularzRejestracji.setValue({
//       username: 'testuser',
//       Onas: 'Test User',
//       Plec: 'mezczyzna',
//       Kraj: 'Polska',
//       Miasto: 'Warszawa',
//       DataUrodzenia: '2000-01-01',
//       password: 'password123',
//       confirmPassword: 'password123'
//     });

//     component.rejestracja();

//     expect(accountService.register).toHaveBeenCalled();
//     expect(component.bledyValidacji).toEqual(['Rejestracja nieudana']);
//   });
// });
