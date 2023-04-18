import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { routeFadeStateTrigger } from '../animations/route-animations';
import { LoaderService } from '../../services/loader.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations: [routeFadeStateTrigger],
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
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
})
export class SignUpComponent implements OnInit, OnDestroy  {
  @HostBinding('@routeFadeState') routeAnimation = true;
  isLoading = false;
  loadingSubs!: Subscription;

  isHandsetPortrait$: Observable<boolean> = this.bpoService.HandsetPortrait$;

  signUpForm = this.fb.group(
    {
      email: ['', { validators: [Validators.required, Validators.email] }],
      password: [
        '',
        { validators: [Validators.minLength(8), Validators.required] },
      ],
    },
    { updateOn: 'blur' }
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _userService: UserService,
    private bpoService: BpObserverService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loadingSubs = this.loaderService.loadingStateChanged.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  get email() {
    return this.signUpForm.controls['email'];
  }

  get password() {
    return this.signUpForm.controls['password'];
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email must be filled out';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.getError('required')) {
      return 'Password required';
    } else if (this.password.getError('minlength')) {
      return 'Password minimum length 8 chars';
    }
    return this.password.hasError('password') ? 'password error' : '';
  }

  loginLink() {
    this.router.navigate(['login'])
  }

  onSubmit() {
    const email: string = this.email.value as string;
    const password: string = this.password.value as string;

    this._userService.signUpNewUserEmail({
      email: email,
      password: password,
    });
  }
}
