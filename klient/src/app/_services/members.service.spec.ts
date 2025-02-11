import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MembersService } from './members.service';
import { environment } from '../../environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { Member } from '../_models/member';
import { images } from '../_models/images';


describe('MembersService', () => {
  let service: MembersService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl + 'users';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MembersService]
    });
    service = TestBed.inject(MembersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMembers', () => {
    it('powinien uzyskać paginację użytkowników', () => {
      const mockPaginatedResponse: PaginatedResult<Member[]> = {
        items: [{
          id: 1,
          username: 'testuser',
          age: 30,
          imageUrl: 'url_to_image',
          initials: 'O mnie...',
          createdAt: new Date(),
          lastActive: new Date(),
          gender: 'Mężczyzna',
          description: 'Cześć!',
          profession: 'Warszawa',
          phoneNumber: 'Polska',
          images: [{ id: 1, url: 'url_to_photo', mainImage: true }]
        }] as Member[],
        pagination: { currentPage: 1, itemsPerPage: 10, totalItems: 1, totalPages: 1 }
      };

      service.getMembers(1, 10);

      const req = httpMock.expectOne((request) => request.url === apiUrl && request.method === 'GET');
      expect(req.request.params.has('pageNumber')).toBe(true);
      expect(req.request.params.has('pageSize')).toBe(true);

      req.flush(mockPaginatedResponse.items || [], {
        headers: { 'Pagination': JSON.stringify(mockPaginatedResponse.pagination) }
      });

      const paginatedResult = service.paginatedResult();
      expect(paginatedResult?.items).toEqual(mockPaginatedResponse.items);
      expect(paginatedResult?.pagination).toEqual(mockPaginatedResponse.pagination);
    });
  });

  describe('getMember', () => {
    it('powinna pobrać pojedynczego użytkownika według nazwy użytkownika', () => {
      const mockUser: Member = {
        id: 1,
        username: 'testuser',
        age: 30,
        imageUrl: 'url_to_image',
        initials: 'O mnie...',
        createdAt: new Date(),
        lastActive: new Date(),
        gender: 'Mężczyzna',
        description: 'Cześć!',
        profession: '123343234',
        phoneNumber: 'Dyrektor IT',
        images: [{ id: 1, url: 'url_to_photo', mainImage: true }]
      };

      service.getMember('testuser').subscribe(user => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne((request) => request.url === `${apiUrl}/testuser` && request.method === 'GET');
      req.flush(mockUser);
    });
  });

  describe('updateMember', () => {
    it('powinien aktualizować dane użytkownika', () => {
      const updatedUser: Member = {
        id: 1,
        username: 'testuser',
        age: 30,
        imageUrl: 'url_to_image',
        initials: 'O mnie...',
        createdAt: new Date(),
        lastActive: new Date(),
        gender: 'Mężczyzna',
        description: 'Cześć!',
        profession: 'Warszawa',
        phoneNumber: 'Polska',
        images: [{ id: 1, url: 'url_to_photo', mainImage: true }]
      };

      service.updateMember(updatedUser).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne((request) => request.url === apiUrl && request.method === 'PUT');
      expect(req.request.body).toEqual(updatedUser);
      req.flush({});
    });
  });

  describe('setMainImage', () => {
    it('powinien ustawić zdjęcie główne', () => {
      const mockPhoto: images = { 
        id: 1, 
        url: 'url_to_photo',
        mainImage: true
      };

      service.setMainImage(mockPhoto).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne((request) => request.url === `${apiUrl}/ustaw-glowne-zdjecie/1` && request.method === 'PUT');
      req.flush({});
    });
  });

  describe('deleteImage', () => {
    it('powinien usunąć zdjęcie', () => {
      const photoId = 1;

      service.deleteImage(photoId).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne((request) => request.url === `${apiUrl}/usun-zdjecie/1` && request.method === 'DELETE');
      req.flush({});
    });
  });
});
