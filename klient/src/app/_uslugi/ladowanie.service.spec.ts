import { TestBed } from '@angular/core/testing';
import { LadowanieService } from './ladowanie.service';
import { NgxSpinnerService } from 'ngx-spinner';

describe('LadowanieService(ładowanie ekranu)', () => {
  let service: LadowanieService;
  let spinnerServiceSpy: jasmine.SpyObj<NgxSpinnerService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);

    TestBed.configureTestingModule({
      providers: [
        LadowanieService,
        { provide: NgxSpinnerService, useValue: spy }
      ]
    });

    service = TestBed.inject(LadowanieService);
    spinnerServiceSpy = TestBed.inject(NgxSpinnerService) as jasmine.SpyObj<NgxSpinnerService>;
  });

  it('powinien zostać utworzony', () => {
    expect(service).toBeTruthy();
  });

  it('powinien wywoływać spinnerService.show, gdy wywoływane jest ladowanie', () => {
    service.ladowanie();
    expect(spinnerServiceSpy.show).toHaveBeenCalled();
  });

  it('powinien wywołać spinnerService.hide, gdy idle jest wywoływane po ladowanie', () => {
    service.ladowanie(); 
    service.idle();     

    expect(spinnerServiceSpy.hide).toHaveBeenCalled();
  });

  it('nie powinien wywoływać spinnerService.hide, jeśli ladowanieRequest jest większe niż 0 po bezczynności', () => {
    service.ladowanie(); 
    service.ladowanie();  
    service.idle();      
    service.idle();      

    expect(spinnerServiceSpy.hide).toHaveBeenCalledTimes(1); 
  });

  it('nie powinien wywoływać spinnerService.show jeśli ladowanieRequest wynosi 0', () => {
    service.idle(); 
    service.ladowanie();

    expect(spinnerServiceSpy.show).toHaveBeenCalled();
  });

  it('powinien wywołać show ładownie ekranu z poprawnymi parametrami', () => {
    service.ladowanie();
    expect(spinnerServiceSpy.show).toHaveBeenCalledWith(undefined, {
      type: 'pacman',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#ffff00'
    });
  });
});
