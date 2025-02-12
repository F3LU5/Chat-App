import { Component, inject, OnInit, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ChoicesBirthsComponent } from '../form/choicesbirthday/choices-births.component';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, ChoicesBirthsComponent, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService);
  private router = inject(Router);
  private createForm = inject(FormBuilder);
  cancelRegister = output<boolean>();
  maxDateadmissible = new Date();
  validationErrors: string[] | undefined;
  registerForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();
    this.maxDateadmissible.setFullYear(this.maxDateadmissible.getFullYear()-18)
  }

  initializeForm(){
    this.registerForm = this.createForm.group({
      username: ['', Validators.required], 
      Initials: ['', Validators.required],
      Gender: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Profession: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, this.matchValues("password")]],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null: {IsMaching: true}
    }
  }

  register() {
    const dob = this.getDateOnly(this.registerForm.get('DateOfBirth')?.value);
    this.registerForm.patchValue({ DateOfBirth: dob });
    
    this.accountService.register(this.registerForm.value).subscribe({
      next: _ => this.router.navigateByUrl('/members'),
      error: error => {
        this.validationErrors = error;
      }
    });
  }
  
  cancel(){
    this.cancelRegister.emit(false);
  }
  private getDateOnly(dob: string | undefined)
  {
    if(!dob) return;
    return new Date(dob).toISOString().slice(0, 10);
  }
  trackByIndex(index: number, item: string): number 
  {
    return index;
  }
}

