import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaginatedResult } from '../_models/pagination';
import { Message } from '../_models/message';


describe('MessageService', () => {
  let service: MessageService;
  let httpMock: HttpTestingController; 

  const mockPagination: PaginatedResult<Message[]> = {
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
      providers: [MessageService],
    });
    service = TestBed.inject(MessageService);
    httpMock = TestBed.inject(HttpTestingController); 
  });

  afterEach(() => {
    
    httpMock.verify();
  });

  it('powinna poprawnie ustawiać i pobierać paginatedResult', () => {
    service.paginatedResult.set(mockPagination);

    const result = service.paginatedResult();

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

  it('powinien poprawnie zaktualizować paginatedResult', () => {
    service.paginatedResult.set(mockPagination);

    const newMessage: Message = { 
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

    service.paginatedResult.update(state => ({
      ...state,
      items: [newMessage]
    }));

    const updatedResult = service.paginatedResult();

    expect(updatedResult).not.toBeNull();

    if (updatedResult) { 
      expect(updatedResult.items?.length).toBe(1); 
      expect(updatedResult.items?.[0].content).toBe('Nowa wiadomość');
      expect(updatedResult.pagination?.itemsPerPage).toBe(10); 
      expect(updatedResult.pagination?.totalPages).toBe(1);
    }
  });
});
