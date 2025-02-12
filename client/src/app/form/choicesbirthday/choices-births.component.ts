import { NgIf } from '@angular/common';
import { Component, input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-choices-births',
  standalone: true,
  imports: [BsDatepickerModule, NgIf, ReactiveFormsModule],
  templateUrl: './choices-births.component.html',
  styleUrl: './choices-births.component.css'
})
export class ChoicesBirthsComponent implements ControlValueAccessor{
  maxDateadmissible = input<Date>();
  label = input<string>('');
  bsConfiguration?: Partial<BsDatepickerConfig>;
  constructor(@Self() public ngControl: NgControl){
    this.bsConfiguration = {
      containerClass: 'theme-blue',
      dateInputFormat: 'DD MMM YYYY'
    }
    this.ngControl.valueAccessor = this;
  }
  writeValue(obj: any): void {

  }
  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {

  }
  get control(): FormControl {
    return this.ngControl.control as FormControl
  }
}
