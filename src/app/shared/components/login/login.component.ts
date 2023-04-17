import { Component, HostBinding } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BpObserverService } from '../../services/bp-observer.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  routeFadeStateTrigger,
} from '../animations/route-animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    routeFadeStateTrigger,
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
  ],
})
export class LoginComponent {
  @HostBinding('@routeFadeState') routeAnimation = true;


  isHandsetPortrait$: Observable<boolean> = this.bpoService.HandsetPortrait$;

  signInForm = this.fb.group({
    email: [
      '',
      { validators: [Validators.required, Validators.email], updateOn: 'blur' },
    ],
    password: ['', { validators: [Validators.required] }],
  });

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private bpoService: BpObserverService
  ) {}

  get email() {
    return this.signInForm.controls['email'];
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email must be filled out';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  get password() {
    return this.signInForm.controls['password'];
  }

  onSubmit() {
    const email: string = this.email.value as string;
    const password: string = this.password.value as string;

    this._userService.login({
      email: email,
      password: password,
    });
  }
}
