import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountService } from './_services/account.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let accountService: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
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

  it('powinien wywołać accountService.currentUser.set gdy użytkownik jest w localStorage', () => {
    const mockUser = { 
      username: 'testuser', 
      roles: ['Admin'], 
      token: 'fake-jwt-token'
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser)); 
    const setSpy = spyOn(accountService.currentUser, 'set');  

    component.setCurrentUser();

    expect(setSpy).toHaveBeenCalledWith(mockUser);
  });

  it('nie powinien wywoływać accountService.currentUser.set gdy użytkownik nie jest w localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); 
    const setSpy = spyOn(accountService.currentUser, 'set');  

    component.setCurrentUser();

    expect(setSpy).not.toHaveBeenCalled();
  });
});
