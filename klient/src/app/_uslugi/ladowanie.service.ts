import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LadowanieService {
  ladowanieRequest = 0;
  private spinnerService = inject(NgxSpinnerService);
  ladowanie(){
    this.ladowanieRequest++;
    this.spinnerService.show(undefined,{
      type: 'pacman',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#ffff00'
    })
  }

  idle() {
    this.ladowanieRequest--;
    if (this.ladowanieRequest <= 0){
      this.ladowanieRequest = 0;
      this.spinnerService.hide();
    }
  }
}
