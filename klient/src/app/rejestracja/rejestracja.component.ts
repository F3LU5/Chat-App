import { Component, inject, OnInit, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_uslugi/account.service';
import { NgIf } from '@angular/common';
import { WybordatyurodzeniaComponent } from "../formularz/wybordatyurodzenia/wybordatyurodzenia.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-rejestracja',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, WybordatyurodzeniaComponent, WybordatyurodzeniaComponent],
  templateUrl: './rejestracja.component.html',
  styleUrl: './rejestracja.component.css'
})
export class RejestracjaComponent implements OnInit {
  private accountService = inject(AccountService);
  private trasa = inject(Router);
  private tworzenieFormularza = inject(FormBuilder);
  anulujRejestracje = output<boolean>();
  maksymalnaDatadopuszczalna = new Date();
  bledyValidacji: string[] | undefined;
  FormularzRejestracji: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();
    this.maksymalnaDatadopuszczalna.setFullYear(this.maksymalnaDatadopuszczalna.getFullYear()-18) //nie mozne dzieki temu zarejestrowac sie ktos ponizej 18 roku zycia
  }

  initializeForm(){
    this.FormularzRejestracji = this.tworzenieFormularza.group({
      username: ['', Validators.required], 
      Onas: ['', Validators.required],
      Plec: ['', Validators.required],
      Kraj: ['', Validators.required],
      Miasto: ['', Validators.required],
      DataUrodzenia: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, this.haslaPasuja("password")]],
    });
    this.FormularzRejestracji.controls['password'].valueChanges.subscribe({
      next: () => this.FormularzRejestracji.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  haslaPasuja(pasuja: string): ValidatorFn {
    return (kontrola: AbstractControl) => {
      return kontrola.value === kontrola.parent?.get(pasuja)?.value ? null: {odpowiada: true}
    }
  }

  rejestracja(){
    const dob = this.tylkoData(this.FormularzRejestracji.get('DataUrodzenia')?.value)
    this.FormularzRejestracji.patchValue({DataUrodzenia: dob});
    this.accountService.register(this.FormularzRejestracji.value).subscribe({
      next: _ => this.trasa.navigateByUrl('/members'),
      error: error => this.bledyValidacji = error
    })
  }
  anuluj(){
    this.anulujRejestracje.emit(false);
  }
  private tylkoData(dob: string | undefined){
    if(!dob) return;
    return new Date(dob).toISOString().slice(0, 10);
  }
}

//DataUrodzenia