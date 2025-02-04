import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UzytkownicyService } from './uzytkownicy.service';
import { environment } from '../../environments/environment';
import { Uzytkownik } from '../_modele/uzytkownik';
import { WynikPaginacji } from '../_modele/paginacja';
import { zdjecia } from '../_modele/zdjecie';

describe('UzytkownicyService', () => {
  let service: UzytkownicyService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl + 'users';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UzytkownicyService]
    });
    service = TestBed.inject(UzytkownicyService);
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
      const mockPaginatedResponse: WynikPaginacji<Uzytkownik[]> = {
        items: [{
          id: 1,
          username: 'testuser',
          wiek: 30,
          zdjecieUrl: 'url_to_image',
          onas: 'O mnie...',
          stworzone: new Date(),
          ostatniaAktywnosc: new Date(),
          plec: 'Mężczyzna',
          wstep: 'Cześć!',
          miasto: 'Warszawa',
          kraj: 'Polska',
          zdjecia: [{ id: 1, url: 'url_to_photo', glownezdj: true }]
        }] as Uzytkownik[],
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
      const mockUser: Uzytkownik = {
        id: 1,
        username: 'testuser',
        wiek: 30,
        zdjecieUrl: 'url_to_image',
        onas: 'O mnie...',
        stworzone: new Date(),
        ostatniaAktywnosc: new Date(),
        plec: 'Mężczyzna',
        wstep: 'Cześć!',
        miasto: '123343234',
        kraj: 'Dyrektor IT',
        zdjecia: [{ id: 1, url: 'url_to_photo', glownezdj: true }]
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
      const updatedUser: Uzytkownik = {
        id: 1,
        username: 'testuser',
        wiek: 30,
        zdjecieUrl: 'url_to_image',
        onas: 'O mnie...',
        stworzone: new Date(),
        ostatniaAktywnosc: new Date(),
        plec: 'Mężczyzna',
        wstep: 'Cześć!',
        miasto: 'Warszawa',
        kraj: 'Polska',
        zdjecia: [{ id: 1, url: 'url_to_photo', glownezdj: true }]
      };

      service.updateMember(updatedUser).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne((request) => request.url === apiUrl && request.method === 'PUT');
      expect(req.request.body).toEqual(updatedUser);
      req.flush({});
    });
  });

  describe('ustawGlowneZdjecie', () => {
    it('powinien ustawić zdjęcie główne', () => {
      const mockPhoto: zdjecia = { 
        id: 1, 
        url: 'url_to_photo',
        glownezdj: true
      };

      service.ustawGlowneZdjecie(mockPhoto).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne((request) => request.url === `${apiUrl}/ustaw-glowne-zdjecie/1` && request.method === 'PUT');
      req.flush({});
    });
  });

  describe('usunZdjecie', () => {
    it('powinien usunąć zdjęcie', () => {
      const photoId = 1;

      service.usunZdjecie(photoId).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne((request) => request.url === `${apiUrl}/usun-zdjecie/1` && request.method === 'DELETE');
      req.flush({});
    });
  });
});
