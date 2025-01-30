import { NgIf } from '@angular/common';
import { Component, input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-wybordatyurodzenia',
  standalone: true,
  imports: [BsDatepickerModule, NgIf, ReactiveFormsModule],
  templateUrl: './wybordatyurodzenia.component.html',
  styleUrl: './wybordatyurodzenia.component.css'
})
export class WybordatyurodzeniaComponent implements ControlValueAccessor{
  maksymalnaDatadopuszczalna = input<Date>();
  oznaczenie = input<string>('');
  konfiguracja?: Partial<BsDatepickerConfig>;
  constructor(@Self() public kontroler: NgControl){
    this.konfiguracja = {
      containerClass: 'theme-blue',
      dateInputFormat: 'DD MMM YYYY'
    }
    this.kontroler.valueAccessor = this;
  }
  writeValue(obj: any): void {

  }
  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {

  }
  get sterowanie(): FormControl {
    return this.kontroler.control as FormControl
  }
}
