import { TestBed } from '@angular/core/testing';
import { AdminService } from './admin.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { User } from '../_modele/user';

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService] 
    });

    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('powinien zostać utworzony', () => {
    expect(service).toBeTruthy();
  });

  it('powinien uzyskać użytkownika z rolami', () => {
    const mockUsers: User[] = [
      { username: 'testuser1', token: 'token1', roles: ['user'] },
      { username: 'testuser2', token: 'token2', roles: ['admin'] }
    ];

    service.getUserWithRoles().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${apiUrl}admin/users-with-roles`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers); 
  });

  it('powinna aktualizować role użytkowników', () => {
    const username = 'testuser';
    const roles = ['admin', 'user'];
    const mockResponse: string[] = roles;

    service.updateUserRoles(username, roles).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}admin/edit-roles/${username}?roles=${roles}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});
    req.flush(mockResponse); 
  });

  it('powinien usunąć użytkownika', () => {
    const username = 'testuser';
  
    service.deleteUser(username).subscribe(response => {
      expect(response).toBeNull(); 
    });
  
    const req = httpMock.expectOne(`${apiUrl}admin/delete-user/${username}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); 
  });
  
});
