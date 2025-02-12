import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';
import { NgxSpinnerService } from 'ngx-spinner';

describe('LoadingService(ładowanie ekranu)', () => {
  let service: LoadingService;
  let spinnerServiceSpy: jasmine.SpyObj<NgxSpinnerService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);

    TestBed.configureTestingModule({
      providers: [
        LoadingService,
        { provide: NgxSpinnerService, useValue: spy }
      ]
    });

    service = TestBed.inject(LoadingService);
    spinnerServiceSpy = TestBed.inject(NgxSpinnerService) as jasmine.SpyObj<NgxSpinnerService>;
  });

  it('powinien zostać utworzony', () => {
    expect(service).toBeTruthy();
  });

  it('powinien wywoływać spinnerService.show, gdy wywoływane jest busy', () => {
    service.busy();
    expect(spinnerServiceSpy.show).toHaveBeenCalled();
  });

  it('powinien wywołać spinnerService.hide, gdy idle jest wywoływane po busy', () => {
    service.busy(); 
    service.idle();     

    expect(spinnerServiceSpy.hide).toHaveBeenCalled();
  });

  it('nie powinien wywoływać spinnerService.hide, jeśli loadingRequest jest większe niż 0 po bezczynności', () => {
    service.busy(); 
    service.busy();  
    service.idle();      
    service.idle();      

    expect(spinnerServiceSpy.hide).toHaveBeenCalledTimes(1); 
  });

  it('nie powinien wywoływać spinnerService.show jeśli loadingRequest wynosi 0', () => {
    service.idle(); 
    service.busy();

    expect(spinnerServiceSpy.show).toHaveBeenCalled();
  });

  it('powinien wywołać show ładownie ekranu z poprawnymi parametrami', () => {
    service.busy();
    expect(spinnerServiceSpy.show).toHaveBeenCalledWith(undefined, {
      type: 'pacman',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#ffff00'
    });
  });
});
