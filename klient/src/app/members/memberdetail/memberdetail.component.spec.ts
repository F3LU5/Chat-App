// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MemberdetailComponent } from './memberdetail.component';
// import { PresenceService } from './presence.service';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { WritableSignal } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';

// describe('MemberdetailComponent', () => {
//   let component: MemberdetailComponent;
//   let fixture: ComponentFixture<MemberdetailComponent>;
//   let mockPresenceService: jasmine.SpyObj<PresenceService>;

//   beforeEach(() => {
//     // Tworzymy mock PresenceService
//     mockPresenceService = jasmine.createSpyObj('PresenceService', ['createHubConnectrion', 'stopHubConnection']);
    
//     // Mockujemy onlineUsers jako WritableSignal
//     mockPresenceService.onlineUsers = { 
//       set: jasmine.createSpy('set'),
//       update: jasmine.createSpy('update'),
//       asReadonly: jasmine.createSpy('asReadonly').and.returnValue(['user1', 'user2', 'user3'])
//     } as WritableSignal<string[]>;

//     TestBed.configureTestingModule({
//       declarations: [ MemberdetailComponent ],
//       providers: [
//         { provide: PresenceService, useValue: mockPresenceService },
//         { provide: ToastrService, useValue: jasmine.createSpyObj('ToastrService', ['info']) },
//         { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigateByUrl']) }
//       ],
//       schemas: [NO_ERRORS_SCHEMA] // Ignorujemy błędy w szablonie, np. jeśli używasz ngIf z brakującymi danymi
//     });

//     fixture = TestBed.createComponent(MemberdetailComponent);
//     component = fixture.componentInstance;
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call onlineUsers and set users', () => {
//     // Uruchamiamy cykl życia komponentu, aby zainicjować dane
//     fixture.detectChanges();

//     // Oczekujemy, że onlineUsers będzie zawierać użytkowników z mocka
//     const users = component.onlineUsers;
//     expect(users).toEqual(['user1', 'user2', 'user3']);
//   });

//   it('should correctly identify if a user is online', () => {
//     // Uruchamiamy cykl życia komponentu, aby zainicjować dane
//     fixture.detectChanges();

//     // Sprawdzamy, czy użytkownik jest online
//     expect(component.isUserOnline('user1')).toBeTrue(); // user1 jest online
//     expect(component.isUserOnline('user4')).toBeFalse(); // user4 nie jest online
//   });

//   it('should update online users when the WritableSignal changes', () => {
//     // Zmieniamy dane w mocku
//     mockPresenceService.onlineUsers.update.and.callFake((users) => {
//       users = ['user1', 'user4'];
//       mockPresenceService.onlineUsers.asReadonly.and.returnValue(users); 
//     });

//     // Uruchamiamy cykl życia komponentu, aby zaktualizować dane w komponencie
//     fixture.detectChanges();

//     // Oczekujemy, że onlineUsers zostanie zaktualizowane
//     const users = component.onlineUsers;
//     expect(users).toEqual(['user1', 'user4']);
//   });
// });
