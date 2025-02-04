import { TestBed } from '@angular/core/testing';
import { WiadomoscService } from './wiadomosc.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Wiadomosc } from '../_modele/wiadomosc';
import { WynikPaginacji } from '../_modele/paginacja';

describe('WiadomoscService', () => {
  let service: WiadomoscService;
  let httpMock: HttpTestingController; 

  const mockPagination: WynikPaginacji<Wiadomosc[]> = {
    items: [
      {
        id: 1,
        senderId: 1,
        senderUsername: 'sender',
        senderPhotoUrl: 'senderPhotoUrl',
        recipientId: 2,
        recipientUsername: 'recipient',
        recipientPhotoUrl: 'recipientPhotoUrl',
        content: 'Testowa wiadomość',
        messageSent: new Date(),
      },
    ],
    pagination: {
      currentPage: 1,
      totalItems: 1,
      itemsPerPage: 10,
      totalPages: 1,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WiadomoscService],
    });
    service = TestBed.inject(WiadomoscService);
    httpMock = TestBed.inject(HttpTestingController); 
  });

  afterEach(() => {
    
    httpMock.verify();
  });

  it('powinna poprawnie ustawiać i pobierać wynikPaginacji', () => {
    service.wynikPaginacji.set(mockPagination);

    const result = service.wynikPaginacji();

    expect(result).not.toBeNull();

    if (result) { 
      expect(result.items?.length).toBe(1); 
      expect(result.items?.[0].content).toBe('Testowa wiadomość'); 
      expect(result.pagination?.currentPage).toBe(1); 
      expect(result.pagination?.totalItems).toBe(1); 
      expect(result.pagination?.itemsPerPage).toBe(10); 
      expect(result.pagination?.totalPages).toBe(1);
    }
  });

  it('powinien poprawnie zaktualizować wynikPaginacji', () => {
    service.wynikPaginacji.set(mockPagination);

    const newMessage: Wiadomosc = { 
      id: 2, 
      senderId: 1, 
      senderUsername: 'sender', 
      senderPhotoUrl: 'senderPhotoUrl', 
      recipientId: 2, 
      recipientUsername: 'recipient', 
      recipientPhotoUrl: 'recipientPhotoUrl', 
      content: 'Nowa wiadomość', 
      messageSent: new Date() 
    };

    service.wynikPaginacji.update(state => ({
      ...state,
      items: [newMessage]
    }));

    const updatedResult = service.wynikPaginacji();

    expect(updatedResult).not.toBeNull();

    if (updatedResult) { 
      expect(updatedResult.items?.length).toBe(1); 
      expect(updatedResult.items?.[0].content).toBe('Nowa wiadomość');
      expect(updatedResult.pagination?.itemsPerPage).toBe(10); 
      expect(updatedResult.pagination?.totalPages).toBe(1);
    }
  });
});
