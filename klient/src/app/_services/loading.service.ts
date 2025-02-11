import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingRequest = 0;
  private spinnerService = inject(NgxSpinnerService);
  busy() : void {
    this.loadingRequest++;
    this.spinnerService.show(undefined,{
      type: 'pacman',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#ffff00'
    })
  }

  idle() : void {
    this.loadingRequest--;
    if (this.loadingRequest <= 0){
      this.loadingRequest = 0;
      this.spinnerService.hide();
    }
  }
}
